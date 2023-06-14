const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");
const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const Friend = require('./models/Friend');
const index = require('./models/index')

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    // Sync Mongoose models here
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.once('open', () => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server is up and running");
  });
});
