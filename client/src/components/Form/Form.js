import React from 'react';
import useForm from './useForm';
import states from './states';
import validateForm from './validateForm';

const Form = () => {
  const submit = () => console.log('Submitted!', values);
  const { values, handleChange, handleSubmit, errors } = useForm(
    submit,
    validateForm
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>Contact | Billing Information</h1>
      <div>
        <div>
          <label htmlFor="firstName">
            First Name
            <input
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
          </label>
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name
            <input
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
          </label>
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="street1">
            Address Line 1
            <input
              id="street1"
              name="street1"
              value={values.street1}
              onChange={handleChange}
            />
          </label>
          {errors.street1 && <p>{errors.street1}</p>}
        </div>
        <label htmlFor="street2">
          Address Line 2
          <input
            id="street2"
            name="street2"
            value={values.street2}
            onChange={handleChange}
          />
        </label>
        <div>
          <label htmlFor="city">
            City
            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
            />
          </label>
          {errors.city && <p>{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="state">
            State
            <select
              data-testid="select-state"
              id="state"
              name="state"
              value={values.state}
              onBlur={handleChange}
              onChange={handleChange}
            >
              <option data-testid="select-state-option" key="" value="" />
              {states.map((state) => (
                <option
                  data-testid="select-state-option"
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              ))}
            </select>
          </label>
          {errors.state && <p>{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="zipCode">
            Zip Code
            <input
              id="zipCode"
              name="zipCode"
              value={values.zipCode}
              onChange={handleChange}
            />
          </label>
          {errors.zipCode && <p>{errors.zipCode}</p>}
        </div>
        <div>
          <label htmlFor="email">
            Email Address
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">
            Phone Number
            <input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
            />
          </label>
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="creditCardNumber">
            Credit Card Number
            <input
              id="creditCardNumber"
              name="ccNum"
              value={values.ccNum}
              onChange={handleChange}
            />
          </label>
          {errors.ccNum && <p>{errors.ccNum}</p>}
        </div>
        <div>
          <label htmlFor="creditCardExp">
            Card Expiration
            <input
              id="creditCardExp"
              name="exp"
              value={values.exp}
              onChange={handleChange}
              placeholder="mm/yy"
            />
          </label>
          {errors.exp && <p>{errors.exp}</p>}
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
