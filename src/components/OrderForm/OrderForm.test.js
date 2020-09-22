import React from 'react';
import { screen, render, fireEvent, waifFor } from '@testing-library/react';
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
});
