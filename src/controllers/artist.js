const { Artist } = require('../models');

exports.create = (req, res) => {
    Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.create = (req, res) => {

}