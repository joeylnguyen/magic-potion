const luhnCheck = (val) => {
  let sum = 0;
  for (let i = 0; i < val.length; i += 1) {
    let intVal = Number(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 === 0;
};

const validateCardNumber = (number) => {
  const regex = new RegExp('^[0-9]{15,16}$');
  if (!regex.test(number)) return false;

  return luhnCheck(number);
};

const validateCardExpiration = (date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  let [month, year] = date.split('/');
  year = parseInt(year, 10) + 2000;
  month = parseInt(month, 10);

  return year < currentYear || (year === currentYear && month < currentMonth);
};

const validateCardExpirationFormat = (date) => {
  const regExp = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return regExp.test(date);
};

const validateZipCode = (zipCode) => {
  const regExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return zipCode.match(regExp);
};

const validatePhoneNumber = (phoneNumber) => {
  const regExp = /^[2-9]{1}[0-9]{9}$/;
  return regExp.test(phoneNumber);
};
const validateEmail = (email) => {
  const regExp = /^\S+@\S+\.\S+$/;
  return regExp.test(email);
};

module.exports = {
  validateCardExpiration,
  validateCardExpirationFormat,
  validateZipCode,
  validateCardNumber,
  validatePhoneNumber,
  validateEmail,
};
