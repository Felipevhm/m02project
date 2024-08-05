const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const checkUserExists = require("../middlewares/checkUserExists");
const authUser = require("../middlewares/authUser");

const localRoutes = new Router();

localRoutes.post("/", 
  authUser, 
  /* 
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para criar um local',
    #swagger.parameters['criarLocal'] = {
        in: 'body',
        description: 'Dados do local',
        required: true,
        schema: {
            $nome: "Local Teste",
            $cep: "12345-678",
            coordenadas: "-23.5505,-46.6333",
            descricao: "Descrição do local",
            localidade: "Localidade Teste"
        }
    }
    #swagger.responses[201] = {
        description: 'Local criado com sucesso',
        schema: {
            id: 1,
            nome: "Local Teste",
            descricao: "Descrição do local",
            cep: "12345-678",
            userId: 1,
            localidade: "Localidade Teste",
            coordenadas: "-23.5505,-46.6333",
            googleMapsLink: "https://maps.google.com/?q=-23.5505,-46.6333"
        }
    }
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados',
        schema: { errors: [{ msg: "Mensagem de erro", param: "campo" }] }
    }
    #swagger.responses[500] = {
        description: 'Erro ao criar local',
        schema: { message: "Error creating new location" }
    }
  */
  LocalController.create
);

localRoutes.get("/", 
  authUser, 
  /* 
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para buscar todos os locais',
    #swagger.parameters['nome'] = { in: 'query', description: 'Nome do local', required: false }
    #swagger.parameters['descricao'] = { in: 'query', description: 'Descrição do local', required: false }
    #swagger.parameters['localidade'] = { in: 'query', description: 'Localidade do local', required: false }
    #swagger.parameters['coordenadas'] = { in: 'query', description: 'Coordenadas do local', required: false }
    #swagger.parameters['cep'] = { in: 'query', description: 'CEP do local', required: false }
    #swagger.parameters['googleMapsLink'] = { in: 'query', description: 'Link do Google Maps do local', required: false }
    #swagger.responses[200] = {
        description: 'Locais buscados com sucesso',
        schema: [{ 
            id: 1,
            nome: "Local Teste",
            descricao: "Descrição do local",
            cep: "12345-678",
            userId: 1,
            localidade: "Localidade Teste",
            coordenadas: "-23.5505,-46.6333",
            googleMapsLink: "https://maps.google.com/?q=-23.5505,-46.6333"
        }]
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar locais',
        schema: { mensagem: "Unable to search for locations" }
    }
  */
  LocalController.searchAll
);

localRoutes.put("/:id", 
  authUser, 
  /* 
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para atualizar um local',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do local', required: true }
    #swagger.parameters['atualizarLocal'] = {
        in: 'body',
        description: 'Dados do local para atualizar',
        required: true,
        schema: {
            nome: "Local Atualizado",
            descricao: "Descrição atualizada",
            localidade: "Localidade Atualizada",
            coordenadas: "-23.5505,-46.6333",
            cep: "12345-678",
            googleMapsLink: "https://maps.google.com/?q=-23.5505,-46.6333"
        }
    }
    #swagger.responses[200] = {
        description: 'Local atualizado com sucesso',
        schema: {
            id: 1,
            nome: "Local Atualizado",
            descricao: "Descrição atualizada",
            cep: "12345-678",
            userId: 1,
            localidade: "Localidade Atualizada",
            coordenadas: "-23.5505,-46.6333",
            googleMapsLink: "https://maps.google.com/?q=-23.5505,-46.6333"
        }
    }
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados',
        schema: { errors: [{ msg: "Mensagem de erro", param: "campo" }] }
    }
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: { mensagem: "No location found with this id" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao atualizar local',
        schema: { mensagem: "Unable to update location" }
    }
  */
  LocalController.update
);

localRoutes.delete("/:id", 
  authUser, 
  /* 
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para deletar um local',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do local', required: true }
    #swagger.responses[204] = {
        description: 'Local deletado com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: { mensagem: "No location found with this id" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao deletar local',
        schema: { mensagem: "Unable to retrieve location" }
    }
  */
  LocalController.delete
);

localRoutes.get("/:id", 
  authUser, 
  /* 
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para buscar um local pelo ID',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do local', required: true }
    #swagger.responses[200] = {
        description: 'Local buscado com sucesso',
        schema: {
            id: 1,
            nome: "Local Teste",
            descricao: "Descrição do local",
            cep: "12345-678",
            userId: 1,
            localidade: "Localidade Teste",
            coordenadas: "-23.5505,-46.6333",
            googleMapsLink: "https://maps.google.com/?q=-23.5505,-46.6333"
        }
    }
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: { mensagem: "No location found with this id" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar local',
        schema: { mensagem: "Unable to search for location" }
    }
  */
  LocalController.searchOne
);

localRoutes.get("/:id/maps", 
  authUser, 
  /* 
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para buscar um link do Google Maps de um local pelo ID',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do local', required: true }
    #swagger.responses[200] = {
        description: 'Link do Google Maps buscado com sucesso',
        schema: {
            nome: "Local Teste",
            googleMapsLink: "https://maps.google.com/?q=-23.5505,-46.6333"
        }
    }
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: { mensagem: "No location found with this id" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar link do Google Maps',
        schema: { mensagem: "Unable to search for location" }
    }
  */
  LocalController.searchOneMap
);

module.exports = localRoutes;
