import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    email: '',
    phone: '',
    quantity: 0,
    total: '',
    payment: {
      ccNum: '',
      exp: '',
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (Object.keys(values.payment).includes(name)) {
      setValues({
        ...values,
        payment: {
          ...values.payment,
          [name]: value,
        },
      });
    } else if (Object.keys(values.address).includes(name)) {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: value,
        },
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle errors before submitting
    callback();
  };

  const handleAddressOnBlur = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      address: {
        ...values.address,
        [name]: value,
      },
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      address: {
        ...values.address,
        [name]: value,
      },
    });
  };

  return {
    handleChange,
    handleAddressChange,
    handleSubmit,
    handleAddressOnBlur,
    values,
  };
};

export default useForm;
