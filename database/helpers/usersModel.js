const db = require('../../config/dbConfig');

module.exports = {
   get: function () {
      return db('users')
         .select('id', 'username');
   },

   getUserById: function (id) {
      return db('users')
         .select('id', 'username')
         .where({ id })
         .first();
   },

   getBy: function (filter) {
      return db('users')
         .where(filter);
   },

   insertUser: function (user) {
      return db('users')
         .insert(user)
         .then(([id]) => {
            return this.getUserById(id);
         });
   },

   remove: function (id) {
      return db('users')
         .where('id', id)
         .del();
   }
}