// models/user.js
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    sexo: DataTypes.STRING,
    cpf: { type: DataTypes.STRING, unique: true },
    endereco: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    senha: DataTypes.STRING,
    dataNascimento: DataTypes.DATE
  });
  return Usuario;
};
