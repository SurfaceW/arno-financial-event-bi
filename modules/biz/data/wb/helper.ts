import { WBDataResponseStatus, WBGDPDataItemModel } from "./model";

export function convertToChartData(dataSet: [WBDataResponseStatus, WBGDPDataItemModel[]]) {
  const data = dataSet[1];
  if (!data) return [];
  return data.map(i => ({
    date: i.date,
    value: i.value,
    unit: 'US$'
  }));
}
