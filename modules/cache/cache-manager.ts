import { IRequestCacheDocumentModel } from "@/biz/request-cache/model";
import { DBManager } from "@/db/db-manager";
import { inject, injectable } from "inversify";
import { Collection, Db } from "mongodb";

 
/**
 * Use the standards of node-cache API
 * https://www.npmjs.com/package/node-cache
 */
@injectable()
export class DataCacheManager {

  private _db: Db;
  private _requestCacheCollection: Collection<IRequestCacheDocumentModel>;

  constructor(
    @inject('DB') private _dbManager: DBManager,
  ) {
    this._db = this._dbManager.getDBInstance();
    this._requestCacheCollection = this._db.collection('requestCache');
  }

  async get(key: string | Record<string, any>) {
    let queryParams: string = '';
    if (typeof key === "object") {
      queryParams = JSON.stringify(key);
    } else {
      queryParams = key as string;
    }
    return await this._requestCacheCollection.findOne({ queryParams });
  }

  mget(keys: string[]) {
    return [];
  }

  take(key: string) {

  }

  has(key: string) {
    return false;
  }

  del(key: string) {
    return;
  }

  ttl(key: string, timeMs: number) {
    return;
  }

  getTtl(key: string): number {
    return 0;
  }

  keys(): string[] {
    return [];
  }

  set() {

  }

  getStatus() {
    return {};
  }

  flushAll() {
    return {};
  }

  flushStatus() {
    return {};
  }

  close() {
    return;
  }

  // TODO: on('eventName', callback) will implement later while need to be used
}
