const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      //if there isnt a cookie
      if (!hash) {
        //make a new session
        throw hash;
      }
      //otherwise  load the session from the database
      return models.Sessions.get({hash})
    })
    .then((session) => {
      if (!session) {
        //make a session
        throw session;
      }
      return session;
    })
    .catch(() => {
      //make a session
      return models.Sessions.create()
        .then( results => {
          return models.Sessions.get({ id: results.insertId});
        })
        .then(session => {
          res.cookie('shortlyid', session.hash);
          return session;
        });
    })
    .then(session => {
      req.session = session;
      next();
      //adds to the middleware chain
    });

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

/*
  if parsed cookie isnt valid, make a new session
  always need to check that the cookiesession is in our database and ensure that the session key isnt fake
  Promise.resolve() turns an value into a promise chain
  .tap() is like a .then() except it automatically returns the same argument to the next then statement. this makes you not need to call retun argument in some cases






*/