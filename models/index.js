const { Sequelize, DataTypes } = require("sequelize");
const envConfigs = require("../config/config");

const env = process.env.NODE_ENV || "development";
const config = envConfigs[env];

// console.log(config.url);

const sequelize = new Sequelize(
  "learn_sequelizdb",
  "postgres",
  "81411dhrpatel",
  {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    operatorsAliases: "Sequelize.Op",
    logging: false,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log("Error : " + e);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);
db.sequelize.sync({ focus: true }).then(() => {
  console.log("Yes re sync");
});
