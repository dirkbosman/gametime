This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Still to do:
- Fix routing for github-pages deployment.
- Set-up new contentful content-model (name: ListOfGames, tag `games`) with the following fields:
```
- Name 	   	(Short text)
- slug     	(Short text)
- Category 	(Short text)
- Players  	(Short text)
- Description 	(Rich text)
```

## Deployment: 
- Github Pages: Add `.env.production`-file in root directory + package.json's scripts (and build + deploy to `gh-pages`-branch). Don't forget to add `.env` and `.env.production` to your `.gitignore`-file before deploying or pushing to master.
- Heroku: You can create your own environment variables in the interface.
