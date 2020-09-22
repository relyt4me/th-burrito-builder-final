import React, { Component } from 'react';
import './App.css';
import { getOrders, addOrder, deleteOrder } from '../../apiCalls';
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

  deleteOrderById = (orderId) => {
    deleteOrder(orderId)
      .then((response) => {
        this.removeLocalOrder(orderId);
      })
      .catch((err) => console.error('Error fetching:', err));
  };

  removeLocalOrder = (orderId) => {
    let foundIndex = this.state.orders.findIndex((order) => {
      return order.id === orderId;
    });
    if (foundIndex === undefined) {
      return;
    }
    const copyOfOrders = this.state.orders;
    copyOfOrders.splice(foundIndex, 1);
    this.setState({ orders: copyOfOrders });
  };

  render() {
    return (
      <main className='App'>
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder} />
        </header>

        <Orders orders={this.state.orders} deleteOrderById={this.deleteOrderById} />
      </main>
    );
  }
}

export default App;
