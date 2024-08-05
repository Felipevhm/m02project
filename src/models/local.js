const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define("Local", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: DataTypes.STRING,
  localidade: DataTypes.STRING,
  coordenadas: DataTypes.TEXT, // allowNull constraint removed
  userId: { type: DataTypes.INTEGER, allowNull: false },
  cep: { type: DataTypes.STRING, allowNull: false }, // new field
  googleMapsLink: DataTypes.STRING, // new field
});

Local.associate = (models) => {
  Local.belongsTo(models.User);
};

module.exports = Local;
