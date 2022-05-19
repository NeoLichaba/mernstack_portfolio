
import React, { Component }  from 'react';
import Navbar from "./components/Navbar";
import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;