import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccountJson from '../firebase-adminsdk.json';
import { CONFIG } from '../config';

type TFirebaseUser = {
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  password: string;
  disabled: boolean;
}

const serviceAccount: ServiceAccount = serviceAccountJson as ServiceAccount;
console.log(CONFIG.BUCKET_URL);


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

export const uploadSingleFileToFirebase = async (req: any, destinationPath: string) => {

  const file = req?.file;
  const fileName = `${Date.now()}` + file.originalname;
  var buffer = new Uint8Array(file.buffer);

  const fileUpload = bucket.file(destinationPath + '/' + fileName);

  const result = new Date();
  result.setFullYear(result.getFullYear() + 50);

  const url = await fileUpload.getSignedUrl({ action: "read", expires: result });
  await fileUpload.save(buffer, { resumable: true });

  return url;
}