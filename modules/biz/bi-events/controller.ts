import { DBRequestController } from "@/db/db-controller";
import { DBManager } from "@/db/db-manager";
import { NotionDataSource } from "@/db/db-notion";
import { EnvManager } from "@/env/env";
import { inject, injectable } from "inversify";
import { Collection, Db } from "mongodb";
import { IBIEventModel } from "../bi-events/model";

@injectable()
export class BIEventController {

  constructor(
    @inject('DBNotion') private _client: NotionDataSource,
    @inject('Env') private _env: EnvManager,
  ) {

  }

  async getEventListAll() {
    return this._client.getNotionClientInstance().databases.query({
      database_id: this._env.getEnvParam('NOTION_EVENT_DB_ID'),
      page_size: 100,
    });
  }
}
