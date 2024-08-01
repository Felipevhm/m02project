module.exports = (sequelize, DataTypes) => {
   const Local = sequelize.define('Local', {
     nome: DataTypes.STRING,
     descricao: DataTypes.STRING,
     localidade: DataTypes.STRING,
     coordenadas: DataTypes.GEOGRAPHY,
     userId: DataTypes.INTEGER
   });
   Local.associate = models => {
     Local.belongsTo(models.User);
   };
   return Local;
 };
 