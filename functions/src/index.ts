/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions/v1";
import FilterImport from "bad-words";
type BadWordsConstructor = new () => {
  isProfane: (text: string) => boolean;
  clean: (text: string) => string;
};
const Filter = FilterImport as unknown as BadWordsConstructor;
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const detectEvilUsers = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc: functions.firestore.QueryDocumentSnapshot) => {
    const filter = new Filter();
    const { text, uid } = doc.data();

    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      await doc.ref.update({
        text: `🤐 I got banned for saying... ${cleaned}`,
      });
      await db.collection("banned").doc(uid).set({});
    }
  });
