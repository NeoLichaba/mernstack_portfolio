import React from "react";
import {Container} from "react-bootstrap";



//Authorization setup
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=c076e9e0eeff4d1693fb7b2a31438474&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


//Login button created and diplayed in the centre of the screen
export default function Login () {
    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight: "100vh"}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login with Spotify
            </a>

        </Container>
    )
}