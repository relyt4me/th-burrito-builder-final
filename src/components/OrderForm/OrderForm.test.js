import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';

describe('OrderForm Component', () => {
  it('should render the correct display on load', () => {
    render(<OrderForm />);

    const nameInput = screen.getByPlaceholderText('Name');
    const beansButton = screen.getByRole('button', { name: 'beans' });
    const sofritasButton = screen.getByRole('button', { name: 'sofritas' });
    const orderOutput = screen.getByText('Order: Nothing selected');
    const submitButton = screen.getByRole('button', { name: 'Submit Order' });

    expect(nameInput).toBeInTheDocument();
    expect(beansButton).toBeInTheDocument();
    expect(sofritasButton).toBeInTheDocument();
    expect(orderOutput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should update the name as the input is filled out', () => {
    render(<OrderForm />);

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, { target: { value: 'Tyler' } });

    expect(nameInput.value).toBe('Tyler');
  });

  it('should update the order as ingredients are added', () => {
    render(<OrderForm />);

    const beansButton = screen.getByRole('button', { name: 'beans' });
    const sofritasButton = screen.getByRole('button', { name: 'sofritas' });

    fireEvent.click(beansButton);
    fireEvent.click(sofritasButton);

    const orderOutput = screen.getByText('Order: beans, sofritas');

    expect(orderOutput).toBeInTheDocument();
  });

  it('should fire addNewOrder when form is filled out and submitted', () => {
    const mockAddNewOrder = jest.fn();
    render(<OrderForm addNewOrder={mockAddNewOrder} />);

    const beansButton = screen.getByRole('button', { name: 'beans' });
    const sofritasButton = screen.getByRole('button', { name: 'sofritas' });
    const nameInput = screen.getByPlaceholderText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit Order' });

    fireEvent.click(beansButton);
    fireEvent.click(sofritasButton);
    fireEvent.change(nameInput, { target: { value: 'Tyler' } });
    fireEvent.click(submitButton);

    expect(mockAddNewOrder).toBeCalledTimes(1);
    expect(mockAddNewOrder).toBeCalledWith('Tyler', ['beans', 'sofritas']);
  });

  it('should not allow an added order when an order is incomplete', () => {
    const mockAddNewOrder = jest.fn();
    render(<OrderForm addNewOrder={mockAddNewOrder} />);

    const beansButton = screen.getByRole('button', { name: 'beans' });
    const sofritasButton = screen.getByRole('button', { name: 'sofritas' });
    const nameInput = screen.getByPlaceholderText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit Order' });

    fireEvent.change(nameInput, { target: { value: 'Tyler' } });
    fireEvent.click(submitButton);

    const invalidMessage = screen.getByText('An order must contain ingredients and a name');

    expect(invalidMessage).toBeInTheDocument();

    fireEvent.click(beansButton);
    fireEvent.click(sofritasButton);
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(invalidMessage).toBeInTheDocument();
    expect(mockAddNewOrder).toBeCalledTimes(0);
  });
});
