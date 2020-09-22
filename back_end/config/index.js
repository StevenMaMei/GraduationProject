require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  tokenExpiration: process.env.TOKEN_EXPIRATION = '48h',
  authenticationSeed: process.env.AUTHENTICATION_SEED = process.env.AUTHENTICATION_SEED ||  'este-es-el-seed-desarrollo'
};

module.exports = { config };