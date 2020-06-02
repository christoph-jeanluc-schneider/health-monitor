var fs = require( "fs" );

exports.printObjectAsTable = ( obj, h1, h2 ) => {
    console.log();

    let largest_1 = 0;
    let largest_2 = 0;
    let gap = 8;
    for( let id in obj ) {
        if( id.length > largest_1 )
            largest_1 = id.length;
        if( obj[ id ].length > largest_2 )
            largest_2 = obj[ id ].length;
    }

    if( h1 && h2 ) {
        if( h1.length > largest_1 )
            largest_1 = h1.length;
        if( h2.length > largest_2 )
            largest_2 = h2.length;

        console.log( `${h1}${" ".repeat( largest_1 - h1.length + gap )}${h2}` );
        console.log( "-".repeat( largest_1 + largest_2 + gap + 1 ) );
    }

    for( let id in obj )
        console.log( `${id}${" ".repeat( largest_1 - id.length + gap )}${obj[ id ]}` );
    console.log();
};

exports.randomString = ( length ) => {
    let str = "";
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for( let i = 0; i < length; i++ ) {
        str += characters.charAt( Math.floor( Math.random() * characters.length ) );
    }
    return str;
};

exports.parseJsonFile = ( filename ) => {
    try {
        let json = fs.readFileSync( filename );
        return JSON.parse( json );
    } catch( error ) {
        return null;
    }
};