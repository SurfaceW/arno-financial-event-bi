// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { container } from '@/di';
import { DBInitalizer } from '@/db/db-initializer';

type IResponse = {
  success: boolean;
  status: number;
  content?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const initParams = req.query?.initParam;
  if (!initParams) res.status(200).json({
    success: true,
    status: 200,
    content: 'no operation executed.',
  });
  if (initParams === 'create-request-cached-collection') {
    const dbInitializer = container.get<DBInitalizer>('DBInitializer');
    await dbInitializer.createCacheDataset();
  }
  res.status(200).json({ success: true, status: 200, content: 'done' });
}
