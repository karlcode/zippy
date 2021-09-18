import React from 'react';
import './index.css'
import './App.css';
import {Hero} from "./components/Hero";
import {CardGrid} from "./components/CardGrid";

function App() {
  return (
    <div className="App">
      <Hero/>
      <div className={`App_products`}>
        <CardGrid/>
      </div>
    </div>
  );
}

export default App;
