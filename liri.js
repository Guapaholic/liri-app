require('dotenv').config()
const Twitter = require("twitter")
const request = require("request")
const keys = require('./keys')
const argumentsArray = process.argv
const cliCommand = process.argv[2]
const argument = process.argv[3]
let movieName = process.argv[3]

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });


switch (cliCommand) {
  case "my-tweets": {
    var params = {screen_name: 'crujulien'}
    var client = new Twitter(keys.twitter)
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log('\nHere are your last 20 tweets! \n')
        for (i=0 ; i < tweets.length ; i++) {
          console.log(`${tweets[i].text} \n`)
        }
      } else if (error) {
        console.log(error)
      }
    });
  }
  break
  case "spotify-this-song": {

  }
  break
  case "movie-this": {
    for (i = 4; i < process.argv.length; i++){
      movieName+='+'+argumentsArray[i]
    }
    let movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy"
    // console.log(movieName)
    request(movieQueryUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // console.log(body)
        console.log("The movie's title is " + JSON.parse(body).Title)
        console.log("This movie premiered on " + JSON.parse(body).Released)
        console.log("The movie's IMDB rating is " + JSON.parse(body).imdbRating)
        console.log("The movie's Rotten Tomatoes rating is " + JSON.parse(body).Ratings[1].Value)
        console.log("The movie was produced in " + JSON.parse(body).Country)
        console.log("The movie's language is " + JSON.parse(body).Language)
        console.log("Here's the plot synopsis \n" + JSON.parse(body).Plot)
        console.log("Starring : " + JSON.parse(body).Actors)
      }
    })
  }
  break
  case "do-what-it-says": {

  }
  default: {
    console.log("I don't know that command, try using \"my-tweets\", \"spotify-this-song\", \"movie-this\", or \"do-what-it-says\" ")
  }
}
