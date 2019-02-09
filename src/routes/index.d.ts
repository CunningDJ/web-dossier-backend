import { IGetScrapedUrlDataReturn } from '../scrape.d';

export interface IDefaultJsonReturn<T> {
  err: string;
  data: T;
}

export interface IGetScrapedUrlDataResponse extends IDefaultJsonReturn<IGetScrapedUrlDataReturn> {}
