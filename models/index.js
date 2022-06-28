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

db.sequelize.sync({ force: false, match: /learn_sequelizdb$/ }).then(() => {
  console.log(`Yes sync`);
});

db.users = require("./users")(sequelize, DataTypes);
db.posts = require("./posts")(sequelize, DataTypes);
db.tags = require("./tags")(sequelize, DataTypes);
db.post_tag = require("./post_tag")(sequelize, DataTypes);

//--------------One To One--------------------//
db.users.hasOne(db.posts, { foreignKey: "user_id", as: "postInfo" }); // defulat userId

//--------------One To Many--------------------//
db.users.hasMany(db.posts, { foreignKey: "user_id", as: "posts" });
db.posts.belongsTo(db.users, { foreignKey: "user_id" });

//--------------Many To Many--------------------//
db.posts.belongsToMany(db.tags, { through: "post_tag" });
db.tags.belongsToMany(db.posts, { through: "post_tag" });

module.exports = db;
