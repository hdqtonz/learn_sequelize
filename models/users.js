module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("name", value + " patel");
      },
      get() {
        return this.getDataValue("name") + " ABC " + this.email;
      },
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "test@email.com",
      set(value) {
        this.setDataValue("email", value + "@gmail.com");
      },
    },
    gender: {
      type: DataTypes.STRING,
    },
  });
  return Users;
};
