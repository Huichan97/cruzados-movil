import dotenv from 'dotenv';
import db = require('./config/db');
import app from './app';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI as string;

const startServer = async () => {
  await db.connectDB(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
