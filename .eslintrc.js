module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { 
          "extensions": [".js", ".jsx"] 
        }],
        "react/require-default-props": [0],
        "react/no-unused-prop-types": [2, {
            "skipShapeProps": true
        }],
        "react/no-multi-comp": [0],
        "no-bitwise": [0],
        "no-underscore-dangle": [0]
    },
};