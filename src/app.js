const express = require('express');
const artistControllers = require('./controllers/artist.js')
const albumControllers = require('./controllers/album.js')
const songControllers = require('./controllers/song.js');

// const artistRouter = require('./routes/artist');
// const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

//ARTISTS
app.post('/artists', artistControllers.createArtist);

app.get('/artists', artistControllers.listAllArtist);
app.get('/artists/:artistId', artistControllers.getId);

app.patch('/artists/:artistId', artistControllers.updateArtist);

app.delete('/artists/:artistId', artistControllers.deleteArtist);

//ALBUMS

app.post('/artists/:artistId/albums', albumControllers.createAlbum);

app.get('/artists/:artistId/albums', albumControllers.readingAlbumByArtistId);
app.get('/artists/:artistId/albums/:albumId', albumControllers.readingAlbumByAlbumId);

app.patch('/artists/:artistId/albums', albumControllers.updatingAlbumByArtistId);
//app.patch('/artists/:artistId/albums/:albumId', albumControllers.updatingAlbumbyAlbumId);

app.delete('/artists/:artistId/albums', albumControllers.deletingAlbumByArtistId);
//app.delete('/artists/:artistId/albums/:albumId', albumControllers.deletingAlbumByAlbumId);

//SONGS

app.post('/albums/:id/songs', songControllers.createSong);

app.get('/albums/:id/songs', songControllers.getSongByAlbumId);

// app.delete('albums/:id/songs', songControllers.deleteSongByAlbumId);

module.exports = app;
