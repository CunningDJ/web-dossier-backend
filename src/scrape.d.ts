
export interface IGetScrapedUrlData {
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