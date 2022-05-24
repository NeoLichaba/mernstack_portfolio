require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')
const lyricsFinder = require('lyrics-finder')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    })


// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expiresIn,
        })
    })
    .catch((error) => {
        console.log(error)
        res.sendStatus(400)
    })
})

//Spotify API taking into account parameters of the code
app.post('/login', (req, res) => {
    const code = req.body.code;                                 //code passed up in body of
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,        
    })

//Retrieve an access token and a refresh token in JSON format
spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
}) 

app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder (req.query.artist, req.query.track)) || "No lyrics found"
    res.json({lyrics})
})
app.listen(3001)
