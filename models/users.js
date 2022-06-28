module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      // set(value) {
      //   this.setDataValue("name", value + " patel");
      // },
      // get() {
      //   return this.getDataValue("name") + " ABC " + this.email;
      // },
    },
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
  });
  return Users;
};
