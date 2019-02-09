
import express from 'express';

import { scrapeUrlData, scrapeReaderData } from '../scrape';

import { IGetScrapedUrlDataResponse } from './index.d';
import { IGetScrapedUrlDataReturn, IGetScrapedReaderDataReturn } from '../scrape.d';

const router = express.Router();


router.get('/url-scrape', (req, res, next) => {
  /**
   * URL Scraper
   * Generic URL scraper that scrapes a variety of data from a given URL,
   *  and passes it forward in JSON format
   */
  const { url } = req.query;

  scrapeUrlData(url)
    .then((sdata: IGetScrapedUrlDataReturn) => {
      return res.json({ data: sdata, err: "" });
    })
    .catch((err) => {
      return res.json({ data: null, err: err.message });
    });
});

router.get('/reader', (req, res, next) => {
  /**
   * Reader Scraper
   * Scrapes the HTML of the given URL and grabs just the text elements,
   *  and passes them back in raw HTML string without sanitization
   */
  const { url } = req.query;

  scrapeReaderData(url)
    .then((sdata: IGetScrapedReaderDataReturn) => {
      return res.json({ data: sdata, err: "" });
    })
    .catch((err) => {
      return res.json({ data: null, err: err.message });
    })
})


export default router;
