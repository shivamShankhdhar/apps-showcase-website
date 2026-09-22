import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export function isDbConfigured(): boolean {
  return Boolean(MONGO_URI && MONGO_URI.trim().length > 0);
}

export default async function connectDB(): Promise<typeof mongoose | null> {
  if (!isDbConfigured()) {
    return null;
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached!.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.error('MongoDB connection error in apps hub:', e);
    return null;
  }

  return cached!.conn;
}
