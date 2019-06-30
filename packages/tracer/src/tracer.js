import winston from 'winston';
import logger from './helpers/logger';
import Masker from './helpers/masker';
import Formatter from './helpers/formatter';

class Tracer {
  constructor() {
    this.strategy = 'default';
  }
}

Object.defineProperty(Tracer.prototype, 'strategy', {
  get() {
    return this.maskStrategy;
  },
  set(strategy) {
    try {
      if (typeof strategy === 'string') {
        this.maskStrategy = require(`./mask/${strategy}Strategy`).default; // eslint-disable-line
      } else {
        this.maskStrategy = strategy;
      }
      const masker = new Masker(this.maskStrategy);
      this.formatter = new Formatter(masker);
    } catch (err) {
      logger.error('Strategy invalid or not found');
    }
  },
});

Object.keys(winston.config.syslog.levels).forEach((level) => {
  Tracer.prototype[level] = function log(message, obj) {
    const logObj = this.formatter.format(message, obj);
    logger[level](logObj);
  };
});

export default new Tracer();
