const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0);

const stringIfEmpty = val => (isEmpty(val) ? '' : val);

module.exports = {
  isEmpty,
  stringIfEmpty
};
