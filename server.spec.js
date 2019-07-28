const server = require('./server');
const request = require('supertest');

describe('server', () => {
   it('expect a 200 status', () => {
      return request(server)
         .get('/')
         .expect(200);
   });
});

describe('test api endpoints', () => {
   describe('POST /register', () => {
      it('is able to register new user', async () => {
         return request(server)
            .post('api/auth/register')
            .send({ username: 'Chisom', password: 'cousin' })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .end(function (err, res) {
               if (err) return done(err)
               done();
            })
      });
   });
   describe('POST /login', () => {
      it('will not login users not found in the db', async () => {
         return request(server)
            .post('api/auth/login')
            .send({ username: 'Chisom', password: 'cousin' })
            .set('Accept', 'application/json')
            .expect(403);
      });
   });
   describe('GET /jokes', () => {
      it('returns 403 for entry without token', async () => {
         return request(server)
            .get('api/main/jokes')
            .expect(403)
      })
   })
});