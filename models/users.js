module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        defaultValue: "test@email.com",
      },
      gender: {
        type: DataTypes.STRING,
      },
    },
    {
      //   timestamps: false,
      //   createdAt: true,
      //   updatedAt: false,
      //   createdAt: "create_at",
      //   updatedAt: "updated_at",
    }
  );
};
