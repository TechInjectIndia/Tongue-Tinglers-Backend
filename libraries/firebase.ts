const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');

type TFirebaseUser = {
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  password: string;
  disabled: boolean;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyFirebaseToken = async (idToken: string) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken;
}

export const createFirebaseUser = async (user: TFirebaseUser) => {
  try {
    const data = await admin.auth().createUser(user)
    return { success: true, uid: data?.uid };
  } catch (err) {
    return { success: false, uid: err?.errorInfo?.message ?? 'Something went wrong' };
  }
}
