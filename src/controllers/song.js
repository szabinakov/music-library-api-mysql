const { Artist, Album, Song } = require('../models')


exports.createSong = (req, res) => {
    const id = req.params.id

    Album.findByPk(id).then((foundAlbum) => {
        if (!foundAlbum) {
            res.status(404).json({ error: 'The Album does not exist.' })
        } else {
            Song.create({ name: req.body.name, albumId: req.params.id, artistId: foundAlbum.artistId }).then(newSong => {
                Song.findByPk(newSong.id, {
                    include: [{
                        model: Album,
                        as: 'album'
                    }, {
                        model: Artist,
                        as: 'artist'
                    }]
                }).then((foundSong) => {
                    res.status(201).json(foundSong)
                })
            })
        }
    })
}

exports.getSongByAlbumId = (req, res) => {
    const id = req.params.id

    Album.findByPk(id).then((foundAlbum) => {
        if (!foundAlbum) {
            res.status(404).json({ error: 'This Album does not exist' })
        } else {
            Song.findAll({ where: { albumId: id } }).then((foundSong) => {
                console.log(foundSong)
                res.status(201).json(foundSong)
            })
        }
    })
}
// exports.deleteSongByAlbumId = (req, res) => {
//     const id = req.params.id

//     Album.findOne({ where: { id } }).then((foundAlbum) => {
//         if (!foundAlbum) {
//             res.status(404).json({ error: 'This Album does not exist.' })
//         } else {
//             Song.destroy({ where: { albumId: id } }).then((data) => {
//                 res.status(204).json(data)
//             })
//         }
//     })
// }

