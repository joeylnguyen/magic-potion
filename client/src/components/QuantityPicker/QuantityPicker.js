import React from 'react';
import PropTypes from 'prop-types';

const QuantityPicker = ({ values, handleChange, errors, max }) => {
  const qtyOptions = [];
  for (let i = 1; i <= max; i += 1) {
    qtyOptions.push(
      <option className="flex-grow-0" key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="w-min text-2xl lg:flex lg:flex-col py-3 lg:text-right lg:justify-end">
      Qty:
      <select
        data-testid="select-quantity"
        id="quantity"
        name="quantity"
        value={values.quantity}
        onBlur={handleChange}
        onChange={handleChange}
        className="w-min flex-grow-0 text-xl lg:text-2xl mt-1 block border rounded-lg shadow-sm lg:shadow-md lg:ml-60 rounded transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-transparent hover:text-white hover:bg-indigo-900 hover:shadow-xl"
      >
        {qtyOptions}
      </select>
      {errors.quantity && <p data-testid="quantity">{errors.quantity}</p>}
    </div>
  );
};

QuantityPicker.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
};

export default QuantityPicker;
