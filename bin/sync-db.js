const { User, sequelize, Sequelize } = require("../models");

module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === "test" ? true : false,
  };
  return sequelize.sync({
    force: options.force,
  });
};
