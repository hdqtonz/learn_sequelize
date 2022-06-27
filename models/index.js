var { Sequelize, DataTypes } = require("sequelize");
const envConfigs = require("../config/config");

// const env = process.env.NODE_ENV || "development";
// const config = envConfigs[env];

// console.log(config.url);

var sequelize = new Sequelize("learn_sequelizdb", "postgres", "81411dhrpatel", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
  operatorsAliases: "Sequelize.Op",
  logging: true,
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log("Error : " + e);
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log(`Yes sync`);
});

db.users = require("./users")(sequelize, DataTypes);
module.exports = db;
