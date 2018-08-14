module.exports = {
    "extends": "airbnb",
    "rules": {
        "quotes": [2, "double"],
        "semi": [2, "never"],
        "quotes": [2, "single"],
        "comma-dangle": [2, "never"],
        "object-curly-newline": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "plugins": [
      "jsx-a11y"
    ],
    "globals": {
      "it": true,
      "describe": true,
      "expect": true,
      "beforeEach": true,
      "beforeAll": true,
      "afterEach": true,
      "afterAll": true,
      "jest": true
    }
};
