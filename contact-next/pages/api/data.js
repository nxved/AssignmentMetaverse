import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'contacts';
const collectionName = 'contact';

export default async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();
    res.status(200).json({ data });
  } finally {
    await client.close();
  }
};
