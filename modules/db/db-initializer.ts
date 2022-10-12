import { IRequestCacheDocumentModel, REQUEST_CACHE_COLLECTION_VALIDATION_JSON_SCHEMA } from "@/biz/request-cache/model";
import { EnvManager } from "@/env/env";
import { inject } from "inversify";
import { Db } from "mongodb";
import { DBManager } from "./db-manager";

export class DBInitalizer {

  private _db: Db;

  constructor(
    @inject('DB') private _dbManager: DBManager,
    @inject('Env') private _env: EnvManager,
  ) {
    this._db = this._dbManager.getDBClient().db(
      this._env.getEnvParam('DB_NAME') || 'test_db'
    );
  }

  async createCacheDataset() {
    return await this._db.createCollection('requestCache', {
      clusteredIndex: {
        key: {
          queryParams: 1,
        },
        unique: true,
        name: 'request query params serial object'
      },
      validationLevel: 'strict',
      validator: {
        $jsonSchema: REQUEST_CACHE_COLLECTION_VALIDATION_JSON_SCHEMA,
      }
    });
  }

  async _testInsertRequestCache() {
    this._db.collection<IRequestCacheDocumentModel>('requestCache').insertOne({
      queryParams: 'testQuery',
      ttl: 5000,
      responseContent: 'response'
    });
  }

  async _testDeleteRequestCache() {
    this._db.collection<IRequestCacheDocumentModel>('requestCache').deleteOne({
      queryParams: 'testQuery'
    });
  }
}
