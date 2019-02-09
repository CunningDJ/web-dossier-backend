# JSDOM-React Scraper: Backend

## Intro
This is the backend of the JSDOM-React scraper app.  This is an ExpressJS-based server that uses JSDOM to scrape websites on command and passes back analytics data from what it retrieved.

## Dependencies
* NodeJS & npm

## Getting Started
1. Run `npm install`
2. Run `npm run build` to transpile the Typescript (you **must do this** before the server Javascript code will update)
3. Run `npm run dev|testprod|prod` depending on the server mode you want to activate.
    * `dev` will run the Javascript code with `nodemon`, so it will restart the server every time you run `npm run build`.  This is convenient, but nodemon is not performant for production environments.
    * `prod` and `testprod` are both run with plain `node`, and there are currently no differences between them.
        * If persistent data is added, these two will probably be different in what data (production versus seeded development data) that they access, and otherwise behave the same
