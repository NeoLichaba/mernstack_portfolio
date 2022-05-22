import React from 'react';
import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import {Container, Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResults'
import Player from './Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: 'c076e9e0eeff4d1693fb7b2a31438474'

})


export default function Dashboard({code}) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState ()
  const [lyrics, setLyrics] = useState ("")

function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")

}
  
  useEffect(() =>{
      if(!playingTrack) return

      axios.get('http://localhost:3001/lyrics', {
          params: {
              track: playingTrack.title,
              artist: playingTrack.artist
          }
      }).then(response => {
          setLyrics(response.data.lyrics)
      })
  }, [playingTrack]


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
  
    spotifyApi.searchTracks(search).then(res => {
    if (cancel) return
    setSearchResults(res.body.track.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                if(image.height<smallest.height) return image
                return smallest
            }, track.album.images[0]
        )
        return {
            artist: track.artist[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
        }
    })
    )
  })
      return () => cancel = true
  }, [search, accessToken])

  return <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
      <Form.Control type="search" placeholder ="Search Songs/Artists"
      value = {search} onChange={e => setSearch(e.target.value)} 
      />
      <div className="flex-grow-1 my-2" style={{ovrflowY: "auto"}}>
          {searchResults.map(track => (
            <TrackSearchResult 
            track = {track} 
            key={track.uri} 
            chooseTrack = {chooseTrack}/>
            ))}
            {searchResults.length === 0 && (
                <div className="text-center" style={{whiteSpace: "pre"}}>
                    {lyrics}
                    </div>
            )}
      <div>
          <Player accessToken={accessToken} trackUri={playingTrack ?.uri}/>
          </div>
      </Container>
//    )
 }
