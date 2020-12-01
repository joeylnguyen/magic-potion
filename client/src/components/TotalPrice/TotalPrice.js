import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice = ({ values, handleChange, name }) => {
  return (
    <div>
      <div>{`${values.quantity} x ${name}`}</div>
      <div name="total" id="total" value={values.total} onChange={handleChange}>
        {`Total = $${values.total}`}
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
};

export default TotalPrice;
