module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        // set(value) {
        //   this.setDataValue("name", value + " patel");
        // },
        // get() {
        //   return this.getDataValue("name") + " ABC " + this.email;
        // },
      },
      status: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        // defaultValue: "test@email.com",
        allowNull: false,
        unique: true,
        // set(value) {
        //   this.setDataValue("email", value + "@gmail.com");
        // },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          // equals: "male",
          // equals: {
          //   args: "male",
          //   msg: "Please enter only Male",
          // },
          isIn: {
            args: [["male", "female"]],
            msg: "Please enter Male/Female",
          },
          // isIn: [["male", "female"]],
        },
      },
    },
    {
      // underscored: true,
      // hooks: {
      //   beforeValidate: (user, option) => {
      //     user.name = user.name.toUpperCase();
      //     console.log("Hook Befor Validate called :" + user.name);
      //   },
      //   afterValidate: (user, options) => {
      //     user.name =
      //       user.name.charAt(0) + user.name.slice(1).toLowerCase() + " Patel";
      //     console.log("Hook After Validate called :" + user.name);
      //   },
      // },
    }
  );
  Users.addScope("limitCheck", {
    limit: 3,
  });

  //--------- Second way for hook ----------//

  Users.addHook("beforeValidate", "someCustomName", (user, option) => {
    user.name = "test name for hook";
    console.log("Second way for hook :-> " + user.name);
  });

  //------------ Third way for hook -----------//

  Users.afterValidate("myHookAfter", (user, option) => {
    user.name = "Toofan";
    console.log("Third way for hook :-> " + user.name);

    //---remove hook------//
    Users.removeHook("beforeValidate", "someCustomName");
  });

  return Users;
};
