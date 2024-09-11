const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const User = require("./user");

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: [1, 2],
      defaultValue: 1,
    },
  },
  { freezeTableName: true }
);

User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
