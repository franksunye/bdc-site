// src/logger.js
const winston = require('winston');

const logger = winston.createLogger({
 level: 'info',
 format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
      timezone: 'local' // 使用本地时间
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message} ${info.stack || ''}`;
    })
 ),
 defaultMeta: { service: 'bdc-site' },
 transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' })
 ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
       format: winston.format.combine(
        //  winston.format.colorize(),
         winston.format.printf(info => {
           return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message} ${info.stack || ''}`;
         })
       ),
    }));
   }

module.exports = logger;
