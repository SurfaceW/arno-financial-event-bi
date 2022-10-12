import { DataCacheManager } from "@/cache/cache-manager";
import { inject, injectable } from "inversify";
import axios from '@/axios';


/**
 * WorldBank Open API read controller
 */
@injectable()
export class WorldBankDataFetchController {
  constructor(
    @inject('RequestCache') private _cacheManager: DataCacheManager,
  ) {
    
  }

  async getGDPViaNationCode(countryCode: string) {
    // by default we use China as CN code
    // const requestURL = `http://api.worldbank.org/v2/country/${countryCode || 'CN'}/indicator/NY.GDP.MKTP.CD?format=json`;
    
    // const response = await axios.get(requestURL);
    // return response?.data;
    return await this._cacheManager.get('testQuery');
  }

}
