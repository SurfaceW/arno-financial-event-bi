import { IRequestCacheDocumentModel } from "@/biz/request-cache/model";
import { DBManager } from "@/db/db-manager";
import { inject, injectable } from "inversify";
import { Collection, Db, Logger } from "mongodb";

function isCacheValid(cacheTime: number, ttl: number) {
  return Date.now() - cacheTime <= ttl;
}


 
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
    @inject('Logger') private _logger: Logger,
  ) {
    this._db = this._dbManager.getDBInstance();
    this._requestCacheCollection = this._db.collection('requestCache');
  }

  async get(key: string | Record<string, any>) {
    let queryParams: string = '';
    if (typeof key === "object") {
      queryParams = encodeURIComponent(JSON.stringify(key));
    } else {
      queryParams = key as string;
    }
    // query cache db.
    const result = await this._requestCacheCollection.findOne({ queryParams });
    if ((result?.ttl || 0) > 0 && result?.cacheTime && isCacheValid(result?.cacheTime, result?.ttl)) {
      try {
        return JSON.parse(result?.responseContent);
      } catch(e) {
        return result?.responseContent;
      }
    } else if (result) {
      // invalid cache need to be cleared
      await this._requestCacheCollection.deleteMany({ queryParams });
      return null;
    }
    return null;
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

  async set(key: string | Record<string, any>, responseContent: string | any, ttl: number) {
    let cacheKey = key;
    if (typeof key === 'object') {
      cacheKey = JSON.stringify(key);
    }
    let responseContentStr = responseContent;
    if (typeof responseContent === 'object') {
      responseContentStr = JSON.stringify(responseContent);
    }
    // remove the duplicated data
    if (await this._requestCacheCollection.findOne({ queryParams: cacheKey })) {
      await this._requestCacheCollection.deleteOne({ queryParams: cacheKey });
    }
    return await this._requestCacheCollection.insertOne({
      ttl: 365 * 24 * 60 * 60 * 1000,
      queryParams: encodeURIComponent(cacheKey as string),
      cacheTime: Date.now(),
      responseContent: responseContentStr,
    });
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
