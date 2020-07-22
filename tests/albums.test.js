/* eslint-disable no-console */

const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');
const { get } = require('../src/app');

describe('/albums', () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
  });
  afterEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
    }
    catch (err) {
      console.log(err)
    }
  })

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });
  describe('with artists in the database', () => {
    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
        Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
        Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
      ]).then((documents) => {
        artists = documents;
        done();
      });
    });
    describe('with artists in the database', () => {
      let albums = [];
      beforeEach((done) => {
        Album.create({ name: 'First Album', year: '2000' })
          .then(album => {
            album.setArtist(artist);
            albums.push(album);
          })
          .then(() => Album.create({ name: 'Second Album', year: '2001' }))
          .then(album => {
            album.setArtist(artist);
            albums.push(album);
          })
          .then(() => Album.create({ name: 'Third Album', year: '2002' }))
          .then(album => {
            album.setArtist(artist);
            albums.push(album);
            done();
          })
      });


      describe('GET/artists/:id/albums', () => {
        it('reads the year, name of an album by artistID', (done) => {
          request(app)
            .get(`/artists/${artist.id}/albums`)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body[0].name).to.equal('First Album');
              expect(res.body[0].year).to.equal(2000);
              done();
            });
        });
        it('returns a 404 if the artist does not exist', (done) => {
          request(app)
            .get('/artists/12345/albums')
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('The artist could not be found.');
              done();
            });
        });
      });

      describe('GET/artists/:artistId/albums/:albumId', () => {
        it('it reads album by albumId', (done) => {
          let album = albums[0]
          request(app)
            .get(`/artists/${artist.id}/albums/${album.id}`)
            .then((res) => {
              expect(res.status).to.equal(201);
              expect(res.body.name).to.equal(album.name)
              done()
            })
        })
      })

      describe('PATCH /artists/:id/albums', () => {
        xit('updates the name of an album by artistId', (done) => {
          request(app)
            .patch(`/ artists / ${artist.id} / albums`)
            .send({ name: 'Updated album name' })
            .then((res) => {
              expect(res.status).to.equal(200);
              Album.findOne({ where: { artistId: artist.id } })
                .then((findAlbum) => {
                  expect(findAlbum.dataValues.name).to.equal('Updated album name')
                })
              done();
            })
        })
        xit('updates the year of an album by artistId', (done) => {
          request(app)
            .patch(`/ artists / ${artist.id} / albums`)
            .send({ year: 1234 })
            .then((res) => {
              expect(res.status).to.equal(200);
              Album.findOne({ where: { artistId: artist.id } })
                .then((findAlbum) => {
                  expect(findAlbum.dataValues.year).to.equal(1234)
                })
              done();
            })
        })
        xit('returns a 404 if the artist does not exist', (done) => {
          request(app)
            .patch('/artists/12345/albums')
            .send({ year: 0000 })
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('The artist could not be found.');
              done();
            });
        });
      })
      describe('DELETE /artists/:id/albums', () => {
        xit('deletes the album by artistId', () => {
          request(app)
            .delete(`/ artists / ${artist.id} / albums`)
            .then((res) => {
              expect(res.status).to.equal(204);
              Album.findOne({ where: { artistId: artist.id } })
                .then((findAlbum) => {
                  expect(findAlbum).to.equal(null)
                })
            })
        })
        xit('returns a 404 if the artist does not exist', (done) => {
          request(app)
            .delete('/artists/12345/albums')
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('The artist could not be found.');
              done();
            });
        });
      })
    });

  })
})