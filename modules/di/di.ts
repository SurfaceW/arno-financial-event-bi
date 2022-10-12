import { BIEventController } from '@/biz/bi-events/controller';
import { WorldBankDataFetchController } from '@/biz/data/wb/controller';
import { RequestCacheController } from '@/biz/request-cache/controller';
import { DBInitalizer } from '@/db/db-initializer';
import { NotionDataSource } from '@/db/db-notion';
import { Container } from 'inversify';
import { DataCacheManager } from '../cache/cache-manager';
import { DBManager } from '../db/db-manager';
import { EnvManager } from '../env/env';
import { NodeLogger } from '../logger/logger';

export const diContainer = new Container();
export const container = diContainer;

diContainer.bind('Env').to(EnvManager).inSingletonScope();
diContainer.bind('Logger').toConstantValue(new NodeLogger(diContainer.get('Env')).getLogger());
diContainer.bind('RequestCache').to(DataCacheManager).inSingletonScope();
diContainer.bind('DB').to(DBManager).inSingletonScope();

diContainer.bind('DBInitializer').to(DBInitalizer).inSingletonScope();
diContainer.bind('DBNotion').to(NotionDataSource).inSingletonScope();

/**
 * biz binding
 */
diContainer.bind('req.cache.controller').to(RequestCacheController).inSingletonScope();
diContainer.bind('events.controller').to(BIEventController).inSingletonScope();
diContainer.bind('wb.data.controller').to(WorldBankDataFetchController).inSingletonScope();
