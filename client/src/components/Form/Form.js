import React from 'react';
import useForm from './useForm';
import states from './states';

const Form = () => {
  const submit = () => console.log('Submitted!', values);
  const { values, handleChange, handleSubmit } = useForm(submit);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Contact | Billing Information</h1>

      <label htmlFor="firstName">
        First Name
        <input
          id="firstName"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="lastName">
        Last Name
        <input
          id="lastName"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="street1">
        Address Line 1
        <input
          id="street1"
          name="street1"
          value={values.street1}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="street2">
        Address Line 2
        <input
          id="street2"
          name="street2"
          value={values.street2}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="city">
        City
        <input
          id="city"
          name="city"
          value={values.city}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="state">
        State
        <select
          id="state"
          name="state"
          value={values.state}
          onBlur={handleChange}
          onChange={handleChange}
          required
        >
          <option key="" value="" />
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="zipCode">
        Zip Code
        <input
          id="zipCode"
          name="zipCode"
          value={values.zipCode}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="email">
        Email Address
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="phone">
        Phone Number
        <input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="creditCardNumber">
        Credit Card Number
        <input
          id="creditCardNumber"
          name="ccNum"
          value={values.ccNum}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="creditCardExp">
        mm/yy
        <input
          id="creditCardExp"
          name="exp"
          value={values.exp}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
