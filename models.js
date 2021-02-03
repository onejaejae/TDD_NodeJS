const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

const User = sequelize.define("User", {
  name: Sequelize.STRING,
  unique: true,
});

module.exports = { User, sequelize, Sequelize };
