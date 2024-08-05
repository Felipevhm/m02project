const { Sequelize } = require("sequelize");
const databaseConfig = require("../config/database.config");

const connection = new Sequelize(databaseConfig);

connection
.sync({ alter: true })
.then(() => {
   console.log("Database synchronized");
})
.catch((err) => {
   console.error("Error synchronizing database:", err);
});

module.exports = connection;