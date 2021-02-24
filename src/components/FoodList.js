import React, { Component } from 'react';
import FoodBox from './FoodBox';
import AddFood from './AddFood';

class SearchBar extends Component {
  state = {
    allFoods: this.props.db,
    filteredFoods: this.props.db,
    search: '',
    showForm: false,
    todayList: [],
    totalCalories: 0,
  };

  handleSearchInput = (event) => {
    const { value } = event.target;

    const newFilter = this.state.allFoods.filter((food) => {
      if (food.name.toLowerCase().includes(value)) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({
      search: value,
      filteredFoods: newFilter,
    });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  addNewFood = (newFood) => {
    const newAllFoods = [newFood, ...this.state.allFoods];
    this.setState({
      allFoods: newAllFoods,
      filteredFoods: newAllFoods,
    });
  };

  addToday = (quantity, name, calories) => {
    const newItem = {
      name,
      calories,
      quantity,
    };

    const newList = [...this.state.todayList];

    const itemToUpdate = newList.find(({ name }) => name === newItem.name);

    if (itemToUpdate === undefined) {
      newList.unshift(newItem);
    } else {
      itemToUpdate.quantity += Number(newItem.quantity);
    }

    const newCal = quantity * calories + this.state.totalCalories;

    this.setState({
      todayList: newList,
      totalCalories: newCal,
    });
  };

  deleteItem = (keyName, keyCalories, keyQuantity) => {
    const newCal = this.state.totalCalories - keyCalories * keyQuantity;
    const newList = this.state.todayList.filter(
      (food) => keyName !== food.name
    );

    this.setState({ todayList: newList, totalCalories: newCal });
  };

  render() {
    return (
      <main>
        <button onClick={this.toggleForm} className="button is-rounded is-dark">
          {this.state.showForm ? 'Hide Add Food Form' : 'Show Add Food Form'}
        </button>

        {this.state.showForm && <AddFood addFood={this.addNewFood} />}
        <br />
        <form>
          <input
            className="input is-small is-rounded"
            value={this.state.search}
            onChange={this.handleSearchInput}
          ></input>
        </form>
        <div className="columns">
          <div className="column">
            {this.state.filteredFoods.map((food) => {
              return (
                <FoodBox
                  name={food.name}
                  calories={food.calories}
                  image={food.image}
                  key={food.name + food.calories}
                  addList={this.addToday}
                />
              );
            })}
          </div>
          <div className="column">
            <p className="is-size-1 has-text-left">Today's foods</p>
            <br />
            <ul>
              {this.state.todayList.map((food, i) => {
                return (
                  <li className="has-text-left" key={i + food.calories}>
                    {food.quantity} {food.name} ={' '}
                    <strong>{food.quantity * food.calories} calories</strong>
                    {'   '}
                    <button
                      className="button is-rounded is-danger is-small"
                      onClick={() => {
                        this.deleteItem(
                          food.name,
                          food.calories,
                          food.quantity
                        );
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
              <br />
              <p className="has-text-left">
                Total: {this.state.totalCalories} cal
              </p>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default SearchBar;
