import { JSDOM } from 'jsdom';

import { IGetScrapedUrlDataReturn, IGetScrapedReaderDataReturn } from './scrape.d';

const TEXT_ELEMENTS_TAGS_QUERY = 'h1,h2,h3,h4,h5,h6,p,ul,ol,table';

const META_ITEMS = ['description'];

export function scrapeUrlData(url: string): Promise<IGetScrapedUrlDataReturn> {
  return new Promise((resolve, reject) => {
    let sdata: IGetScrapedUrlDataReturn = {} as IGetScrapedUrlDataReturn;

    JSDOM.fromURL(url)
            .then((dom) => {
                const { document } = dom.window;
                const { title } = document;
                sdata.title = title;

                // metas
                const metas = [...document.head.getElementsByTagName('meta')];
                metas.forEach((metaEl) => {
                    if (META_ITEMS.indexOf(metaEl.name) !== -1) {
                        sdata[<keyof IGetScrapedUrlDataReturn>metaEl.name] = metaEl.content;
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

export function scrapeReaderData(url: string): Promise<IGetScrapedReaderDataReturn> {
  return new Promise((resolve, reject) => {
    let sdata: IGetScrapedReaderDataReturn = {} as IGetScrapedReaderDataReturn;
    JSDOM.fromURL(url)
      .then((dom) => {
        // Grabbing all text-specific elements, and appending their raw
        //  outerHTML to a big HTML string
        const rawHTML = getRawTextElementsHTML(dom);
        return resolve({ rawHTML })
      })
      .catch((err) => reject(err));
  })
}


function getRawTextElementsHTML(dom: JSDOM): string {
  /**
   * Gets raw HTML of all the text elements in a DOM
   */

  // TODO: Query & processing that allows grabbing anchor and other elements
  //         without duplicating their children
  const { document } = dom.window;
  const textEls = document.querySelectorAll(TEXT_ELEMENTS_TAGS_QUERY);
  let rawHTML = "";
  [...textEls].forEach((el) => {
    rawHTML += el.outerHTML;
  })
  return rawHTML;
}
