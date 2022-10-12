import { inject, injectable } from 'inversify';
import PinoLogger, { Logger } from 'pino';
import { EnvManager } from '../env/env';

export class NodeLogger {
  private _pinoLogger: Logger;

  constructor(@inject('Env') private _envManager: EnvManager) {
    this._pinoLogger = PinoLogger({
      name: 'default',
      level: this._envManager.getNodeEnv() === 'production' ? 'error' : 'info',
    });
  }

  getLogger() {
    return this._pinoLogger;
  }
}

