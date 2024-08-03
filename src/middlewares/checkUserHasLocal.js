const Local = require('../models/Local');
const Usuario = require('../models/Usuario');

async function checkUserHasLocal(req, res, next) {
  const userId = req.params.id;

  try {
    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: `User with id ${userId} not found`});
    }

    const userLocals = await Local.findAll({ where: { userId: userId } });
    if (userLocals.length > 0) {
      return res.status(403).json({ error: 'User cannot be deleted as an associated location was found.' });
    }

    next();
  } catch (error) {
    console.error('Error checking user locations:', error);
    return res.status(500).json({ error: 'Server had an internal error' });
  }
}

module.exports = checkUserHasLocal;
