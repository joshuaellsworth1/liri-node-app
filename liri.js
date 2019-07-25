var dontenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var concert = process.argv[2];

switch (concert) {
    case `concert-this`:
        total();
        break;

    case 'spotify-this-song':
        total();
        break;

    case `movie-this`:
        total();
        break;

    case `do-what-it-says`:
        total();
        break;
}

function total() {
    
}

