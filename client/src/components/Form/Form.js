import React from 'react';

const Form = () => {
  return (
    <form>
      <h1>Contact | Billing Information</h1>

      <label htmlFor="firstName">
        First Name
        <input id="firstName" name="firstName" required />
      </label>
      <label htmlFor="lastName">
        Last Name
        <input id="lastName" name="lastName" required />
      </label>
      <label htmlFor="address1">
        Address Line 1
        <input id="address1" name="address1" required />
      </label>
      <label htmlFor="address2">
        Address Line 2
        <input id="address2" name="address2" required />
      </label>
      <label htmlFor="city">
        City
        <input id="city" name="city" required />
      </label>
      <label htmlFor="state">
        State
        <select id="state" name="state" required>
          <option key="" />
          <option key="CA">CA</option>
        </select>
      </label>
      <label htmlFor="zipCode">
        Zip Code
        <input id="zipCode" name="zipCode" required />
      </label>
      <label htmlFor="email">
        Email Address
        <input id="email" name="email" type="email" required />
      </label>
      <label htmlFor="phone">
        Phone Number
        <input id="phone" name="phone" required />
      </label>
      <label htmlFor="creditCardNumber">
        Credit Card Number
        <input id="creditCardNumber" name="creditCardNumber" required />
      </label>
      <label htmlFor="creditCardExp">
        mm/yy
        <input id="creditCardExp" name="creditCardExp" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
