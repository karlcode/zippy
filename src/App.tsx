import React from 'react';
import './App.css';
import "normalize.css"
import {Hero} from "./components/Hero";
import {CardGrid} from "./components/CardGrid";

function App() {
  return (
    <div className="App">
      <Hero/>
      <CardGrid/>
    </div>
  );
}

export default App;
