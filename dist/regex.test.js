"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const regex = require("./regex");
(0, mocha_1.describe)('Regex', () => {
    (0, mocha_1.it)('should match valid token', () => {
        return "foo.bar_123".match(regex.token_regex) !== null;
    });
});
