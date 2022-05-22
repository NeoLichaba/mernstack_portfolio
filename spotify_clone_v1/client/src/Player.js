import React from 'react'
import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-player'

export default function Player({accessToken, trackUri}) {

    const [play, setPlay] = useState(false)
    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    return  <SpotifyPlayer 
    token ={accessToken}
    showSaveIcon
    callbacks = {state =>{
        if (!state.isPlaying) setPlay(false)
    }}
    play ={play}
    uris={trackUri ? [trackUri] : []}
    />
    
    }