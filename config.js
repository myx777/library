require('dotenv').config();

module.exports = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    counterUrl: process.env.COUNTER_SERVICE_URL,
    port: process.env.PORT
};
