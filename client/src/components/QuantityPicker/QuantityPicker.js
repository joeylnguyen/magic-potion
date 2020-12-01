import React from 'react';
import PropTypes from 'prop-types';

const QuantityPicker = ({ values, handleChange, errors, max }) => {
  const qtyOptions = [];
  for (let i = 1; i <= max; i += 1) {
    qtyOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      Quantity
      <select
        data-testid="select-quantity"
        id="quantity"
        name="quantity"
        value={values.quantity}
        onBlur={handleChange}
        onChange={handleChange}
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
