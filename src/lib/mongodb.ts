import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export { clientPromise }; // ✅ named export
