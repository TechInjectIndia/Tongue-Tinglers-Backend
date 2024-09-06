const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');
import { CONFIG } from '../config';
import dayjs from 'dayjs';

type TFirebaseUser = {
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  password: string;
  disabled: boolean;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: CONFIG.BUCKET_URL
});

const bucket = admin.storage().bucket();

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

export const uploadSingleFileToFirebase = async (req: any) => {
  const file = req?.file;
  const fileName = `${Date.now()}` + file.originalname;
  var buffer = new Uint8Array(file.buffer);
  const url = await bucket
    .file(fileName)
    .getSignedUrl({ action: "read", expires: dayjs().add(50, 'year') });
  await bucket.file(fileName).save(buffer, { resumable: true });
  return url;
}
