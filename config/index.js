require('dotenv').config();
module.exports = {
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
  },
  FB: {
    CLIENT_ID: process.env.FB_CLIENT_ID,
    CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
    CALLBACK_URL: process.env.FN_CALLBACK_URL
  },
  DB: {
    PG_HOST: process.env.PG_HOST,
    PG_USER: process.env.PG_USER,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_PORT: process.env.PG_PORT,
    DATABASE_URI: process.env.DATABASE_URI
  },
  SESSION: {
    COOKIE: process.env.COOKIE_SESSION
  },
  LOCAL: process.env.PORT
}