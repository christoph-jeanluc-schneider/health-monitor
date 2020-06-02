var fs = require( "fs" )
var path = require( "path" );
var util = require( "../src/util.js" );

const keys_filename = path.join( __dirname, "../keys.json" );

try {
    var keys = require( "../keys.json" );
} catch( error ) {
    var keys = {
        port: 7171
    };
    fs.writeFile( keys_filename, JSON.stringify( keys, null, 4 ), function () {
        console.log( "created key file" );
    } );
}

function help() {
    console.log( "\nUsage: ufw COMMAND" );
    console.log( "\nCommands:" );
    console.log( " list\t\t\t lists all api keys" );
    console.log( " add <id>\t\t generates new api key with id <id>" );
    console.log( " remove <id>\t\t removes api key with id <id>" );
    console.log( " help\t\t\t displays this message" );
    console.log();
    process.exit( 0 );
}

switch( process.argv[ 2 ] ) {
    case "list":
        util.printObjectAsTable( keys, "ID", "KEY" );
        break;

    case "add":
        if( !process.argv[ 3 ] ) {
            console.log( "\nUsage: add <id>\n" );
        } else if( keys[ process.argv[ 3 ] ] ) {
            console.log( "\nA key with this id allready exists!\n" );
        } else {
            let key = util.randomString( 32 );
            keys[ process.argv[ 3 ] ] = key;
            fs.writeFileSync( keys_filename, JSON.stringify( keys, null, 4 ) );
            console.log( `\nKey: ${key}\n` );
        }
        break;

    case "remove":
        if( !process.argv[ 3 ] ) {
            console.log( "\nUsage: remove <id>\n" );
        } else if( !keys[ process.argv[ 3 ] ] ) {
            console.log( "\nNo key was removed!\n" );
        } else {
            delete keys[ process.argv[ 3 ] ];
            fs.writeFileSync( keys_filename, JSON.stringify( keys, null, 4 ) );
            console.log( `\nSuccessfully removed key with id '${process.argv[ 3 ]}'\n` );
        }
        break;

    default:
        help();
}