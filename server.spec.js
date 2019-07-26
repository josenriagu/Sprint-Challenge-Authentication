const server = require('./server');
const request = require('supertest');

describe('server', () => {
   it('expect a 200 status', () => {
      return request(server)
         .get('/')
         .expect(200);
   })
})

// describe('test api endpoints', () => {
//    describe('POST /register', () => {
//       it('is able to register new user', async () => {
//          return request(server)
//             .post('/register')
//             .send({ username: 'Chisom', password: 'cousin' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .end(function (err, res) {
//                if (err) return done(err)
//                done();
//             })
//       })
//    })
// })