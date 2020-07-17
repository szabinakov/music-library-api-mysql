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

exports.readingAlbumByArtistId = (req, res) => {
    const id = req.params.id
    Artist.findByPk(id).then((foundArtist) => {
        if (!foundArtist) {
            res.status(404).json({ error: 'The artist could not be found' })
        } else {
            Album.findAll({
                where: { artistId: id }
            }).then((foundAlbum) => {
                res.status(201).json(foundAlbum)
            })
        }
    })
}
exports.updatingAlbumbyArtistId = (req, res) => {
    const id = req.params.id;
    Album.findOne({ where: { artistId: id } }).then((gotArtist) => {
        if (!gotArtist) {
            res.status(404).json({ error: 'The artist could not be found' })
        } else {
            Album.update(req.body, { where: { artistId: id } }).then(([updatedAlbum]) => {
                res.status(201).json(updatedAlbum)
            })
        }
    })
}
//updating
//deleting 