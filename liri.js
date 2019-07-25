require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require('axios');
var fs = require("fs");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
console.log(command);
console.log(searchTerm);
switch (command) {
    case `concert-this`:
        displayConcert();
        break;

    case `movie-this`:
        displayMovie();
        break;

    case 'spotify-this-song':
        displaySong();
        break;

    case `do-what-it-says`:
        displayCommand();
        break;

        default:
            console.log("Please Enter a valid search");
}

function displayConcert() {
    console.log(value);
    // dotenv.readFile("random.txt", function (err, data) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     data = data.split(", ");

    //     for (var i = 0; i < process.argv.length; i++) {

    //     }
    // })
}

