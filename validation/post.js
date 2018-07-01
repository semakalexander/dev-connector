const Validator = require('validator');
const { isEmpty, stringIfEmpty } = require('../helpers');

module.exports = function validatePostInput(data) {
  const errors = {};

  data.text = stringIfEmpty(data.text);

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Text must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
