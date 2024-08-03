
const Usuario  = require('../models/Usuario'); 
async function checkUserExists(req, res, next) {
  const userId = req.body.userId; 

  try {
    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: `User with id ${userId} not found`});
    }
    else {
      console.log(`~~ MIDDLEWARE checkUserExists | User with id:${user.id} with name ${user["nome"]} was found! ~~`)
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying user:', error);
    return res.status(500).json({ error: 'Server had an internal error' });
  }
}

module.exports = checkUserExists;
