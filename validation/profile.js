const Validator = require('validator');
const { isEmpty, stringIfEmpty } = require('../helpers');

module.exports = function validateProfileInput(data) {
  const errors = {};

  data.handle = stringIfEmpty(data.handle);
  data.status = stringIfEmpty(data.status);
  data.skills = stringIfEmpty(data.skills);

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid url';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid url';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid url';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid url';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid url';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid url';
    }
  }

  console.log(data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
