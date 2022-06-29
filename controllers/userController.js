const db = require("../models");
const Users = db.users;
const Posts = db.posts;
const Tags = db.tags;
const Comment = db.comment;
const Image = db.image;
const Video = db.video;
const { Sequelize, Op, QueryTypes } = require("sequelize");

const addUser = async (req, res) => {
  // const data = await Users.build({
  //   name: "Test",
  //   email: "test2@email.com",
  // });
  // await data.save();

  let data = await Users.create({
    name: "ekta",
    email: "ekta@gmail.com",
    gender: "female",
  });

  //---------update---------//

  // data.name = "Birju";
  // data.save();

  //delete
  // data.destroy();

  // reload
  // data.name = "dummy";
  // data.reload();
  let response = {
    data: "ok",
    response: data,
  };
  res.status(200).json(response);
};

const crudOpretion = async (req, res) => {
  //---------insert---------//

  // let insert = await Users.create({
  //   name: "Hiten",
  //   email: "Hiten@gamil.com",
  //   gender: "male",
  // });

  //---------update---------//

  // let update = await Users.update(
  //   { email: "brijesh@email.com" },
  //   {
  //     where: {
  //       id: 12,
  //     },
  //   }
  // );

  //---------truncate---------//

  // let truncate = await Users.destroy({
  //   truncate: true,
  // });

  //---------bulk insert---------//

  // let bulInsert = await Users.bulkCreate([
  //   { name: "Hiten", email: "hiten@gmail.com", gender: "male" },
  //   { name: "Brijesh", email: "brijesh@gmail.com", gender: "male" },
  //   { name: "Kashyap", email: "kashyap@gmail.com", gender: "male" },
  //   { name: "Vibha", email: "vibha@gmail.com", gender: "female" },
  // ]);

  //---------find---------//

  // let findData = await Users.findAll({});

  let findOne = await Users.findOne({});

  let response = {
    data: "ok",
    // insert: insert || "Insert",
    // update: update || "Update",
    // truncate: truncate,
    // bulk: bulInsert,
    // findAll: findData,
    findOne: findOne,
  };

  res.status(200).json(response);
};

const queryData = async (req, res) => {
  //---------Insert data using fields---------//

  // const data = await Users.create(
  //   {
  //     name: "mayur",
  //     email: "mayur@gmail.com",
  //     gender: "male",
  //   },
  //   {
  //     fields: ["email", "gender"],
  //   }
  // );

  //--------- Select ---------//

  // let data = await Users.findAll({
  //   attributes: [
  //     "name",
  //     ["email", "emailID"],
  //     "gender",
  //     [Sequelize.fn("CONCAT", Sequelize.col("name"), " test"), "nameConcat"],
  //   ],
  // });

  // let data = await Users.findAll({
  //   attributes: [[Sequelize.fn("COUNT", Sequelize.col("email")), "n_email"]],
  // });

  //---------Include - Exclude---------//

  // let data = await Users.findAll({
  //   attributes: {
  //     exclude: ["createdAt", "updatedAt"],
  //     include: [
  //       [Sequelize.fn("CONCAT", Sequelize.col("name"), " trivedi"), "fullName"],
  //     ],
  //   },
  // });

  //---------Condition---------//

  // let data = await Users.findAll({
  //   where: {
  //     // id: 16,
  //     id: {
  //       [Op.gte]: 17,
  //     },
  //     // gender: {
  //     //   [Op.eq]: "male",
  //     // },
  //     email: {
  //       [Op.like]: "%@gmail.com",
  //     },
  //   },
  //   order: [
  //     ["name", "ASC"],
  //     // ["email", "DESC"],
  //   ],
  //   limit: 2,
  //   offset: 1,
  //   // group: ["name"],
  // });

  let data = await Users.count({});

  let response = {
    data: "ok",
    queyr: data,
  };
  res.status(200).send(response);
};

const finderData = async (req, res) => {
  // let data = await Users.findAll({});
  // let data = await Users.findOne({})
  // let data = await Users.findByPk(16);
  // let data = await Users.findAndCountAll({
  //   where: {
  //     gender: "female",
  //   },
  // });

  let [data, created] = await Users.findOrCreate({
    where: {
      email: "vimal@gmail.com",
    },
    defaults: {
      name: "vimal",
      email: "vimal@gmail.com",
      gender: "male",
    },
  });

  let response = {
    data: data,
    add: created,
  };
  res.status(200).send(response);
};

const setterGetter = async (req, res) => {
  // let data = await Users.create({
  //   name: "vila",
  //   email: "vila",
  //   gender: "female",
  // });

  let data = await Users.findAll({});

  let response = {
    data: "setter-getter",
    response: data,
  };
  res.status(200).send(response);
};

const validationCont = async (req, res) => {
  let response = {};
  try {
    let data = await Users.create({
      name: "materil",
      email: "materil@gmail.com",
      gender: "male",
    });
    response = {
      success: true,
      data: data,
    };
    res.status(200).send(response);
  } catch (e) {
    const messages = {};
    e.errors.forEach((error) => {
      let message;

      // switch (error.validatorKey) {
      //   case "not_unique":
      //     message = "Duplicate Email";
      //     break;
      //   case "isIn":
      //     message = error.message;
      //     break;
      //   case "equals":
      //     // console.log(error.message);
      //     message = "Gender Not Male";
      //     break;
      // }

      message = error.message;
      messages[error.path] = message;
      console.log(messages);
    });
    response = {
      success: false,
      error: messages,
    };
    res.status(500).send(response);
  }
};

