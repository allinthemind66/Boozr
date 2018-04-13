import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CocktailsContainer from './components/CocktailsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <CocktailsContainer/>
        </div>
      </div>
    );
  }
}

export default App;
