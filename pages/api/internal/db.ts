// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { container, diContainer } from '@/di';
import { DBInitalizer } from '@/db/db-initializer';
import { EnvManager } from '@/env/env';

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
  if (!initParams) res.status(200).json({
    success: true,
    status: 200,
    content: 'no operation executed.',
  });
  if (initParams === 'create-request-cached-collection') {
    await dbInitializer.createCacheDataset();
  }
  if (initParams === 'create-request-cached-collection-insertion-test') {
    await dbInitializer._testInsertRequestCache();
  }
  res.status(200).json({ success: true, status: 200, content: 'done' });
}