const reqQuery = async (req, res) => {
  let response = {};
  const users = await db.sequelize.query(
    "SELECT * FROM users where gender = $gender",
    {
      type: QueryTypes.SELECT,
      // Model: Users,
      // mapToModel: true,
      // raw: true,
      // replacements: { gender: "male" }, /// gender = :gender
      // replacements: ["male"], /// gender = ?
      // replacements: { gender: ["male", "female"] }, /// gender IN(:gender)
      // replacements: { searchEmail: "%@gmail.com" }, /// email LIKE :searchEmail

      bind: { gender: "male" },
    }
  );
  response = {
    data: "Raw Query",
    record: users,
  };
  res.status(200).send(response);
};

const oneToOne = async (req, res) => {
  let response = {};
  let data = await Users.findAll({
    where: { id: 1 },
    attributes: ["name", "email", "gender"],
    include: [
      { model: Posts, as: "postInfo", attributes: ["title", "content"] },
    ],
  });
  response = {
    data: "one-to-one",
    response: data,
  };
  res.status(200).send(response);
};

const belongTo = async (req, res) => {
  let response = {};

  let data = await Posts.findAll({
    attributes: ["title", "content"],
    include: [
      {
        model: Users,
        attributes: ["name", "email"],
      },
    ],
  });

  response = {
    data: "belong-to",
    result: data,
  };
  res.status(200).send(response);
};

const oneToMany = async (req, res) => {
  let response = {};

  let data = await Users.findAll({
    attributes: ["name", "email", "gender"],
    include: [
      {
        model: Posts,
        as: "posts",
        attributes: ["title", "content", "user_id"],
      },
    ],
  });

  response = {
    success: true,
    data: data,
  };
  res.status(200).send(response);
};

const manyToMany = async (req, res) => {
  //---------------Post To Tag-----------//

  // let response = {};
  // let data = await Posts.findAll({
  //   attributes: ["title", "content"],
  //   include: [
  //     {
  //       model: Tags,
  //       attributes: ["name"],
  //     },
  //   ],
  // });

  //---------------Tag To Post-----------//

  let data = await Tags.findAll({
    include: [
      {
        model: Posts,
      },
    ],
  });

  response = {
    success: true,
    data: data,
  };
  res.status(200).send(response);
};

const scopes = async (req, res) => {
  let response = {};
  // let data = await Users.scope(["checkGender", "checkStatus"]).findAll({});

  // let data = await Posts.findAll({
  //   include: [
  //     {
  //       model: Users,
  //     },
  //   ],
  // });

  let data = await Users.scope([
    "includePost",
    "selecteUsers",
    "limitCheck",
  ]).findAll({});

  response = {
    status: true,
    data: data,
  };
  res.status(200).send(response);
};

const polymorphic = async (req, res) => {
  let response = {};

  // ------- Image To Comment-----------//
  let imageData = await Image.findAll({
    include: [
      {
        model: Comment,
      },
    ],
  });

  // ------- Video To Comment-----------//
  let videoData = await Video.findAll({
    include: [
      {
        model: Comment,
      },
    ],
  });

  // ------- Comment To Iamge/Video-----------//
  let commentData = await Comment.findAll({
    include: Image,
  });

  response = {
    success: true,
    imageData: imageData,
    videoData: videoData,
    commentData: commentData,
  };
  res.status(200).send(response);
};

const polymorphicMany = async (req, res) => {
  let response = {};

  //-------Image to Tag---------//
  let imageToTag = await Image.findAll({
    include: [{ model: Tags }],
  });

  //-------Tag to Image---------//
  let tagToImage = await Tags.findAll({
    include: [{ model: Image }],
  });

  //-------Video to tag---------//
  let VideoToTag = await Video.findAll({
    include: [{ model: Tags }],
  });

  //-------Tags to Video---------//
  let TagToVideo = await Tags.findAll({
    include: [{ model: Video }],
  });

  //-------Tags to Video and Image---------//
  let tagToImageAndVideo = await Tags.findAll({
    include: [Video, Image],
  });

  response = {
    success: true,
    imageToTag: imageToTag,
    tagToImage: tagToImage,
    VideoToTag: VideoToTag,
    TagToVideo: TagToVideo,
    tagToImageAndVideo: tagToImageAndVideo,
  };
  res.status(200).send(response);
};

const loading = async (req, res) => {
  let response = {};

  //------- Lazy Loading -------//
  // let data = await Users.findOne({
  //   where: {
  //     id: 1,
  //   },
  // });
  // let postData = await data.getPosts();

  //---------Eager Loading---------//
  let data = await Users.findOne({
    where: { id: 1 },

    include: [
      {
        model: Posts,
        as: "posts",
        required: true,
      },
    ],
  });

  response = {
    success: true,
    user: data,
    // posts: postData,
  };
  res.status(200).send(response);
};

module.exports = {
  addUser,
  crudOpretion,
  queryData,
  finderData,
  setterGetter,
  validationCont,
  reqQuery,
  oneToOne,
  oneToMany,
  belongTo,
  manyToMany,
  scopes,
  polymorphic,
  polymorphicMany,
  loading,
};
