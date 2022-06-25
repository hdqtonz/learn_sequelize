require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    operatorsAliases: "Sequelize.Op",
    logging: false,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
