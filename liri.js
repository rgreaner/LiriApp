require("dotenv").config();

var fs = require("fs");
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//----------------------------------------------------Spotify--------------------------------
function spotifyThis() {
  var userInput = process.argv;
  var song = "";
  for (var i = 3; i < userInput.length; i++) {
    if (i > 3 && i < userInput.length) {
      song = song + " " + userInput[i];
    }
    else {
      song += userInput[i];
    }
  }
  if (song == "") {
    song = "The Sign Ace of Base";
    console.log(song)
  }
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    if (!err) {
      console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log("Listen: " + data.tracks.items[0].external_urls.spotify);
    }
  });
}
//----------------------------------------------------Twitter--------------------------------
function tweetThis() {
  var params = { screen_name: 'keepitfrostyCJ' };
  var recentTweets = [];
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (i = 0; i < 20; i++)
        recentTweets.push(tweets[i].created_at + " " + tweets[i].text);
      //console.log();
      //console.log(response);
    }
    console.log(recentTweets);
  });
}

//----------------------------------------------------OMDB--------------------------------
function omdbIt() {
  var request = require("request");
  var nodeArgs = process.argv;
  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  if (movieName == "") {
    var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";

  }
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("Rating: " + JSON.parse(body).Rated);
      console.log("IMDB Score: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}
if (process.argv[2] == 'spotify-this-song') {
  spotifyThis();
}
if (process.argv[2] == 'my-tweets') {
  tweetThis();
}
if (process.argv[2] == 'movie-this') {
  omdbIt();
}
//---------------------------------------------------------Do what it says piece-------------------------

if (process.argv[2] == 'do-what-it-says') { 
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var array = data.split(',');
    console.log(array);
    if (array[0] == 'spotify-this-song') {
      spotifyThis(array[2]);
    }
    if (array[0] == 'my-tweets') {
      tweetThis(array[1]);
    }
    if (array[0] == 'movie-this') {
      omdbIt(array[1]);
    }
  })
}