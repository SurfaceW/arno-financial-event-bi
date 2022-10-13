/**
 * World Bank GDP data
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IBaseResponseModel } from '@/biz/base/model';
import { WorldBankDataFetchController } from '@/biz/data/wb/controller';
import { WBDataResponseStatus, WBGDPDataItemModel } from '@/biz/data/wb/model';
import { container } from '@/di';
import type { NextApiRequest, NextApiResponse } from 'next';

const wbDataController = container.get<WorldBankDataFetchController>('wb.data.controller');

export interface WBIndicatorDataModel {
  id: string;
  value: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBaseResponseModel<[WBDataResponseStatus, WBGDPDataItemModel[]] | null>>
) {
  res.status(200).json({ success: true, status: 200, content: 
    await wbDataController.getGDPViaNationCode('CN'),
  });
}
