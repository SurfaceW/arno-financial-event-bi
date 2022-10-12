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
        $jsonSchema: {
          bsonType: "object",
          title: "Request Query Cache Validator Schema",
          required: ["queryParams", "responseContent", "ttl"],
          properties: {
            queryParams: {
              bsonType: "string",
              description: "'queryParams' must be a string and is required"
            },
            ttl: {
              bsonType: "int",
              minimum: 1,
              maximum: 10 * 365 * 24 * 60 * 60 * 1000 ,
              description: "'ttl' must be an integer in [ 1, 10year ] and is required"
            },
            responseContent: {
              bsonType: ["string"],
              description: "'responseContent' must be a double if the field exists"
            }
          }
        }
      }
    });
  }

  async _testInsertRequestCache() {
    this._db.collection<{
      queryParams: string;
      ttl: number;
      responseContent: string;
    }>('requestCache').insertOne({
      queryParams: 'testQuery',
      ttl: 5000,
      responseContent: 'response'
    });
  }

  async _testDeleteRequestCache() {
    this._db.collection<{
      queryParams: string;
      ttl: number;
      responseContent: string;
    }>('requestCache').deleteOne({
      queryParams: 'testQuery'
    });
  }
}
