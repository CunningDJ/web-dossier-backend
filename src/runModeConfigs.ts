
export interface IRunModeConfig {
    servePort: number;   // port to serve on
    accessControlAllowOrigin: string;    // what to use for the Access-Control-Allow-Origin
}

const DEFAULT_DB_USER = 'postgres';
const DEFAULT_DEV_ACCESS_CONTROL_ALLOW_ORIGIN = 'http://localhost:3000';    // default origin to test on for dev/testprod

const runModeConfigs: { [runModeKey: string]: IRunModeConfig } = {
    'DEV': {
        servePort: 9191,
        accessControlAllowOrigin: DEFAULT_DEV_ACCESS_CONTROL_ALLOW_ORIGIN
    },
    'TESTPROD': {
        servePort: 9191,
        accessControlAllowOrigin: DEFAULT_DEV_ACCESS_CONTROL_ALLOW_ORIGIN
    },
    'PROD': {
        servePort: 80,
        accessControlAllowOrigin: 'http://jsdom-react-scraper.bglad.io'
    }
};

export const RUN_MODE_KEYS: string[] = Object.keys(runModeConfigs);

export default runModeConfigs;

