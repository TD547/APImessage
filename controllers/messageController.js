const {Sequelize} = require("sequelize");
const Message = require('../models/index').Message;

exports.getAll = (req, res, next) => {
    Message.findAll({
        attributes: ['id', 'auteur', 'contenu', 'date']
    }).then(message => {
        res.status(200).json(message)
    }).catch(err => res.status(500).json({error: err.message}))
}

exports.getById = (req, res, next) => {
    Message.findOne({
        attributes: ['auteur', 'contenu', 'date'],
        where: {
            id: req.params.id
        }
    }).then(message => {
        if(message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({error: 'Le message n\'a pas été trouvé'})
        }
    }).catch(err => res.status(500).json({error :err.message}))
}

exports.update = (req, res, next) => {
    Message.findOne({
        where: {
            id: req.params.id
        }
    }).then(message => {
        if (message) {
            message.auteur = req.body.auteur
            message.contenu = req.body.contenu
            message.date = req.body.date
            message.save()
                .then(res.status(200).json())
                .catch(err => res.status(500).json(err))
        } else res.status(404).json({error: 'Le message n\'a pas été trouvé'})
    }).catch(err => res.status(500).json(err))
}

exports.delete = (req, res, next) => {
    Message.findOne({
        where: {
            id: req.params.id
        }
    }).then(message => {
        if (message) {
            message.destroy()
                .then(() => res.status(200).json())
                .catch(err => res.status(500).json(err))
        } else res.status(404).json({error: 'Le message n\'a pas été trouvé'})
    }).catch(err => res.status(500).json(err))
}

exports.create = (req, res, next) => {
    console.log(req.body)
    Message.create({
        auteur: req.body.auteur,
        contenu: req.body.contenu,
        date: req.body.date
    }).then(() => {
        res.status(201).json()
    }).catch(err => res.status(500).json(err))
}