import React from 'react'
import { Switch, Route, Link } from "react-router-dom" //all imported from rrd library - change from one page to another
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"


import AddReview from "./components/add-review"
import MoviesList from "./components/movies-list"
import Movie from "./components/movie"
import Login from "./components/login"

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function App() {
  const [user, setUser] = React.useState(null) //initialising user and state user. Initial state after logged in is 
  async function login(user = null) {// default user to null
    setUser(user)
  }
  async function logout() {
    setUser(null)
  }
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Movie Reviews</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user ? ( //conditional rendering -
                <a onClick={logout}>Logout User</a>
              ) : (
                <Link to={"/login"}>Login</Link> //if you are not logged in, login will show and vice versa
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch> 
        <Route exact path={["/", "/movies"]} component={MoviesList}>
        </Route>
        <Route path="/movies/:id/review" render={(props) => 
          <AddReview {...props} user={user} />
        }>
        </Route>
        <Route path="/movies/:id/" render={(props) =>
          <Movie {...props} user={user} />
        }>
        </Route>
        <Route path="/login" render={(props) =>
          <Login {...props} login={login} />
        }>
        </Route>
      </Switch>
      <br />
    </div>
  );
}
export default App;
