const { Album } = require('../models');
const { Artist } = require('../models');


exports.createAlbum = (req, res) => {
    const id = req.params.id;

    Artist.findByPk(id).then((theFoundArtist) => {
        if (!theFoundArtist) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            Album.create(req.body).then((album) => {
                album.setArtist(id).then((connectedAlbum) => {
                    res.status(201).send(connectedAlbum);
                });
            });
        }
    });
};