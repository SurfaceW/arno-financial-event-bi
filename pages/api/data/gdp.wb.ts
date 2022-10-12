/**
 * World Bank GDP data
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IBaseResponseModel } from '@/biz/base/model';
import { WorldBankDataFetchController } from '@/biz/data/wb/controller';
import { container } from '@/di';
import type { NextApiRequest, NextApiResponse } from 'next';

const wbDataController = container.get<WorldBankDataFetchController>('wb.data.controller');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBaseResponseModel<any>>
) {
  res.status(200).json({ success: true, status: 200, content: 
    await wbDataController.getGDPViaNationCode('CN'),
  });
}
