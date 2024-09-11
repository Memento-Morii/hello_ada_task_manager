const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_hello_ada", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
// unityaqua_db
// unityaqua_user
// Raghavendraraju@123

module.exports = sequelize;
