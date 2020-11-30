import { useState, useEffect, useMemo } from 'react';

const useForm = (callback, validate) => {
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
    quantity: 1,
    total: '',
    payment: {
      ccNum: '',
      exp: '',
    },
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useMemo(() => {
    const quantity = parseInt(values.quantity, 10);
    const total = `${quantity * 49.99}`;
    setValues({
      ...values,
      quantity,
      total,
    });
  }, [values.quantity]);

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
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
