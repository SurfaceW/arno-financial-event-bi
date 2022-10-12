// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IBaseResponseModel, IPaginationModel } from '@/biz/base/model';
import { BIEventController } from '@/biz/bi-events/controller';
import { convertDataToPropertyMap } from '@/biz/common/notion-helper';
import { IBIEventModel } from '@/biz/request-cache/model';
import { diContainer } from '@/di';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  name: string
}

const biEventController = diContainer.get<BIEventController>('events.controller');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBaseResponseModel<IPaginationModel<IBIEventModel>>>
) {
  const events = await biEventController.getEventListAll();
  res.status(200).json({
    success: true,
    status: 200,
    content: {
      hasMore: events.has_more,
      nextCursor: events?.next_cursor,
      data: events?.results.map(i => convertDataToPropertyMap(i as PageObjectResponse)) as any,
      // data: events?.results,
    },
  })
}
