// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { REQUEST_CACHE_COLLECTION_VALIDATION_JSON_SCHEMA } from '@/biz/request-cache/model';
import { DBInitalizer } from '@/db/db-initializer';
import { container, diContainer } from '@/di';
import { EnvManager } from '@/env/env';

import type { NextApiRequest, NextApiResponse } from 'next'
type IResponse = {
  success: boolean;
  status: number;
  content?: any;
}


const env = diContainer.get<EnvManager>('Env');
const dbInitializer = container.get<DBInitalizer>('DBInitializer');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  if (env.getNodeEnv() === 'production') {
    res.status(200).json({
      success: true,
      status: 200,
      content: 'internal operation not allowed in production environment, please use it in dev environment.'
    });
    return;
  }
  const initParams = req.query?.initParam;
  if (!initParams) return res.status(200).json({
    success: true,
    status: 200,
    content: 'no operation executed.',
  });
  if (initParams === 'create-request-cached-collection') {
    await dbInitializer.createCacheDataset();
  }
  if (initParams === 'update-request-cached-collection') {
    await dbInitializer.updateCollectionSchema(REQUEST_CACHE_COLLECTION_VALIDATION_JSON_SCHEMA);
  }
  if (initParams === 'create-request-cached-collection-insertion-test') {
    await dbInitializer._testInsertRequestCache();
  }
  res.status(200).json({ success: true, status: 200, content: 'done' });
}
