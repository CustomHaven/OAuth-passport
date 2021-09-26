const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { GOOGLE, FB } = require('./index');
const db = require('../db')
const UserService = require('../services/UserService');
const userService = new UserService(db);


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  userService.findOneWithWhere(id).then((user) => {
    done(null, user);
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
})

passport.use(
  new GoogleStrategy({
    // option for the google strategy
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL, 
  }, (accessToken, refreshToken, profile, done) => {
    // passport cb
    console.log(profile)
    userService.thirdPartyLogin({ 
      username: profile.displayName, 
      google_id: profile.id,
      thumbnail: profile._json.picture,
      facebook_id: null
    }).then((newUser) => {
        // console.log('new user created: ', newUser)
        done(null, newUser)
    }).catch(err => console.log(err))
  })
)

passport.use(new FacebookStrategy({
  clientID: FB.CLIENT_ID,
  clientSecret: FB.CLIENT_SECRET,
  callbackURL: FB.CALLBACK_URL
}, function(accessToken, refreshToken, profile, cb) {
  userService.thirdPartyLogin({ 
    username: profile.displayName, 
    google_id: null,
    thumbnail: profile.profileUrl ? profile.profileUrl : null,
    facebook_id: profile.id,
  }).then((newUser) => {
      // console.log('new user created: ', newUser)
      cb(null, newUser)
  }).catch(err => console.log(err))
  }
));