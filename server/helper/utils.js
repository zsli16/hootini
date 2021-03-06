const { randomBytes } = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// ~~ Data ~~
const pluck = (key, array) => array.map(item => item[key]);

const createSearchFilter = (searchKeys, where = {}) => ({
  ...where,
  ...searchKeys.reduce(
    (target, key) =>
      typeof where[key] !== 'undefined'
        ? { ...target, [key]: new RegExp(where[key], 'i') }
        : target,
    {}
  )
});

// ~~ System utils ~~
const asyncRandomBytes = promisify(randomBytes);

// ~~ Cookies ~~
const storeUserInCookie = (user, res) => {
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });
};

const getUserIdFromCookie = req => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // Put the userId onto the req for future requests to access
    return userId;
  }
};

exports.pluck = pluck;
exports.createSearchFilter = createSearchFilter;
exports.asyncRandomBytes = asyncRandomBytes;
exports.storeUserInCookie = storeUserInCookie;
exports.getUserIdFromCookie = getUserIdFromCookie;
