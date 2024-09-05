const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyFirebaseToken = async (idToken: string) => {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
}
