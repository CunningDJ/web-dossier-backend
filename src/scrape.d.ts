
/**
 * URL Scraper
 */
export interface IGetScrapedUrlDataReturn {
  title: string;
  description: string;

  anchorsCount: number;
  anchorHosts: IAnchorHostsStats;

  paragraphs: string[];
}

export interface IAnchorHostsStats {
    [host: string]:
        { href: string, text: string }[];

}


/**
 * Reader Scraper
 */
export interface IGetScrapedReaderDataReturn {
  rawHTML: string;
}
