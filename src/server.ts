
import express from 'express';
import morgan from 'morgan';

import { runModeConfig } from './args';

import routes from './routes/index';

const app = express();

//logging
app.use(morgan('dev'));

// Access Control Headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", runModeConfig.accessControlAllowOrigin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// JSON parsing
app.use(express.json());

// API endpoints
app.use(routes);

const SERVE_PORT = runModeConfig.servePort;

app.listen(SERVE_PORT, (err: Error) => {
  if (err) {
    return console.error(err);
  }
  return console.log('Success! Serving on port ' + String(SERVE_PORT) + '!');
});
