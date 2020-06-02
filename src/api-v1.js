var router = require( "express" ).Router();
module.exports = router;

var guard = require( "./guard.js" );

var system = require( "./system.js" );

router.get( "/health", guard, ( req, res ) => {
    res.json( system.status() );
} );