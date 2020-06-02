var express = require( "express" );
var http = require( "http" );
var helmet = require( "helmet" );

exports.start = () => {
    var config = require( "../config.json" );

    // SETUP EXPRESS
    var app = express();
    app.use( helmet() );
    app.use( express.json( { limit: "1024mb" } ) );
    app.use( express.urlencoded( { extended: true, limit: "1024mb" } ) );

    // API
    var api_v1 = require( "./api-v1.js" );
    app.use( "/v1", api_v1 );

    // START SERVER
    console.log( `starting server on port '${config.port}'...` );

    exports.server = http.createServer( app ).listen( config.port, () => {
        console.log( "server is online" );
    } );
};