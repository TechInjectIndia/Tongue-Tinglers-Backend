import { convertLogToJSON, deleteLogFiles, logger } from "../utils/logger";
import { Request, Response } from "express";

const convertToBuffer = (data: any) =>
    Buffer.from(JSON.stringify(data, null, 2), "utf-8");

// export const getLogs = async (req: Request, res: Response) => {
//     try {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(' ')[1];

//         if (!token) {
//             logger.error({
//                 method: req.method,
//                 url: req.url,
//                 headers: req.headers,
//                 body: req.body,
//                 error: 'token is required',
//             });
//             res.sendStatus(401);
//             return;
//         } else if (token === process.env.REGISTER_TOKEN) {
//             const data = convertLogToJSON('logs.log');
//             const errorLogData = convertLogToJSON('error.log');

//             // Convert JSON data to buffers
//             const logsBuffer = convertToBuffer(data);
//             const errorLogsBuffer = convertToBuffer(errorLogData);

//             const mail = await sendEmailWithAttachment([{
//                 filename: `attachment.json`,
//                 content: logsBuffer,
//             }, {
//                 filename: `error.json`,
//                 content: errorLogsBuffer,
//             }]);

//             if (mail) {
//                 deleteLogFiles('logs.log')
//                 deleteLogFiles('error.log')
//             } else {
//                 console.log('error in deletion');
//             }

//             res.status(201).send('done');
//         } else {
//             logger.error({
//                 method: req.method,
//                 url: req.url,
//                 headers: req.headers,
//                 body: req.body,
//                 error: 'Unauthorised',
//             });
//             res.sendStatus(401);
//         }

//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }
