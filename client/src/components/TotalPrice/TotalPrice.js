import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice = ({ values, handleChange, name, price }) => {
  return (
    <div className="lg:text-right space-y-4">
      <div className="border border-t-0 border-indigo-900 border-opacity-25" />
      <div className="lg:font-thin lg:text-4xl">{`${values.quantity} x ${name}`}</div>
      <div
        className="text-3xl font-thin"
        name="total"
        id="total"
        value={values.total}
        onChange={handleChange}
      >
        {`= $${values.quantity * price}`}
      </div>
    </div>
  );
};

TotalPrice.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default TotalPrice;
