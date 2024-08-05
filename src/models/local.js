const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define("Local", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: DataTypes.STRING,
  cep: { type: DataTypes.STRING, allowNull: false }, 
  userId: { type: DataTypes.INTEGER, allowNull: false },
  localidade: DataTypes.STRING,
  coordenadas: DataTypes.TEXT, 
  googleMapsLink: DataTypes.STRING, 
}
, {
  tableName: 'Locations'
});


Local.associate = (models) => {
  Local.belongsTo(models.User);
};

module.exports = Local;
