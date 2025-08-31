const winston = require('winston');
require('winston-logstash-udp');

const options = {
  level: 'info',
  handleExceptions: true,
  json: false,
  colorize: true,
};

const transports = [
  new winston.transports.Console(options)
];

if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.LogstashUDP({
      port: process.env.LOGSTASH_PORT || 5000,
      host: process.env.LOGSTASH_HOST || '127.0.0.1',
    })
  );
}

const logger = winston.createLogger({
  transports,
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
