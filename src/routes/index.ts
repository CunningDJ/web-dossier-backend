
import express from 'express';

import { IGetScrapedUrlDataResponse } from './index.d';
import { IGetScrapedUrlData } from '../scrape.d';

import { scrapeUrlData } from '../scrape';

const router = express.Router();


router.get('/url-scrape', (req, res, next) => {
  const { url } = req.query;

  scrapeUrlData(url)
    .then((sdata: IGetScrapedUrlData) => {
      return res.json({ data: sdata, err: "" });
    })
    .catch((err) => {
      return res.json({ data: null, err: err.message });
    });
});


export default router;
