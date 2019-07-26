require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require('axios');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
console.log(command);
console.log(searchTerm);
switch (command) {
    case `concert-this`:
        searchBand(searchTerm);
        break;

    case `movie-this`:
        searchOMBD(searchTerm);
        break;

    case 'spotify-this-song':
        searchSpotify(searchTerm);
        break;

    case `do-what-it-says`:
        doWhatItSays();
        break;

    default:
        console.log("Please Enter a valid search");
}

function searchBand(band) {
    var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios.get(queryURL).then(
        function (response) {
            console.log("Venue:" + response.data.Venue);
            console.log("Location URL:" + response.data.url);
            //I coudn't find the venue location. So I linked it to the url which shows the location when clicked on.
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function searchSpotify(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " +data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].album.external_urls);
        console.log("Album: " + data.tracks.items[0].album.name);        
    });
    
}

function searchOMBD(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Movie Title:" + response.data.Title);
            console.log("Year:" + response.data.Year);
            console.log("IMDB Rating:" + response.data.imdbRating);
            console.log("Metascore:" + response.data.Metascore);
            console.log("Country of origin:" + response.data.Country);
            console.log("Language:" + response.data.Language);
            console.log("Plot:" + response.data.Plot);
            console.log("Actors:" + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log("---------------Data---------------");
                // console.log(error.response.data);
                // console.log("---------------Status---------------");
                // console.log(error.response.status);
                // console.log("---------------Status---------------");
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        //utf8 makes it readable, very important to include

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        switch (dataArr[0]) {

            case `concert-this`:
                searchBand(dataArr[1]);
                break;

            case `movie-this`:
                searchOMBD(dataArr[1]);
                break;

            case 'spotify-this-song':
                searchSpotify(dataArr[1]);
                break;

            case `do-what-it-says`:
                doWhatItSays();
                break;

            default:
                console.log("Please Enter a valid search");
        }
    });

}
