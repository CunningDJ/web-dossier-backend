import { JSDOM } from 'jsdom';

import { IGetScrapedUrlData } from './scrape.d';


const META_ITEMS = ['description'];

export function scrapeUrlData(url: string): Promise<IGetScrapedUrlData> {
  return new Promise((resolve, reject) => {
    let sdata: IGetScrapedUrlData = {} as IGetScrapedUrlData;

    JSDOM.fromURL(url)
            .then((dom) => {
                const { document } = dom.window;
                const { title } = document;
                sdata.title = title;

                // metas
                const metas = [...document.head.getElementsByTagName('meta')];
                metas.forEach((metaEl) => {
                    if (META_ITEMS.indexOf(metaEl.name) !== -1) {
                        sdata[<keyof IGetScrapedUrlData>metaEl.name] = metaEl.content;
                    }
                })

                // anchors
                const anchors = [...document.getElementsByTagName('a')];
                sdata.anchorsCount = anchors.length;
                sdata.anchorHosts = {};
                anchors.forEach((anch) => {
                    const { host, href, text } = anch;
                    if (sdata.anchorHosts[host] === undefined) {
                        sdata.anchorHosts[host] = [];
                    }
                    sdata.anchorHosts[host].push({ href, text });
                })

                // paragraphs
                sdata.paragraphs = [];
                const paragraphs = [...document.getElementsByTagName('p')];
                paragraphs.forEach((p) => {
                    sdata.paragraphs.push(p.textContent);
                });

                return resolve(sdata);
            })
            .catch((err) => reject(err));
  });
}
