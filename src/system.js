var fs = require( "fs" );
var path = require( "path" );
var os = require( "os" );
var diskusage = require( "diskusage" );

var util = require( "./util.js" );

const watched_files_file = path.join( __dirname, "../watched-files.json" );

exports.status = () => {
    let status = {};

    // DISKSPACE
    try {
        status.diskusage = diskusage.checkSync( "/" );
    } catch( error ) {
        if( error && error != {} && error.toString().trim() != "" )
            status.diskusage = { error: error };
        else
            status.diskusage = { error: "unknown error" };
    }

    // CPU
    try {
        status.cpu = os.loadavg();
    } catch( error ) {
        if( error && error != {} && error.toString().trim() != "" )
            status.cpu = { error: error };
        else
            status.cpu = { error: "unknown error" };
    }

    // MEMORY
    try {
        status.memory = {
            free: os.freemem(),
            total: os.totalmem()
        };
    } catch( error ) {
        if( error && error != {} && error.toString().trim() != "" )
            status.memory = { error: error };
        else
            status.memory = { error: "unknown error" };
    }

    // WATCHED FILES
    let watched_files = util.parseJsonFile( watched_files_file );
    status.watched_files = {};
    for( let alias in watched_files ) {
        try {
            status.watched_files[ alias ] = fs.statSync( watched_files[ alias ] ).size;
        } catch( error ) {
            if( error && error != {} && error.toString().trim() != "" )
                status.watched_files[ alias ] = { error: error };
            else
                status.watched_files[ alias ] = { error: "file not found" };
        }
    }

    return status;
};