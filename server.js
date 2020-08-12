const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(`DB Connection Error: ${err}`));

const authRoutes = require('./routes/auth');

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// route middlewares
app.use('/api', authRoutes);
app.get('/test', (req, res) => console.log('You have reached Test page'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`
  ==============================
    Server is running on: ${PORT}
  ==============================
  `);
});
