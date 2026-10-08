const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sri_amar_crackers';

    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 4000
      });
      console.log(`✅ MongoDB Connected successfully: ${conn.connection.host} / ${conn.connection.name}`);
      return conn;
    } catch (primaryErr) {
      console.warn(`Primary connection failed (${primaryErr.message}). Trying fallback in-memory server...`);
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongod = await MongoMemoryServer.create({
          instance: {
            launchTimeout: 30000
          }
        });
        const inMemoryUri = mongod.getUri();
        const conn = await mongoose.connect(inMemoryUri);
        console.log(`✅ MongoDB In-Memory Server Connected at: ${inMemoryUri}`);
        return conn;
      } catch (memErr) {
        throw new Error(`Unable to connect to MongoDB: ${primaryErr.message} | MemoryServer: ${memErr.message}`);
      }
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  } catch (e) {
    console.error('Error disconnecting DB:', e.message);
  }
};

module.exports = { connectDB, disconnectDB };
