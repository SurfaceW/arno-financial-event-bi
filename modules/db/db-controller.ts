import { inject, injectable } from "inversify";
import { Db } from "mongodb";
import { DBManager } from "./db-manager";

@injectable()
export class DBRequestController {

  /**
   * Mongo db instance to operate
   */
  public db: Db;

  constructor(
    @inject('DB') private _dbManager: DBManager
  ) {
    this.db = this._dbManager.getDBInstance();
  }
}
