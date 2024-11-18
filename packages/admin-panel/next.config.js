// next.config.js
const withTM = require('next-transpile-modules')(['shared-lib']);
module.exports = withTM({
  // ...your existing configuration
});
