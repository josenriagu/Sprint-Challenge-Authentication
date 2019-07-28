const db = require('../../config/dbConfig');
const Users = require('./usersModel');

beforeEach(async () => {
   await db('users').truncate();
});

describe('create or remove users', () => {
   it('is able to add a user to the db!', async () => {
      let users = await Users.get();
      expect(users).toHaveLength(0);

      // set up
      await Users.insertUser({ username: 'Emeka', password: 'password' });
      await Users.insertUser({ username: 'Chisom', password: 'password' });
      users = await Users.get();

      // assertion
      expect(users).toHaveLength(2);
   });

   it('is able to remove a users member from the db', async () => {
      // sanity: checking that trucate works, essentially
      let users = await Users.get();
      expect(users).toHaveLength(0);

      // set up
      await Users.insertUser({ username: 'Emeka', password: 'password' });
      await Users.insertUser({ username: 'Chisom', password: 'password' });
      await Users.remove(1)
      
      users = await Users.get()
      expect(users).toHaveLength(1);
   });
});