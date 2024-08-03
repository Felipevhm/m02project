const Local = require("../models/Local");
const { Op } = require("sequelize");

class LocalController {
  async create(request, response) {  
    const { nome, descricao, localidade, coordenadas, userId } = request.body;
  
    const errors = [];
    if (!nome) {
      errors.push({
        msg: "Nome do usuário é obrigatório e não nulo",
        param: "nome",
      });
    }
  
    if (!coordenadas) {
      errors.push({
        msg: "Campo de coordenadas é obrigatório e não nulo",
        param: "coordenadas",
      });
    }
  
    if (!userId) {
      errors.push({
        msg: "Campo de id de usuário é obrigatório e não nulo",
        param: "userId",
      });
    }
  
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
  
    try {
      const local = await Local.create({
        nome, descricao, localidade, coordenadas, userId
      });
      return response.status(201).json(local);
    } catch (error) {
      console.error('Erro ao criar o local:', error);
      return response.status(500).json({
        mensagem: "Não foi possível criar o local",
      });
    }
  }

}

module.exports = new LocalController();
