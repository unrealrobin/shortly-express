const parseCookies = (req, res, next) => {

  let cookieString = req.get('Cookie');
  //.get() is ane express method
  // .get() retrieves any headers for the an object
  //parse the cookie string into an object of multiple/single key value cookie pairs.
  /*
    parsedCookies = {
      'cookieKey' : 'HashorSomething',
      'cookieKey2' : 'HashorSomething',
    }
  */
  console.log(cookieString);


  next(); //invokes the next middleware/step
};

module.exports = parseCookies;

//takes a tring returned by browser and turns it into a cookie object
// create cookies using
// res.cookie('cookieKey', 'cookiePropertyString')
// the goal of this module is only to turn the cookie string into a usable object