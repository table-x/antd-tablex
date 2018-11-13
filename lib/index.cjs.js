'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../cjs/index.prod.js');
} else {
  module.exports = require('../cjs/index.dev.js');
}
