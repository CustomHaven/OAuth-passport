const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CONFIG = require('./index');
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
    clientID: CONFIG.GOOGLE.CLIENT_ID,
    clientSecret: CONFIG.GOOGLE.CLIENT_SECRET,
    callbackURL: CONFIG.GOOGLE.CALLBACK_URL, 
  }, (accessToken, refreshToken, profile, done) => {
    // passport cb
    console.log(profile)
    const user = userService.thirdPartyLogin({ 
      username: profile.displayName, 
      google_id: profile.id, 
      thumbnail: profile._json.picture
    }).then((newUser) => {
        // console.log('new user created: ', newUser)
        done(null, newUser)
    }).catch(err => console.log(err))
  })
)