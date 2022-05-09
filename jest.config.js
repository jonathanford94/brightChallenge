const path = require('path');

module.exports = {
  testEnvironment: "jest-environment-jsdom",

  rootDir: "src",

  moduleNameMapper: {
    "^@test-utils/(.*)$": "<rootDir>/test-utils/$1",
  },

  moduleDirectories: ["node_modules", path.join(__dirname, "src/")],
};
