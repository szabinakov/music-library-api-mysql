const { Album } = require('../models');
const { Artist } = require('../models');


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
            res.status(404).json({ error: 'Artist does not exist.' })
        } else {
            Album.findAll({ where: { artistId: artistId } }).then((foundAlbum) => {
                res.status(201).json(foundAlbum)
            })
        }
    })
}

exports.readingAlbumByAlbumId = (req, res) => {
    const { artistId } = req.params
    const { albumId } = req.params

    Album.findAll({ where: { id: albumId, artistId: artistId } }).then((foundAlbum) => {
        if (foundAlbum.length === 0) {
            res.status(404).json({ error: 'This Album does not exist.' })
        } else {
            res.status(201).json(foundAlbum)
        }
    })
}


exports.updatingAlbumbyAlbumId = (req, res) => {
    const { artistId } = req.params;
    const { albumId } = req.params;

    Album.findAll({ where: { artistId: artistId, id: albumId } }).then((foundAlbums) => {
        if (!foundAlbums) {
            res.status(404).json({ error: 'The album could not be found.' });
        } else {
            Album.update(req.body, { where: { artistId: artistId, id: albumId } })
                .then((updatedAlbum) => {
                    res.status(201).json(updatedAlbum)
                })
        }
    });
}


exports.deletingAlbumByAlbumId = (req, res) => {
    const { artistId } = req.params
    const { albumId } = req.params


    Artist.findByPk(artistId).then((FoundArtist) => {
        if (!FoundArtist) {
            res.status(404).json({ error: 'This Artist does not exist.' })
        } else {
            Album.destroy({ where: { artistId: artistId, id: albumId } }).then((data) => {
                res.status(204).json(data)
            })
        }
    })

}




