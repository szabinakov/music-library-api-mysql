const express = require('express');
const artistControllers = require('./controllers/artist.js')
const albumControllers = require('./controllers/album.js')
const songControllers = require('./controllers/song.js')

// const artistRouter = require('./routes/artist');
// const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

//ARTISTS
app.post('/artists', artistControllers.createArtist);

app.get('/artists', artistControllers.listAllArtist);

app.get('/artists/:id', artistControllers.getId);

app.patch('/artists/:id', artistControllers.updateArtist);

app.delete('/artists/:id', artistControllers.deleteArtist);

//ALBUMS

app.post('/artists/:id/albums', albumControllers.createAlbum);

app.get('/artists/:id/albums', albumControllers.readingAlbumByArtistId);

app.patch('/artists/:id/albums', albumControllers.updatingAlbumByArtistId);

app.delete('/artists/:id/albums', albumControllers.deletingAlbumByArtistId);

//SONGS

app.post('/albums/:id/songs', songControllers.createSong);


module.exports = app;
