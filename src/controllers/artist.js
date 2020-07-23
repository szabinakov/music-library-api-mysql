const { Artist } = require('../models');

exports.createArtist = (req, res) => {
    Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.listAllArtist = (_, res) => {
    Artist.findAll().then(artists => {
        res.status(200).json(artists);
    });
};
exports.getId = (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then(artist => {
        if (!artist) {
            res.status(404).json({ error: 'The artist could not be found.' })
        } else {
            res.status(200).json(artist)
        }
    });
};

exports.updateArtist = (req, res) => {
    const { artistId } = req.params;
    Artist.update(req.body, { where: { id: artistId } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    });
};

exports.deleteArtist = (req, res) => {
    const { artistId } = req.params;
    Artist.destroy({
        where: { id: artistId }
    }).then(data => {
        if (!data) {
            res.status(404).json({ error: 'The artist could not be found.' })
        } else {
            res.status(204).json(data)
        }
    })
}





