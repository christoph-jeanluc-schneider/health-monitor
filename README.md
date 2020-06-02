# health-monitor
Monitor the health of a server.

### setup
install dependencies with `npm install`

start app with `npm start` or `node src/main.js` *(or as service on your system)*


### configuration
main configuration file is 'config.json'.

##### api keys
to list, add or remove keys use cli:

`node cli/keys.js help`


##### watched files
used to monitor filesize of certain files on server


to list, add or remove watched files (monitor filezsize) use cli:

`node cli/watched-files.js help`