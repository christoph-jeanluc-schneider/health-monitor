var fs = require( "fs" )
var path = require( "path" );
var util = require( "../src/util.js" );

const watched_files_filename = path.join( __dirname, "../watched-files.json" );

try {
    var watched_files = require( "../watched-files.json" );
} catch( error ) {
    var watched_files = {
        port: 7171
    };
    fs.writeFile( watched_files_filename, JSON.stringify( watched_files, null, 4 ), function () {
        console.log( "created watched-files file" );
    } );
}

function help() {
    console.log( "\nUsage: node cli/watched-files.js COMMAND [arg]" );
    console.log( "\nCommands:" );
    console.log( " list\t\t\t\t lists all watched files" );
    console.log( " add <alias> <filename>\t\t generates new watched file with alias <alias>" );
    console.log( " remove <alias>\t\t\t removes watched file with alias <alias>" );
    console.log( " help\t\t\t\t displays this message" );
    console.log();
    process.exit( 0 );
}

switch( process.argv[ 2 ] ) {
    case "list":
        util.printObjectAsTable( watched_files, "ALIAS", "KEY" );
        break;

    case "add":
        if( !process.argv[ 3 ] || !process.argv[ 4 ] ) {
            console.log( "\nUsage: add <alias> <filename>\n" );
        } else if( watched_files[ process.argv[ 3 ] ] ) {
            console.log( "\nA file with this alias allready exists!\n" );
        } else {
            watched_files[ process.argv[ 3 ] ] = process.argv[ 4 ];
            fs.writeFileSync( watched_files_filename, JSON.stringify( watched_files, null, 4 ) );
            console.log( `\nSuccessfully added file with alias '${process.argv[ 3 ]}'\n` );
        }
        break;

    case "remove":
        if( !process.argv[ 3 ] ) {
            console.log( "\nUsage: remove <alias>\n" );
        } else if( !watched_files[ process.argv[ 3 ] ] ) {
            console.log( "\nNo file was removed!\n" );
        } else {
            delete watched_files[ process.argv[ 3 ] ];
            fs.writeFileSync( watched_files_filename, JSON.stringify( watched_files, null, 4 ) );
            console.log( `\nSuccessfully removed file with alias '${process.argv[ 3 ]}'\n` );
        }
        break;

    default:
        help();
}