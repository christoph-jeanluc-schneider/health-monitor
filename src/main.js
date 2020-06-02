var fs = require( "fs" )
var path = require( "path" );

var server = require( "./server.js" );

try {
    require( "../config.json" );
} catch( error ) {
    var config = {
        port: 7171
    };
    fs.writeFileSync( path.join( __dirname, "../config.json" ), JSON.stringify( config, null, 4 ) );
    console.log( "created initial configuration file" );
}

try {
    require( "../keys.json" );
} catch( error ) {
    fs.writeFileSync( path.join( __dirname, "../keys.json" ), "{}" );
    console.log( "created key file" );
}

try {
    require( "../watched-files.json" );
} catch( error ) {
    fs.writeFileSync( path.join( __dirname, "../watched-files.json" ), "{}" );
    console.log( "created watched-files file" );
}

server.start();