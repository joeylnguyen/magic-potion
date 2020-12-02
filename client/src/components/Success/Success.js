import React from 'react';
import PropTypes from 'prop-types';

const Success = ({ successMsg, orderId, setIsSubmitted, setSuccessMsg }) => {
  const handleClick = () => {
    setSuccessMsg('');
    setIsSubmitted(false);
  };

  return (
    <div>
      <h1>{successMsg}</h1>
      <p>{`Order Number: ${orderId}`}</p>
      <button type="button" onClick={handleClick}>
        Continue Shopping
      </button>
    </div>
  );
};

Success.propTypes = {
  successMsg: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
  setIsSubmitted: PropTypes.func.isRequired,
  setSuccessMsg: PropTypes.func.isRequired,
};

export default Success;
