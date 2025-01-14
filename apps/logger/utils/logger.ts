import { createLogger, format, transports, } from "winston";
import path from "path";
import fs from "fs";
const folderPath = require('../../../path.config');

const winston = require('winston');
require('winston-daily-rotate-file')

// Ensure the log folder exists
const filePath = folderPath + "/logs";

// Configure daily rotating file transport
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    dirname: 'logs', // Directory to store logs
    filename: '%DATE%.log', // Log file name pattern
    datePattern: 'YYYY-MM-DD', // Date pattern for file rotation
    zippedArchive: true, // Compress older logs into .gz files
    maxSize: '20m', // Maximum size of a log file before rotation
    maxFiles: '14d', // Retain logs for 14 days
});

const filelogger = winston.createLogger({
    level: 'info', // Logging level
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss', // Timestamp format
      }),
      winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`) // Log format
    ),
    transports: [
      dailyRotateFileTransport, // Daily rotating file transport
      new winston.transports.Console(), // Optional: Log to console
    ],
});

if (!fs.existsSync(filePath)) {
    try {
        fs.mkdirSync(filePath, { recursive: true });
        console.log("Log folder created at:", filePath);
    } catch (error) {
        console.error("Failed to create log folder:", error);
    }
}
// Custom format to filter out errors for logs.log
const infoFilterFormat = format((info) => {
    if (info.level === "error") {
        return false;
    }
    return info;
});

// Custom format for error.log
const errorFilterFormat = format((info) => {
    if (info.level === "error") {
        return info;
    }
    return false;
});

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        // Log info level and above (excluding errors) to logs.log
        new transports.File({
            filename: path.join(filePath, "logs.log"),
            level: "info",
            format: format.combine(
                infoFilterFormat(),
                format.timestamp(),
                format.json()
            ),
        }),
        // Log only error level to error.log
        new transports.File({
            filename: path.join(filePath, "error.log"),
            level: "error",
            format: format.combine(
                errorFilterFormat(),
                format.timestamp(),
                format.json()
            ),
        }),

        // Also log to console
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ level, message, timestamp }) => {
                    // Check if the message is an object and stringify it if so
                    const formattedMessage =
                        typeof message === "object"
                            ? JSON.stringify(message)
                            : message;
                    return `${timestamp} [${level}]: ${formattedMessage}`;
                })
            ),
        }),
    ],
});

interface LogEntry {
    level: string;
    message: string;
    timestamp: string;
}

// Function to convert log file content to JSON objects
const convertLogToJSON = (fileName: string): LogEntry[] => {
    try {
        const logFileContent = fs.readFileSync(
            path.join(filePath, fileName),
            "utf-8"
        );
        return logFileContent
            .trim()
            .split("\n")
            .map((line) => JSON.parse(line) as LogEntry);
    } catch (err) {
        console.error("Error reading log file:", err);
        return [];
    }
};

const deleteLogFiles = (fileName: string) => {
    try {
        fs.unlinkSync(path.join(filePath, fileName));
        return true;
    } catch (err) {
        console.error("Error reading log file:", err);
        return false;
    }
};

export { logger, convertLogToJSON, LogEntry, deleteLogFiles, filelogger };
