// /* eslint-disable no-console */
// const { expect } = require('chai');
// const request = require('supertest');
// const app = require('../src/app');
// const { Artist, Album, Song } = require('../src/models');
// const { doc } = require('prettier');

// describe('/songs', () => {
//   let artist;
//   let album;

//   before(async () => {
//     try {
//       await Artist.sequelize.sync();
//       await Album.sequelize.sync();
//       await Song.sequelize.sync();
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   beforeEach(async () => {
//     try {
//       await Artist.destroy({ where: {} });
//       await Album.destroy({ where: {} });
//       await Song.destroy({ where: {} });
//       artist = await Artist.create({
//         name: 'Tame Impala',
//         genre: 'Rock',
//       });
//       album = await Album.create({
//         name: 'InnerSpeaker',
//         year: 2010,
//         artistId: artist.id,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   describe('POST /album/:albumId/song', () => {
//     it('creates a new song under an album', (done) => {
//       request(app)
//         .post(`/albums/${album.id}/songs`)
//         .send({
//           artist: artist.id,
//           name: 'Solitude Is Bliss',
//         })
//         .then((res) => {
//           expect(res.status).to.equal(201);
//           const songId = res.body.id;
//           expect(res.body.id).to.equal(songId);
//           expect(res.body.name).to.equal('Solitude Is Bliss');
//           expect(res.body.artistId).to.equal(artist.id);
//           expect(res.body.albumId).to.equal(album.id);
//           done();
//         });
//     });

//     it('returns a 404 if the album does not exist', (done) => {
//       request(app)
//         .post(`/albums/999999999999999/songs`)
//         .send({
//           artist: artist.id,
//           name: 'Solitude Is Bliss',
//         })
//         .then((res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.error).to.equal('The Album does not exist.')
//           done();
//         });
//     });
//   });

//   describe('with songs in the database', () => {
//     let songs;
//     beforeEach((done) => {
//       Promise.all([
//         Song.create({
//           name: 'First Song',
//           albumId: album.id
//         }),
//         Song.create({
//           name: 'Second Song',
//           albumId: album.id
//         }),
//         Song.create({
//           name: 'Third Song',
//           albumId: album.id
//         })
//       ]).then((documents) => {
//         songs = documents;
//         done();
//       })
//     })

//     // describe('GET/albums/:id/songs', () => {
//     //   it('gets all the songs by AlbumId', (done) => {
//     //     request(app)
//     //       .get(`/albums/${album.id}/songs`)
//     //       .then((res) => {
//     //         expect(res.status).to.equal(201)
//     //       })
//     //     done();
//     //   })

//     //   it('returns 404 if the Album does not exist', (done) => {
//     //     request(app)
//     //       .get(`/albums/099029333/songs`)
//     //       .then((res) => {
//     //         expect(res.status).to.equal(404)
//     //         console.log(res.body.err)
//     //         expect(res.body.error).to.equal('This A.lbum does not exist')
//     //       })
//     //     done();
//     //   })
//     // })
//   })
// })



