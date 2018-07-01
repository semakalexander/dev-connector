const Validator = require('validator');
const { isEmpty, stringIfEmpty } = require('../helpers');

module.exports = function validateExperienceInput(data) {
  const errors = {};

  data.school = stringIfEmpty(data.school);
  data.degree = stringIfEmpty(data.degree);
  data.fieldOfStudy = stringIfEmpty(data.fieldOfStudy);
  data.from = stringIfEmpty(data.from);

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree is required';
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
