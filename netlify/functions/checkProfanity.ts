import { Handler } from '@netlify/functions';
import { Filter } from 'bad-words';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

// Initialize Firebase Admin if it hasn't been initialized yet
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

interface MessageData {
  text: string;
  uid: string;
  id?: string;
  photoURL?: string;
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { text, uid, id, photoURL } = JSON.parse(event.body || '{}') as MessageData;
    
    if (!text || !uid || !id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const filter = new Filter();
    
    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      
      // Add the message to Firestore
      const messageData = {
        text: `🤐 I got banned for saying... ${cleaned}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL: photoURL || null
      };
      
      // Update the message in Firestore
      await db.collection('messages').doc(id).update(messageData);
      
      // Add to banned collection
      await db.collection('banned').doc(uid).set({ timestamp: admin.firestore.FieldValue.serverTimestamp() });
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Message contains profanity and has been moderated',
          moderated: true,
          cleanedText: `🤐 I got banned for saying... ${cleaned}`
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Message is clean',
        moderated: false 
      }),
    };
  } catch (error) {
    console.error('Error processing message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
