import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      invalidOrder: false,
    };
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    if (!this.state.ingredients.includes(e.target.name)) {
      this.setState({ ingredients: [...this.state.ingredients, e.target.name] });
    }
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, ingredients } = this.state;
    if (name && ingredients.length) {
      this.setState({ invalidOrder: false });
      this.props.addNewOrder(name, ingredients);
      await this.clearInputs();
    } else {
      this.setState({ invalidOrder: true });
    }
  };

  clearInputs = () => {
    this.setState({ name: '', ingredients: [] });
  };

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button key={ingredient} name={ingredient} onClick={(e) => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input type='text' placeholder='Name' name='name' value={this.state.name} onChange={(e) => this.handleNameChange(e)} />

        {ingredientButtons}
        {this.state.invalidOrder && <p>An order must contain ingredients and a name</p>}
        <p>Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

export default OrderForm;
