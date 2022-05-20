const express = require('express');
const spotifyApi = require ('spotifyWebApi');

const app = express();

//Spotify API taking into account parameters of the code
app.post ('/login', (req, res) => {
    const code = req.body.code;                                 //code passed up in body of
    const spotifyApi = new SpotifyWebApi( {
        redirectUri: 'https://localhost:3000',
        clientId: 'c076e9e0eeff4d1693fb7b2a31438474',
        clientSecret: 'b2ed018532af4d019b70d40cba5495df'
    })
})