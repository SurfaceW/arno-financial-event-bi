export interface WBDataResponseStatus {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid: string;
  sourcename: string;
  lastupdated: string;
}

export interface WBGDPDataItemModel {
  indicator: WBIndicatorDataModel;
  country: WBIndicatorDataModel;
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  obs_status: string;
  decimal: number;
}
