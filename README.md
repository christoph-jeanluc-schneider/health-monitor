# health-monitor
Monitor the health of a server.

### usage
install dependencies with `npm install`

start app with `npm start` or `node src/main.js` *(or as service on your system)*


main configuration file is 'config.json'.


to list, add or remove keys use cli:

`node cli/keys.js help`


to list, add or remove watched files (monitor filezsize) use cli:

`node cli/watched-files.js help`