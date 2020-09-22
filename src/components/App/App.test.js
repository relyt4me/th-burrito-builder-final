import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { getOrders, addOrder } from '../../apiCalls';
jest.mock('../../apiCalls.js');

describe('OrderForm Component', () => {
  let mockOrders;
  beforeEach(() => {
    mockOrders = {
      orders: [
        {
          id: 1,
          name: 'Pat',
          ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'],
        },
        {
          id: 2,
          name: 'Sam',
          ingredients: ['steak', 'pico de gallo', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'],
        },
      ],
    };
  });

  it('should render the correct display on load', async () => {
    getOrders.mockResolvedValueOnce(mockOrders);
    render(<App />);

    const patCard = await waitFor(() => screen.getByRole('heading', { name: 'Pat' }));
    const pageTitle = screen.getByRole('heading', { name: 'Burrito Builder' });
    const nameInput = screen.getByPlaceholderText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit Order' });

    expect(patCard).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should allow the addition of a valid order', async () => {
    const mockReturnedOrder = {
      name: 'Tyler',
      ingredients: ['beans', 'sofritas'],
    };
    getOrders.mockResolvedValueOnce(mockOrders);
    addOrder.mockResolvedValueOnce(mockReturnedOrder);
    render(<App />);

    const beansButton = await waitFor(() => screen.getByRole('button', { name: 'beans' }));
    const sofritasButton = screen.getByRole('button', { name: 'sofritas' });
    const nameInput = screen.getByPlaceholderText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit Order' });

    fireEvent.click(beansButton);
    fireEvent.click(sofritasButton);
    fireEvent.change(nameInput, { target: { value: 'Tyler' } });
    fireEvent.click(submitButton);

    const tylerCardTitle = await waitFor(() => screen.getByRole('heading', { name: 'Tyler' }));

    expect(tylerCardTitle).toBeInTheDocument();
  });
});
