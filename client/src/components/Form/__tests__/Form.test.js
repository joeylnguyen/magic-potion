import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../Form';

/* TEST FUNCTIONS */
const testEmptyInput = (labelText, inputValue, message) => {
  const { getByText, getByLabelText } = render(<Form />);

  const input = getByLabelText(labelText);
  fireEvent.change(input, { target: { value: inputValue } });
  fireEvent.click(getByText('Submit'));
  getByText(message);
};

const testCorrectInput = (labelText, inputValue, testId) => {
  const { getByText, getByLabelText, queryByTestId } = render(<Form />);
  const input = getByLabelText(labelText);

  fireEvent.change(input, { target: { value: inputValue } });
  fireEvent.click(getByText('Submit'));

  expect(queryByTestId(testId)).toBeNull();
};

/* TESTS */
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

describe('Error handling', () => {
  describe('First Name errors', () => {
    const label = 'First Name';

    const emptyMessage = 'First name is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = 'Jeff';
    const testId = 'firstName-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });
  });

  describe('Last Name errors', () => {
    const label = 'Last Name';

    const emptyMessage = 'Last name is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = 'Goldblum';
    const testId = 'lastName-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });
  });

  describe('Address line 1 errors', () => {
    const label = 'Address Line 1';

    const emptyMessage = 'Address line 1 is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = '1 Embarcadero';
    const testId = 'street1-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });
  });

  describe('City errors', () => {
    const label = 'City';

    const emptyMessage = 'City is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = 'San Francisco';
    const testId = 'city-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });
  });

  // TODO: Not working properly. Get this to fail!
  describe('State errors', () => {
    it('renders correct error message for empty input', () => {
      const { getByText, getByTestId, getAllByTestId } = render(<Form />);

      const select = getByTestId('select-state');
      fireEvent.select(select, { target: { value: 'CA' } });

      fireEvent.click(getByText('Submit'));
      getByText('Please select a state');
      // const options = getAllByTestId('select-state-option');
      // expect(options[0].selected).toBeTruthy();
      // expect(options[1].selected).toBeFalsy();
    });
  });

  describe('Zip Code errors', () => {
    const label = 'Zip Code';

    const emptyMessage = 'Zip code is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = '92708';
    const testId = 'zipCode-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });

    it('renders correct error message for invalid input', () => {
      const { getByText, getByLabelText } = render(<Form />);

      const input = getByLabelText('Zip Code');
      fireEvent.change(input, { target: { value: '9021 0' } });
      fireEvent.click(getByText('Submit'));
      getByText('Please enter a valid zip code');
    });
  });

  describe('Email Address errors', () => {
    const label = 'Email Address';

    const emptyMessage = 'Email address is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = 'test@test.com';
    const testId = 'email-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });

    it('renders correct error message for invalid input', () => {
      const { getByText, getByLabelText } = render(<Form />);

      const input = getByLabelText('Email Address');
      fireEvent.change(input, { target: { value: 'test!/test.com ' } });
      fireEvent.click(getByText('Submit'));
      getByText('Please enter a valid email address');
    });
  });

  describe('Phone Number errors', () => {
    const label = 'Phone Number';

    const emptyMessage = 'Phone number is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = '3101001234';
    const testId = 'phone-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });

    it('renders correct error message for invalid input', () => {
      const { getByText, getByLabelText } = render(<Form />);

      const input = getByLabelText('Phone Number');
      fireEvent.change(input, { target: { value: '310012345' } });
      fireEvent.click(getByText('Submit'));
      getByText('Please enter a valid 10-digit phone number');
    });
  });

  describe('Credit Card Number errors', () => {
    const label = 'Credit Card Number';

    const emptyMessage = 'Credit card number is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = '6011000990139424';
    const testId = 'ccNum-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });

    it('renders correct error message for invalid input', () => {
      const { getByText, getByLabelText } = render(<Form />);
      const input = getByLabelText('Credit Card Number');

      fireEvent.change(input, { target: { value: '6011000990139424d' } });
      fireEvent.click(getByText('Submit'));
      getByText('Please enter a valid credit card number');
    });
  });

  describe('Credit Card Expiration Date errors', () => {
    const label = 'Card Expiration';

    const emptyMessage = 'Credit card expiration date is required';
    it('renders correct error message for empty input', () => {
      testEmptyInput(label, '', emptyMessage);
    });

    const correctInput = '01/23';
    const testId = 'exp-error';
    it('does not render error message for correct input', () => {
      testCorrectInput(label, correctInput, testId);
    });

    it('renders correct error message for invalid input', () => {
      const { getByText, getByLabelText } = render(<Form />);
      const input = getByLabelText('Card Expiration');

      fireEvent.change(input, { target: { value: '08/233' } });
      fireEvent.click(getByText('Submit'));
      getByText('Invalid credit card expiration date format');

      fireEvent.change(input, { target: { value: '08/23 ' } });
      fireEvent.click(getByText('Submit'));
      getByText('Invalid credit card expiration date format');

      fireEvent.change(input, { target: { value: '08!23' } });
      fireEvent.click(getByText('Submit'));
      getByText('Invalid credit card expiration date format');
    });

    it('renders correct error message for expired card', () => {
      const { getByText, getByLabelText } = render(<Form />);
      const input = getByLabelText('Card Expiration');

      fireEvent.change(input, { target: { value: '01/19' } });
      fireEvent.click(getByText('Submit'));
      getByText('Credit card is expired');
    });
  });
});
// TODO: Test for submitting
