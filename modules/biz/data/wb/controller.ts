import axios from '@/axios';
import { DataCacheManager } from '@/cache/cache-manager';
import { inject, injectable } from 'inversify';
import { WBDataResponseStatus, WBGDPDataItemModel } from '@/biz/data/wb/model';
import { Logger } from 'pino';


/**
 * WorldBank Open API read controller
 */
@injectable()
export class WorldBankDataFetchController {
  constructor(
    @inject('RequestCache') private _cacheManager: DataCacheManager,
    @inject('Logger') private _logger: Logger,
  ) {
    
  }

  async getGDPViaNationCode(countryCode: string): Promise<null | [WBDataResponseStatus, WBGDPDataItemModel[]]> {
    // by default we use China as CN code
    const requestURL = `http://api.worldbank.org/v2/country/${countryCode || 'CN'}/indicator/NY.GDP.MKTP.CD?format=json`;
    const requestParams = {
      url: requestURL,
    };
    
    // const response = await axios.get(requestURL);
    // return response?.data;
    const cachedResult = await this._cacheManager.get(requestParams);
    if (cachedResult) {
      return cachedResult;
    }
    const axiosResponse = await axios.get(requestURL, {});
    if (axiosResponse?.data && axiosResponse.status === 200) {
      // set the cache
      try {
        await this._cacheManager.set(requestParams, axiosResponse?.data, 1 * 365 * 24 * 60 * 60 * 1000);
      } catch(e) {
        this._logger.error(e);
        throw new Error('set cache error, while set cache from' + JSON.stringify(requestParams));
      }
      return axiosResponse?.data;
    } else {
      throw new Error('remote response error');
    }
  }

}
