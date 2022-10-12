import { DBRequestController } from "@/db/db-controller";
import { DBManager } from "@/db/db-manager";
import { inject, injectable } from "inversify";
import { Collection, Db } from "mongodb";
import { IRequestCacheDocumentModel } from "./model";

@injectable()
export class RequestCacheController extends DBRequestController {

  private _reqCollection: Collection<IRequestCacheDocumentModel>; 

  constructor(dbManager: any) {
    super(dbManager);
    this._reqCollection = this.db.collection('requestCache');
  }  

  async getRequestCacheByQueryParams(q: string) {
    return await this._reqCollection.findOne({ queryParams: q });
  }
}
