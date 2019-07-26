const Users = require('./usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('./secrets');

module.exports = {
   validateUser,
   validateLogin,
   authenticate
}

function validateUser(req, res, next) {
   if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      if (req.body.username && req.body.password) {
         next();
      } else {
         res.status(400).json({ message: 'You missed the required username and/or password fields' })
      }
   } else {
      res.status(400).json({ message: 'Please provide valid user data' })
   };
};

function validateLogin(req, res, next) {
   let { username, password } = req.body
   Users.getBy({ username })
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            req.user = user;
            req.token = token;
            next();
         } else {
            res.status(401).json({ message: 'Oops! Invalid Credentials' });
         }
      })
      .catch((error) => {
         res.status(401).json({ message: 'Oops! Invalid Credentials' });
      });
};

function generateToken(user) {
   const payload = {
      sub: user.id,
      username: user.username,
      department: user.department
      // You can add more keys and useful pieces of info beyond this line
   }
   const options = {
      expiresIn: '1d'
   }
   return jwt.sign(payload, secret.jwtKey, options);
};

function authenticate(req, res, next) {
   const token = req.get('Authorization');

   if (token) {
      jwt.verify(token, secret.jwtKey, (err, decoded) => {
         if (err) {
            return res.status(401).json(err)
         };

         req.decoded = decoded;

         next();
      });
   } else {
      return res.status(401).json({
         error: 'No token provided, must be set on the Authorization Header',
      });
   }
}