const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRouters = require('./routes/auth-routes');
const profileRouters = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const { SESSION, LOCAL } = require('./config');
const db = require('./db');
const PORT = process.env.PORT || LOCAL;
const app = express();

// connect to PGSQL db with Sequelize ORM
db.authenticate()
        .then(() => console.log('Database connection has been established'))
        .catch(err => console.log(`Unable to connect to the database: ${err}`))

// setup middlewares
app.use(morgan('dev'));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [SESSION.COOKIE]
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session())

// set up view engine
app.set('view engine', 'ejs');


// set up routes
app.use('/auth', authRouters);
app.use('/profile', profileRouters);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user })
});


app.listen(PORT, () => console.log(`SERVER IS ON PORT ${PORT}`));