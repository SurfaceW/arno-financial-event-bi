import { inject, injectable } from 'inversify';
import path from 'path';
import PinoLogger, { Logger, pino } from 'pino';
import pinoPretty from 'pino-pretty';
import { EnvManager } from '../env/env';

export class NodeLogger {
  private _pinoLogger: Logger;

  constructor(@inject('Env') private _envManager: EnvManager) {
    this._pinoLogger = PinoLogger({
      name: 'default',
      level: this._envManager.getNodeEnv() === 'production' ? 'error' : 'info',
      // prettifier: pinoPretty,
      ...pino.destination({
        dest: path.resolve(this._envManager.getEnvParam('LOG_DIR')),
        minLength: 4096, // Buffer before writing
        sync: false // Asynchronous logging, the default
      }),
    }, pinoPretty({
      colorize: true,
    }));
  }

  getLogger() {
    return this._pinoLogger;
  }
}

