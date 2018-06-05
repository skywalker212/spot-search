# spot-search

A search engine for music geeks who want to know detailed info of a Track/Album/Artist from Spotify, made using Spotify API, nodejs, handlebars.

The server will do the job of obtaining the authorizaiton token using client keys of the spotify app after user logs in using his/her spotify credentials, I have also added functionality of automatically renewing the authorization token after every 59 minutes since the token expires after an hour but I haven't tested it out yet.

## How to use

1. clone this repository
2. cd into the direcotry
3. run `npm install` (i'll assume that you have installed node hence npm)
4. run `npm start` to run this app locally
5. go to `localhost:3000` using your preferred web browser (don't use internet explorer/edge :P)
6. login into spotify using your spotify credentials, in the authentication window.
7. open Track/Artist/Album page on Spotify App/Web Player
8. in share options, copy URI of the Track/Artist/Album
9. paste it in the search-box of spot-search
10. click search
11. enjoy the results!

## Category wise Info

Spotify cover photo for every catagory is also available.

### Artist

- Artist Name
- Popularity
- Followers
- Genres
- Spotify URL

### Track

- Song Name
- Popularity
- Spotify URL
- Duration (in miliseconds, straight outta API without any conversion :P)
- Artist(s)
- Audio Features
    danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo

### Album

- Album Name
- Popularity
- Spotify URL
- Relese Date
- Artist(s)
- Track List (with spotify player link to each track)

-------------------------------------------------------------------------------------

If you find any bugs, add a new issue. If you have any suggestions or just want to talk, drop me a mail at akashgajjar8@gmail.com