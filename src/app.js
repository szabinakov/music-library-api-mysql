const express = require('express');
const artistControllers = require('./controllers/artist.js')
const albumControllers = require('./controllers/album.js')
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

app.post('/artists', artistControllers.createArtist);

app.get('/artists', artistControllers.listAllArtist);

app.get('/artists/:id', artistControllers.getId);

app.patch('/artists/:id', artistControllers.updateArtist);

app.delete('/artists/:id', artistControllers.deleteArtist);

app.post('/artists/:id/albums', albumControllers.createAlbum);

module.exports = app;
