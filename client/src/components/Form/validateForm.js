const luhnCheck = (val) => {
  let sum = 0;
  for (let i = 0; i < val.length; i += 1) {
    let intVal = Number(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 === 0;
};

const validateCardNumber = (number) => {
  const regex = new RegExp('^[0-9]{15,16}$');
  if (!regex.test(number)) return false;

  return luhnCheck(number);
};

const validateCardExpiration = (date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  let [month, year] = date.split('/');
  year = parseInt(year, 10) + 2000;
  month = parseInt(month, 10);

  return year < currentYear || (year === currentYear && month < currentMonth);
};

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
  } else if (!zipCode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {
    errors.zipCode = 'Please enter a valid zip code';
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!values.phone.match(/\d/g).length === 10) {
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
  } else if (!exp.match(/(0[1-9]|1[0-2])[/][0-9]{2}/ || exp.length > 5)) {
    errors.exp = 'Invalid credit card expiration date format';
  } else if (validateCardExpiration(exp)) {
    errors.exp = 'Credit card is expired';
  }

  return errors;
};

export default validateForm;
