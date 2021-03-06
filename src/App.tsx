import React from "react";
import "./index.css";
import "./App.css";
import { Hero } from "./components/Hero";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <div className="App">
      <Hero />
      <ProductPage />
    </div>
  );
}

export default App;
