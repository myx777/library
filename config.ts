import dotenv from 'dotenv';

dotenv.config();

export const config = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    counterUrl: process.env.COUNTER_SERVICE_URL,
    port: process.env.PORT
};
