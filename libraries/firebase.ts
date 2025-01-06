import admin, { ServiceAccount } from "firebase-admin";
import serviceAccountJson from "../firebase-adminsdk.json";
import { CONFIG } from "../config";

type TFirebaseUser = {
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    password: string;
    disabled: boolean;
};

const serviceAccount: ServiceAccount = serviceAccountJson as ServiceAccount;
console.log(CONFIG.BUCKET_URL);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: CONFIG.BUCKET_URL,
});

const bucket = admin.storage().bucket();

export const verifyAndUpdatePassword = async (
    uid: string,
    newPassword: string
) => {
    try {
        // Verify the user exists by fetching their details
        const userRecord = await admin.auth().getUser(uid);

        // If user is found, proceed to update the password
        if (userRecord) {
            console.log("userRecord", userRecord);
            await admin.auth().updateUser(uid, { password: newPassword });
            return { success: true, message: "Password updated successfully." };
        }
    } catch (error) {
        return {
            success: false,
            message: error.message || "Failed to update password.",
        };
    }
};

export const verifyFirebaseToken = async (idToken: string) => {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
};

export const createFirebaseUser = async (user: TFirebaseUser) => {
    try {
        // so we can use many number on same account
        // delete user.phoneNumber;
        const {uid} = await admin.auth().createUser(user);
        return { success: true, uid };
    } catch (err) {
        return {
            success: false,
            error: err?.errorInfo?.message ?? "Something went wrong",
        };
    }
};

export const checkFirebaseUser = async (email: string) => {
    try {
        const {uid} = await admin.auth().getUserByEmail(email);

        return { success: true, uid };
    } catch (err) {
        return {
            success: false,
            error: err?.errorInfo?.message ?? "Something went wrong",
        };
    }
};

export const uploadSingleFileToFirebase = async (
    req: any,
    destinationPath: string
) => {
    const file = req?.file;
    const fileName = `${Date.now()}` + file.originalname;
    var buffer = new Uint8Array(file.buffer);

    const fileUpload = bucket.file(destinationPath + "/" + fileName);

    const result = new Date();
    result.setFullYear(result.getFullYear() + 50);

    const url = await fileUpload.getSignedUrl({
        action: "read",
        expires: result,
    });
    await fileUpload.save(buffer, { resumable: true });

    return url;
};

export const uploadFileToFirebase = async (
    file: any,
    destinationPath: string
) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(`${destinationPath}/${fileName}`);

    // Check if buffer is available
    if (!file.buffer) {
        throw new Error("File buffer is undefined");
    }

    // Use the file.buffer directly
    await fileUpload.save(file.buffer, { resumable: false });

    const result = new Date();
    result.setFullYear(result.getFullYear() + 50);

    const url = await fileUpload.getSignedUrl({
        action: "read",
        expires: result,
    });
    return url;
};

export const getAllFilesFromFirebase = async (prefix: string = "") => {
    const [files] = await bucket.getFiles({ prefix }); // List files with optional prefix
    return files.map((file) => ({
        name: file.name,
        publicUrl: `https://storage.googleapis.com/${CONFIG.BUCKET_URL}/${file.name}`,
        createdAt: file.metadata.timeCreated
            ? file.metadata.timeCreated.toString()
            : "Unknown", // Ensure createdAt is a string
    })); // Return file details
};

export const deleteFileFromFirebase = async (fileName: string) => {
    const file = bucket.file(fileName);
    await file.delete(); // Delete the file
};
