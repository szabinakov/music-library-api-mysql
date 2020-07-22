const { Album } = require('../models');
const { Artist } = require('../models');
const album = require('../models/album');


exports.createAlbum = (req, res) => {
    const { artistId } = req.params;

    Artist.findByPk(artistId).then((theFoundArtist) => {
        if (!theFoundArtist) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            Album.create(req.body).then((album) => {
                album.setArtist(artistId).then((connectedAlbum) => {
                    res.status(201).send(connectedAlbum);
                });
            });
        }
    });
};

exports.readingAlbumByArtistId = (req, res) => {
    const { artistId } = req.params
    Artist.findByPk(artistId).then((foundArtist) => {
        if (!foundArtist) {
            res.status(404).json({ error: 'The artist could not be found.' })
        } else {
            Album.findAll({
                where: { artistId: artistId }
            }).then((foundAlbum) => {
                res.status(200).json(foundAlbum)
            })
        }
    })
}

exports.readingAlbumByAlbumId = (req, res) => {
    const { artistId } = req.params;
    const { albumId } = req.params

    Album.findByPk(albumId).then((foundAlbum) => {
        res.status(201).json(foundAlbum)
    }).catch((error) => {
        res.status(404).json({ error: 'This Album does not exist.' })
    })
}

exports.updatingAlbumByArtistId = (req, res) => {
    const { artistId } = req.params;
    Artist.findOne({ where: { id: artistId } }).then((gotArtist) => {
        if (!gotArtist) {
            res.status(404).json({ error: 'The artist could not be found.' })
        } else {
            Album.update(req.body, { where: { artistId: artistId } }).then(([updatedAlbum]) => {
                res.status(200).json(updatedAlbum)
            })
        }
    })
}
exports.updatingAlbumbyAlbumId = (req, res) => {
    const { artistId } = req.params
    const { albumId } = req.params
    Album.update(req.body, { where: { id: albumId, artistId: artistId } })
        .then((updatedAlbum) => {
            res.status(201).json(updatedAlbum)
        })
        .catch(error => {
            res.status(404).json({ error: 'This Album does not exist.' })
        })
}

exports.deletingAlbumByArtistId = (req, res) => {
    const { artistId } = req.params;

    Artist.findOne({ where: { id: artistId } }).then((gotArtist) => {
        if (!gotArtist) {
            res.status(404).json({ error: 'The artist could not be found.' })
        } else {
            Album.destroy({ where: { artistId: artistId } }).then((data) => {
                res.status(204).json(data)
            })
        }
    })

}

exports.deletingAlbumByAlbumId = (req, res) => {
    const { artistId } = req.params
    const { albumId } = req.params

    Artist.findByPk(artistId).then((gotArtist) => {
        console.log(gotArtist)
        if (!gotArtist) {
            res.status(404).json({ error: 'This Artist does not exist' })
        } else {
            Album.findByPk(albumId).then((foundAlbum) => {
                if (!foundAlbum) {
                    res.status(404).json({ error: 'This Album does not exist.' })
                } else {
                    Album.destroy({ where: { artistId: artistId, id: albumId } }).then((data) => {
                        console.log(data)
                        res.status(204).json(data)
                    })
                }
            })

        }
    })
}
