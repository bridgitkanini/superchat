import { Handler } from '@netlify/functions';
import { Filter } from 'bad-words';
import admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.firestore();

interface MessageData {
  text: string;
  uid: string;
  id?: string;
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
    const { text, uid, id } = JSON.parse(event.body || '{}') as MessageData;
    
    if (!text || !uid || !id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const filter = new Filter();
    
    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      
      // Update the message in Firestore
      await db.collection('messages').doc(id).update({
        text: `🤐 I got banned for saying... ${cleaned}`,
      });
      
      // Add to banned collection
      await db.collection('banned').doc(uid).set({});
      
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
