const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
        <p>Please use the following link to activate your account</p>
        <a href='${process.env.CLIENT_URL}/auth/activate/${token}'>Activation Link</a>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    };
    sgMail
      .send(emailData)
      .then(sent => {
        console.log('SIGNUP EMAIL SENT');
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(
      err,
      decoded
    ) {
      if (err) {
        console.log('JWT VERIFY IN ACTIVATION ERROR', err);
        return res.status(401).json({
          error: 'Expired link. Signup again'
        });
      }
      const { name, email, password } = jwt.decode(token);
      const user = new User({ name, email, password });
      user.save((err, user) => {
        if (err) {
          console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Error saving user in database. Try signup again'
          });
        }
        return res.json({
          message: 'Account activated. Please signin.'
        });
      });
    });
  } else {
    return res.json({
      message: 'Signup success, Please signin.'
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User doesn't exist. Signup first!"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "User/Password doesn't match"
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role }
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET // req.user
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied.'
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Email does not exist'
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m'
    });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset link`,
      html: `
        <p>Please use the following link to reset your account</p>
        <a href='${process.env.CLIENT_URL}/auth/password/reset/${token}'>Password Reset Link</a>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    };
    sgMail
      .send(emailData)
      .then(sent => {
        console.log('RESET PASSWORD SENT');
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction to reset your password.`
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.resetPassword = (req, res) => {};

/*
exports.signup = (req, res) => {
  console.log('Request Body :', req.body);
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      });
    }
  });
  let newUser = new User({ name, email, password });
  newUser.save((err, success) => {
    if (err) {
      console.log('SIGNUP ERROR', err);
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: 'Signup success! Please signin'
    });
  });
};
*/
