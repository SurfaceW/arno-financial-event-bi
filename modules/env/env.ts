import { injectable  } from 'inversify';

@injectable()
export class EnvManager {
  private _processEnvMap: Record<string, string> = {};
  constructor() {
    this._processEnvMap = process.env as Record<string, any>;
  }

  getEnvParam(key: string) {
    return this._processEnvMap[key];
  }

  getNodeEnv(): 'production' | 'development' {
    return this._processEnvMap['NODE'] as 'production' | 'development';
  }
}
