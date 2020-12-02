import { useState, useEffect, useMemo } from 'react';
import validateForm from '../utils/validateForm';

const useForm = (callback) => {
  const initialValues = {
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
  };
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useMemo(() => {
    const total = `${values.quantity * 49.99}`;
    setValues({
      ...values,
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
    setErrors(validateForm(values));
    setIsSubmitting(true);
  };

  const handleServerErrors = (errs) => {
    setErrors(errs);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    handleServerErrors,
    setValues,
    initialValues,
    values,
    errors,
  };
};

export default useForm;
