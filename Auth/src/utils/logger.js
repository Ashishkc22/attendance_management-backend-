const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, json } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} Service - ${process.env.SERVICE_NAME} [${level}]: ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
