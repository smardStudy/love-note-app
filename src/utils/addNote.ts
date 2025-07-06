import { clientPromise } from '../lib/mongodb';

export async function addNote(user: string, text: string) {
  if (!user || !text) {
    console.error('User or text is empty');
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('love-notes-db'); // change to your DB name
    const collection = db.collection('notes');

    const result = await collection.insertOne({
      user,
      text,
      time: new Date().toISOString(),
    });

    console.log('Note added:', result);
  } catch (error) {
    console.error('MongoDB insert error:', error);
  }
}
