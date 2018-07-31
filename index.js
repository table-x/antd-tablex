'use strict'; //eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./es/index.js'); //eslint-disable-line
} else {
  module.exports = require('./es/index.js'); //eslint-disable-line
}
