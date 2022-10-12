import { DBInitalizer } from "@/db/db-initializer";
import { Container } from "inversify";
import { DataCacheManager } from "../cache/cache-manager";
import { DBManager } from "../db/db-manager";
import { EnvManager } from "../env/env";
import { NodeLogger } from "../logger/logger";

export const diContainer = new Container();
export const container = diContainer;

diContainer.bind('Env').to(EnvManager).inSingletonScope();
diContainer.bind('Logger').toConstantValue(new NodeLogger(
  diContainer.get('Env')
).getLogger());
diContainer.bind('RequestCache').to(DataCacheManager).inSingletonScope();
diContainer.bind('DB').to(DBManager).inSingletonScope();

diContainer.bind('DBInitializer').to(DBInitalizer).inSingletonScope();

