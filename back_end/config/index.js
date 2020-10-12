require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  email: process.env.EMAIL,
  emailClientID: process.env.EMAIL_CLIENT_ID,
  emailClientSecret: process.env.EMAIL_CLIENT_SECRET,
  emailRefreshToken: process.env.EMAIL_REFRESH_TOKEN,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  tokenExpiration: process.env.TOKEN_EXPIRATION = '48h',
  authenticationSeed: process.env.AUTHENTICATION_SEED = process.env.AUTHENTICATION_SEED ||  'este-es-el-seed-desarrollo'
};

module.exports = { config };