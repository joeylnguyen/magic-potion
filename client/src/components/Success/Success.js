import React from 'react';
import PropTypes from 'prop-types';

const Success = ({ successMsg, orderId, setIsSubmitted, setSuccessMsg }) => {
  const handleClick = () => {
    setSuccessMsg('');
    setIsSubmitted(false);
  };

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-6xl font-bold">{successMsg}</h1>
        <p className="text-3xl font-light">{`Order #${orderId}`}</p>
        <button className="rounded-md mt-5" type="button" onClick={handleClick}>
          <span className="text-center text-md flex flex-col justify-center w-40 h-16 text-center text-white leading-none bg-indigo-900 border-indigo-900 border rounded transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl lg:mt-0">
            Continue Shopping
          </span>
        </button>
      </div>
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
