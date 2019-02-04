export const validate = (values, auth) => {
  const errors = {};
  if (!values.email || values.email === '') {
    errors.email = 'Email is required';
  } else if (/.*@.*\..*/.test(values.email) === false) {
    errors.email = 'The email format is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!auth && !values.fullname) {
    errors.fullname = 'Please enter your username';
  }
  return errors;
};
