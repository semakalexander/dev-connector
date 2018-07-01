const Validator = require('validator');
const { isEmpty, stringIfEmpty } = require('../helpers');

module.exports = function validateExperienceInput(data) {
  const errors = {};

  data.title = stringIfEmpty(data.title);
  data.company = stringIfEmpty(data.company);
  data.from = stringIfEmpty(data.from);

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
