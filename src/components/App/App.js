import React, { Component } from 'react';
import './App.css';
import { getOrders, addOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    getOrders()
      .then((orders) => {
        this.setState({ orders: orders.orders });
      })
      .catch((err) => console.error('Error fetching:', err));
  }

  addNewOrder = (name, ingredients) => {
    const order = {
      name: name,
      ingredients: ingredients,
    };
    addOrder(order)
      .then((returnedOrder) => {
        this.setState({ orders: [...this.state.orders, returnedOrder] });
      })
      .catch((err) => console.error('Error fetching:', err));
  };

  render() {
    return (
      <main className='App'>
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}

export default App;
