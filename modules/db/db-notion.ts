import { EnvManager } from '@/env/env';
import { Client } from '@notionhq/client';
import { inject, injectable } from 'inversify';
/**
 * notion data-source connector
 * @doc https://github.com/makenotion/notion-sdk-js
 */
@injectable()
export class NotionDataSource {
  private _client: Client;
  constructor(
    @inject('Env') private _env: EnvManager,
  ) {
    const notionToken = this._env.getEnvParam('NOTION_TOKEN');
    if (!notionToken) {
      throw new Error('error: notion: please initialize notion token in your local.env file');
    }
    this._client = new Client({
      auth: notionToken,
    });
  }

  getNotionClientInstance() {
    return this._client;
  }
}
