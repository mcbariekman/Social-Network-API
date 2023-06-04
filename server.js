const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.once('open', () => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server is up and running");
  });
});
