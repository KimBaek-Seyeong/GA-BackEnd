const jwt = require('jsonwebtoken');

// TODO secret키 변경
const JWT_SECRET_KEY = process.env.JWT_SECRET || 'secret';
const secret = process.env.NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret';

const model = require('../models/index');

exports.issue = (payload) => jwt.sign(payload, secret, {expiresIn: "10000h"});
exports.verify = (token, done) => {
  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) {
      switch (err.message) {
        case 'jwt expired':
          return done(10401);
        case 'invalid token':
          return done(10403);
        default:
          return done(err.message);
      }
    } else {
      const user = await model.User.findOne({
        where: {
          email: decoded.email
        }
      });
      return user ? done(null, user.id, user.name) : done(401);
    }
  })
};

