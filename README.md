## GameTime (React App)

- A thin react client for [contentful](https://www.contentful.com/) with a "game"-theme.

### Getting Started

```
git clone https://github.com/dirkbosman/gametime.git
cd gametime
npm i
```

### Set-up Credentials

`.env`-file & `.env.production`-file both in your root directory with contentful details (view appendix).

### Set-up Contentful (Data) Model

Set-up new contentful content-model (name: `ListOfGames`, content delivery id: `games`) with the following fields:

```
- Name -> name (Short text)
- slug -> slug (Short text)
- Category -> category (Short text)
- Players -> players (Short text)
- Description -> description (Rich text)
```

### Run Server / Deploy

```
npm start       # navigate to -> http://localhost:3000/gametime#/
or
npm run deploy  # navigate to -> https://dirkbosman.github.io/gametime/#/
```

### Appendix

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- I enabled `HashRouter` (and not `BrowserRouter`) when deploying to Github-pages.
- To deploy to Github-pages, add `.env.production`-file in root directory + `package.json`'s scripts (and build, as well as deploy to `gh-pages`-branch.
- Consider also to deploy to `Heroku` where you can create your own environment variables in the interface.
- Don't forget to add `.env` and `.env.production` to your `.gitignore`-file before deploying or pushing to master. The format should be:

```
# .env-file or .env.production-file
REACT_APP_SPACE_ID = '<string>'
REACT_APP_CDAPI_ACCESS_TOKEN = '<string>'
```
