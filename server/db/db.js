const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:passwrd@0.0.0.0:5432/messenger", {
  logging: false
});

module.exports = db;
