export interface IBaseResponseModel<T> {
  success: boolean;
  status?: number;
  content?: T;
}

export interface IPaginationModel<T> {
  pageSize?: number;
  totalCount?: number;
  data: T;
  nextCursor?: string | null;
  hasMore?: boolean;
}
