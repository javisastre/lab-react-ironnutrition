import React, { Component } from 'react';

class AddFood extends Component {
  state = {
    name: '',
    calories: 0,
    image: '',
    quantity: 1,
  };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newFood = this.state;
    this.props.addFood(newFood);
    this.setState({ name: '', calories: 0, image: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <br />
        <p is-size-2>Add a new food:</p>
        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInput}
        />
        <br />
        <label>Number of calories:</label>
        <input
          type="number"
          name="calories"
          value={this.state.calories}
          onChange={this.handleInput}
        />
        <br />
        <label>ImageUrl:</label>
        <input
          type="text"
          name="image"
          value={this.state.image}
          onChange={this.handleInput}
        />
        <br />
        <button type="submit" className="button is-rounded is-success">
          Add new
        </button>
        <br />
      </form>
    );
  }
}
export default AddFood;
