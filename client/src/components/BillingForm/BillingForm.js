import React from 'react';
import PropTypes from 'prop-types';
import states from './utils/states';

const BillingForm = ({ values, handleChange, errors }) => {
  return (
    <form className="mt-5 space-y-2 text-sm lg:w-1/2 lg:text-lg border rounded-lg shadow-sm p-6 lg:w-1/2">
      <h1 className="text-2xl lg:text-4xl font-bold">
        Contact | Billing Information
      </h1>
      <div>
        <div className="flex space-x-5">
          <div>
            <label htmlFor="firstName">
              First Name
              <input
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className="w-full bordertext-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
              />
            </label>
            {errors.firstName && (
              <p
                className="text-sm p-1 text-red-500"
                data-testid="firstName-error"
              >
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name
              <input
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className="w-full bordertext-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
              />
            </label>
            {errors.lastName && (
              <p
                className="text-sm p-1 text-red-500"
                data-testid="lastName-error"
              >
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block m-0 width-max" htmlFor="street1">
            Address Line 1
            <input
              id="street1"
              name="street1"
              value={values.address.street1}
              onChange={handleChange}
              className="w-full border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
            />
          </label>
          {errors.street1 && (
            <p className="text-sm p-1 text-red-500" data-testid="street1-error">
              {errors.street1}
            </p>
          )}
        </div>
        <label htmlFor="street2">
          Address Line 2
          <input
            id="street2"
            name="street2"
            value={values.address.street2}
            onChange={handleChange}
            className="w-full border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
          />
        </label>
        <div className="flex flex-row space-x-2">
          <div>
            <label htmlFor="city">
              City
              <input
                id="city"
                name="city"
                value={values.address.city}
                onChange={handleChange}
                className="w-full border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
              />
            </label>
            {errors.city && (
              <p className="text-sm p-1 text-red-500" data-testid="city-error">
                {errors.city}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="state">
              State
              <select
                data-testid="select-state"
                id="state"
                name="state"
                value={values.address.state}
                onBlur={handleChange}
                onChange={handleChange}
                className="border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
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
            {errors.state && (
              <p className="text-sm p-1 text-red-500" data-testid="state-error">
                {errors.state}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="zipCode">
              Zip Code
              <input
                id="zipCode"
                name="zipCode"
                value={values.address.zipCode}
                onChange={handleChange}
                className="w-full border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
              />
            </label>
            {errors.zipCode && (
              <p
                className="text-sm p-1 text-red-500"
                data-testid="zipCode-error"
              >
                {errors.zipCode}
              </p>
            )}
          </div>
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
              className="w-full lg:w-3/4 border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
            />
          </label>
          {errors.email && (
            <p className="text-sm p-1 text-red-500" data-testid="email-error">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone">
            Phone Number
            <input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full lg:w-1/2 border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
            />
          </label>
          {errors.phone && (
            <p className="text-sm p-1 text-red-500" data-testid="phone-error">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="creditCardNumber">
            Credit Card Number
            <input
              id="creditCardNumber"
              name="ccNum"
              value={values.payment.ccNum}
              onChange={handleChange}
              className="w-full border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
            />
          </label>
          {errors.ccNum && (
            <p className="text-sm p-1 text-red-500" data-testid="ccNum-error">
              {errors.ccNum}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="creditCardExp">
            Card Expiration
            <input
              id="creditCardExp"
              name="exp"
              value={values.payment.exp}
              onChange={handleChange}
              className="w-1/5 border text-black font-extralight rounded-lg border-width-0 border-transparent shadow-sm block"
              placeholder="mm/yy"
            />
          </label>
          {errors.exp && (
            <p className="text-sm p-1 text-red-500" data-testid="exp-error">
              {errors.exp}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

BillingForm.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BillingForm;
