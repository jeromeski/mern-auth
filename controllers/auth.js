exports.signup = (req, res) => {
  console.log('Request Body :', req.body);
  res.json({
    data: 'You hit signup endpoint yay'
  });
};
