const express = require('express');
const router = express.Router();

const messageControlleur = require('../controllers/messageController');

router.get('/', messageControlleur.getAll);
router.get('/:id', messageControlleur.getById);
router.put('/', messageControlleur.create);
router.post('/:id', messageControlleur.update);
router.delete('/:id',messageControlleur.delete);

module.exports = router;


