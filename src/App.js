import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import FoodList from './components/FoodList';

class App extends Component {
  state = {
    allFoods: foods,
  };

  render() {
    return (
      <div className="App">
        <header>
          <p className="is-size-1 m-5">Iron Nutrition</p>
        </header>
        <main>
          <FoodList db={this.state.allFoods} />
        </main>
      </div>
    );
  }
}

export default App;
