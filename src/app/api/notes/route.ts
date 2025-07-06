import { NextRequest, NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { user, text } = await req.json();
    const client = await clientPromise;
    const db = client.db('loveNotesDB');
    const collection = db.collection('notes');

    const result = await collection.insertOne({ user, text, time: new Date() });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error adding note:', error);
    return NextResponse.json({ success: false, error });
  }
}
