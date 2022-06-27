const db = require("../models");
const Users = db.users;
const { Sequelize, Op } = require("sequelize");

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

module.exports = {
  addUser,
  crudOpretion,
  queryData,
  finderData,
  setterGetter,
};
