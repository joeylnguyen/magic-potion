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
  getByLabelText('mm/yy');

  // Submit button
  getByText('Submit');
});

// TODO: Test for errors

// TODO: Test for submitting
