/* eslint-disable no-console */

const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');


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
  describe('with albums in the database', () => {
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

    describe('GET/artists/:artistId/albums/:albumId', () => {
      it('it reads album by albumId', (done) => {
        let album = albums[0]
        request(app)
          .get(`/artists/${artist.id}/albums/${album.id}`)
          .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body.name).to.equal('First Album')
            expect(res.body.year).to.equal(2000)
            done()
          })
      })
      it('it sends 404 if the album does not exist', (done) => {
        request(app)
          .get(`/artists/${artist.id}/albums/999999`)
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('This Album does not exist.')
            done()
          })
      })
    })

    describe('PATCH /artists/:artistId/albums/:albumId', () => {
      it('updates the name of an album by albumId', (done) => {
        let album = albums[0]
        request(app)
          .patch(`/artists/${artist.id}/albums/${album.id}`)
          .send({ name: 'Updated album name' })
          .then((res) => {
            expect(res.status).to.equal(201);
            Album.findByPk(album.id)
              .then((updatedAlbum) => {
                expect(updatedAlbum.name).to.equal('Updated album name')
              })
          })
        done();
      })

      it('updates the year of the album by albumId', (done) => {
        let album = albums[0]
        request(app)
          .patch(`/artists/${artist.id}/albums/${album.id}`)
          .send({ year: 1234 })
          .then((res) => {
            expect(res.status).to.equal(201);
            Album.findByPk(album.id)
              .then((updatedAlbum) => {
                expect(updatedAlbum.year).to.equal(1234)
                expect(updatedAlbum.name).to.equal('Foist Album')
              })
            done();
          })
      })

      it('returns a 404 if the album does not exist', (done) => {
        request(app)
          .patch(`/artists/${artist.id}/albums/99999909090999`)
          .send({ year: 0000 })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The Album does not exist.')
          });
        done();
      });
      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .patch(`/artists/99999999999/albums/${artist.id}`)
          .send({ year: 0000 })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Artist does not exist.')
          });
        done();
      });
    })

    describe('DELETE /artists/:artistId/albums/:albumId', () => {
      it('deletes album record by id', (done) => {
        let album = albums[0];
        request(app)
          .delete(`/artists/${artist.id}/albums/${album.id}`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
              expect(updatedAlbum).to.equal(null);
              done();
            });
          });
      });
      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .delete('/artists/12345/albums/09090909')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('This Artist does not exist.');
            done();
          });
      });
    })





  })


});

