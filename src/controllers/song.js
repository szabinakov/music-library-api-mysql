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

// {
//     include: [{
//         model: Artist,
//         as: 'artist'
//     }, {
//         model: Album,
//         as: 'album'
//     }]
// }


// song.setAlbum(id).then((createdSong) => {
//     res.status(201).json(
//         console.log(createdSong.artistId))
// })