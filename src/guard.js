var path = require( "path" );
var util = require( "./util.js" );

const keys_filename = path.join( __dirname, "../keys.json" );

module.exports = ( req, res, next ) => {
    try {
        if( !req.headers.authorization ) {
            res.sendStatus( 401 );
            return;
        }

        let auth_type = req.headers.authorization.split( " " )[ 0 ];
        let auth_str = req.headers.authorization.split( " " )[ 1 ];

        if( auth_type != "Basic" ) {
            res.status( 401 );
            res.send( "For authorization use type 'Basic'" );
            return;
        }

        auth_str = Buffer.from( auth_str, "base64" ).toString( "utf-8" );
        let id = auth_str.split( ":" )[ 0 ];
        let key = auth_str.split( ":" )[ 1 ];

        let keys = util.parseJsonFile( keys_filename );

        if( !id || !key || id.trim() == "" || key.trim() == "" || !keys[ id ] || keys[ id ] != key ) {
            res.sendStatus( 401 );
            return;
        }

        next();
    } catch( error ) {
        console.log( error );
        res.sendStatus( 401 );
    }
};