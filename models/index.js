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

//---------------- Scopes ---------------------//
db.users.addScope("checkStatus", {
  where: {
    status: 1,
  },
});

db.users.addScope("checkGender", {
  where: {
    gender: "male",
  },
});

db.users.addScope("includePost", {
  include: {
    attributes: ["title", "content"],
    model: db.posts,
    as: "postInfo",
  },
});
db.users.addScope("selecteUsers", {
  attributes: ["name", "email"],
});

// db.users.addScope("limitCheck", {
//   limit: 2,
// });

//--------------One To One--------------------//
db.users.hasOne(db.posts, { foreignKey: "user_id", as: "postInfo" }); // defulat userId

//--------------One To Many--------------------//
db.users.hasMany(db.posts, { foreignKey: "user_id", as: "posts" });
db.posts.belongsTo(db.users.scope("checkStatus"), { foreignKey: "user_id" });

//--------------Many To Many--------------------//
db.posts.belongsToMany(db.tags, { through: "post_tag" });
db.tags.belongsToMany(db.posts, { through: "post_tag" });

//-------------- Polymorphic One to Many --------------------//

db.comment = require("./comment")(sequelize, DataTypes);
db.image = require("./image")(sequelize, DataTypes);
db.video = require("./video")(sequelize, DataTypes);

db.image.hasMany(db.comment, {
  foreignKey: "commentableId",
  constaints: false,
  scope: {
    commentableType: "image",
  },
});

db.video.hasMany(db.comment, {
  foreignKey: "commentableId",
  constaints: false,
  scope: {
    commentableType: "video",
  },
});

db.comment.belongsTo(db.image, {
  foreignKey: "commentableId",
  constaints: false,
});

db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constaints: false,
});

//-------------- Polymorphic Many to Many --------------------//

db.tag_taggable = require("./tag_taggable")(sequelize, DataTypes);

//------- Image To Tag---------//
db.image.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "taggableId",
  constaints: false,
});

//------- Tag To Image---------//
db.tags.belongsToMany(db.image, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "tagId",
  constaints: false,
});

//------- Vidoe To Tags---------//
db.video.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constaints: false,
});

//------- Tag To Video---------//
db.tags.belongsToMany(db.video, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
    foreignKey: "tagId",
    constaints: false,
  },
});

module.exports = db;
