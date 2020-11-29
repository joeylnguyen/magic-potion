import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../Form';

it('renders the correct content', () => {
  const { getByText, getByLabelText } = render(<Form />);

  // Header content
  getByText('Contact | Billing Information');

  // Input Fields
  getByLabelText('First Name');
  getByLabelText('Last Name');
  getByLabelText('Address Line 1');
  getByLabelText('Address Line 2');
  getByLabelText('City');
  getByLabelText('State');
  getByLabelText('Zip Code');
  getByLabelText('Email Address');
  getByLabelText('Phone Number');
  getByLabelText('Credit Card Number');
  getByLabelText('Card Expiration');

  // Submit button
  getByText('Submit');
});

// TODO: Test for errors
describe('error handling', () => {
  it('renders First Name error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('First Name');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('First name is required');
  });

  it('renders Last Name error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Last Name');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Last name is required');
  });

  it('renders Address line 1 error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Address Line 1');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Address line 1 is required');
  });

  it('renders City error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('City');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('City is required');
  });
  // TODO: Get this to fail
  it('renders State error message for empty input', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<Form />);

    const select = getByTestId('select-state');
    fireEvent.select(select, { target: { value: 'CA' } });

    fireEvent.click(getByText('Submit'));
    getByText('Please select a state');
    // const options = getAllByTestId('select-state-option');
    // expect(options[0].selected).toBeTruthy();
    // expect(options[1].selected).toBeFalsy();
  });

  it('renders Zip Code error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Zip Code');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Zip code is required');
  });

  it('renders Email Address error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Email Address');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Email address is required');
  });

  it('renders Phone Number error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Phone Number');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Phone number is required');
  });

  it('renders Credit Card Number error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Credit Card Number');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Credit card number is required');
  });

  it('renders Card Expiration error message for empty input', () => {
    const { getByText, getByLabelText } = render(<Form />);

    const input = getByLabelText('Card Expiration');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Submit'));
    getByText('Credit card expiration date is required');
  });
});
// TODO: Test for submitting
