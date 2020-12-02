import {
  validateCardNumber,
  validateCardExpiration,
  validateZipCode,
  validatePhoneNumber,
  validateCardExpirationFormat,
  validateEmail,
} from './validators';

const validateForm = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  const { street1, state, city, zipCode } = values.address;

  if (!street1) {
    errors.street1 = 'Address line 1 is required';
  }

  if (!city) {
    errors.city = 'City is required';
  }

  if (!state) {
    errors.state = 'Please select a state';
  }

  if (!zipCode) {
    errors.zipCode = 'Zip code is required';
  } else if (!validateZipCode(zipCode)) {
    errors.zipCode = 'Please enter a valid zip code';
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhoneNumber(values.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!values.quantity) {
    errors.quantity = 'Please select item quantity';
  } else if (values.quantity > 3) {
    errors.quantity = 'The max quantity for this item is 3 per customer';
  }

  const { ccNum, exp } = values.payment;

  if (!ccNum) {
    errors.ccNum = 'Credit card number is required';
  } else if (!validateCardNumber(ccNum)) {
    errors.ccNum = 'Please enter a valid credit card number';
  }

  if (!exp) {
    errors.exp = 'Credit card expiration date is required';
  } else if (!validateCardExpirationFormat(exp)) {
    errors.exp = 'Invalid credit card expiration date format';
  } else if (validateCardExpiration(exp)) {
    errors.exp = 'Credit card is expired';
  }

  if (values.quantity > 3) {
    errors.quantity = 'Max quantity for this item is 3';
  }

  return errors;
};

export default validateForm;
