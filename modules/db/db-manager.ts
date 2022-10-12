import { inject, injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import { Logger } from 'pino';
import { EnvManager } from '../env/env';
import { NodeLogger } from '../logger/logger';

@injectable()
export class DBManager {
  private _host: string;
  private _userName: string;
  private _pass: string;
  private _port: number;
  private _mongoClient: MongoClient;
  constructor(
    @inject('Env') private _envManager: EnvManager,
    @inject('Logger') private _logger: Logger,
  ) {
    this._host = this._envManager.getEnvParam('DB_HOST') || '127.0.0.1';
    this._pass = this._envManager.getEnvParam('DB_PASS') || '';
    this._port = Number(this._envManager.getEnvParam('DB_PORT')) || 27017;
    this._userName = this._envManager.getEnvParam('DB_USER') || '';
    this._mongoClient = new MongoClient(this._getMongoDBAddress());
  }

  async connect() {
    try {
      if (this._host && this._pass && this._userName && this._port) {
        // await this._mongoClient.connect();
        this._logger.info(this._getMongoDBAddress())
      }
    } catch(e) {
      this._logger.error(e);
    }
  }

  getDBClient() {
    return this._mongoClient;
  }

  /**
   * generate mongodb uri
   * @doc https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb
   */
  private _getMongoDBAddress() {
    return `mongodb://${this._userName}:${this._pass}@${this._host}:${this._port}/?maxPoolSize=20&w=majority`;
  }
}
