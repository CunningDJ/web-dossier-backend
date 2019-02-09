import { IGetScrapedUrlData } from '../scrape.d';

export interface IDefaultJsonReturn<T> {
  err: string;
  data: T;
}

export interface IGetScrapedUrlDataResponse extends IDefaultJsonReturn<IGetScrapedUrlData> {}
