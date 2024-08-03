const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Usuario = connection.define("Users", {
  nome: {type: DataTypes.STRING,allowNull: false},
  sexo: DataTypes.STRING,
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  endereco: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha: {type: DataTypes.STRING,allowNull: false},
  dataNascimento: DataTypes.DATE,
});

module.exports = Usuario;
