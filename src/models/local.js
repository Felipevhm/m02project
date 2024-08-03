const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define("Local", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: DataTypes.STRING,
  localidade: DataTypes.STRING,
  coordenadas: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});
Local.associate = (models) => {
  Local.belongsTo(models.User);
};

module.exports = Local;
