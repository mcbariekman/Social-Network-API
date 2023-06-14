const express = require("express");
const mongoose = require('mongoose');
const app = express();
const routes = require("./routes");
const db = require("./config/connection");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/snetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(require('./routes'));

db.once('open', () => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server is up and running");
  });
});

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
  