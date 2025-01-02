import express from 'express';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/**
 * @swagger
 * /api/admin/email:
 *   post:
 *     summary: Send an email with multiple files or multiple file paths
 *     tags: [QuickActions]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: "navdeepmatrixecho@gmail.com"
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               filePaths:
 *                 type: string
 *                 description: "A JSON string representation of an array of file paths"
 *                 example: '[{"path": "https://storage.googleapis.com/node-auth-tt.appspot.com/uploads/1729154983687images.jfif?GoogleAccessId=firebase-adminsdk-mbmju%40node-auth-tt.iam.gserviceaccount.com&Expires=3306991783&Signature=S%2F2ymjSl%2BHhgBHDDCBDNpm5sg5aSXMnhv4VXYRcJMc%2BkoXBlPXV2JPHiq%2B0tPc1wKz8jxCVURejWzE9lOjJg1Flld9bmHkjbpNC%2FWaZVBreBNAUG0KMaJgT6qiNP8qNbbK2NVzJRPLM%2BDbiTl6wEgO6llVX99uADsyQcS46AgAh3ibdAhxvpivygfyy1yERsWC%2FNCMyJoUcWp7FnpWhB5EezzLzjVkHhKrkpk8w3Py6qeuC3SsCkn8IXWxiw4zPD%2FZ5vptIhEtKzehiC6AKdFEi4XoJgBglMBzM9%2F2yCfW2v0ebIYkWYr1f8HsaoDg2F4NM0ZEBORK6rns4Mwd4b4w%3D%3D", "name": "file1.jpg"}, {"path": "https://example.com/file2.jpg", "name": "file2.jpg"}]'
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "List of files to be uploaded"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email Sent"
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                       type:
 *                         type: string
 *                       context:
 *                         type: object
 *                         additionalProperties: true
 */

// router.post('/', upload.array('files'), EmailController.sendEmail);

export default router;
