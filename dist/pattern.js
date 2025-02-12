"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessPattern = void 0;
const regex_1 = require("./regex");
const resolver_1 = require("./resolver");
const tester_1 = require("./tester");
class AccessPattern {
    constructor(pattern, options) {
        this.include = new Set();
        this.exclude = new Set();
        if (options?.validate && !AccessPattern.validatePattern(pattern)) {
            throw new Error("Invalid pattern");
        }
        const tokens = pattern.split(";");
        for (const token of tokens) {
            if (token.startsWith("-")) {
                this.exclude.add(token.slice(1));
            }
            else {
                this.include.add(token);
            }
        }
        this.includeTester = new tester_1.TokenTester(this.include);
        this.excludeTester = new tester_1.TokenTester(this.exclude);
    }
    test(key) {
        return this.includeTester.test(key) && !this.excludeTester.test(key);
    }
    has(token) {
        if (token.startsWith("-")) {
            return this.exclude.has(token.slice(1));
        }
        else {
            return this.include.has(token);
        }
    }
    tidy() {
        const includeResolver = new resolver_1.TokenResolver(this.include);
        const excludeResolver = new resolver_1.TokenResolver(this.exclude);
        excludeResolver.removeOverlappingWildcards();
        excludeResolver.removeOverlappingKeys();
        includeResolver.removeOverlappingWildcards();
        includeResolver.removeOverlappingKeys();
        includeResolver.removeWildcardsOverlappingWith(excludeResolver.wildcards);
        excludeResolver.removeWildcardsNotOverlappingWith(includeResolver.wildcards);
        excludeResolver.removeKeysNotOverlappingWith(includeResolver.wildcards);
        const includeSet = includeResolver.toSet();
        const excludeSet = excludeResolver.toSet();
        this.include = includeSet.difference(excludeSet);
        this.exclude = excludeSet.difference(includeSet);
        this.includeTester = new tester_1.TokenTester(this.include);
        this.excludeTester = new tester_1.TokenTester(this.exclude);
        return this;
    }
    toWhere(key) {
        const includeArray = Array.from(this.include, (token) => {
            if (token.endsWith("*")) {
                return {
                    [key]: {
                        _like: token.replace("*", "%")
                    }
                };
            }
            else {
                return {
                    [key]: {
                        _eq: token
                    }
                };
            }
        });
        const excludeArray = Array.from(this.exclude, (token) => {
            if (token.endsWith("*")) {
                return {
                    [key]: {
                        _nlike: token.replace("*", "%")
                    }
                };
            }
            else {
                return {
                    [key]: {
                        _neq: token
                    }
                };
            }
        });
        if (includeArray.length > 0 && excludeArray.length > 0) {
            // include and exclude are both not empty
            const _and = [];
            if (includeArray.length > 1) {
                _and.push({ _or: includeArray });
            }
            else {
                _and.push(includeArray[0]);
            }
            if (excludeArray.length > 1) {
                _and.push({ _or: excludeArray });
            }
            else {
                _and.push(excludeArray[0]);
            }
            return { _and };
        }
        else {
            // ether include or exclude is empty
            if (includeArray.length > 0) {
                if (includeArray.length > 1) {
                    return { _or: includeArray };
                }
                else {
                    return includeArray[0];
                }
            }
            else {
                if (excludeArray.length > 1) {
                    return { _or: excludeArray };
                }
                else {
                    return excludeArray[0];
                }
            }
        }
    }
    toString() {
        return this.toArray().join(";");
    }
    toArray() {
        const includeArray = Array.from(this.include);
        const excludeArray = Array.from(this.exclude, (v) => "-" + v);
        return includeArray.concat(excludeArray);
    }
    static validatePattern(pattern) {
        // Quick check for invalid characters
        if (!pattern.match(regex_1.valid_characters_regex)) {
            return false;
        }
        return pattern.match(regex_1.pattern_regex) !== null;
    }
    static validateToken(token) {
        return token.match(regex_1.token_regex) !== null;
    }
}
exports.AccessPattern = AccessPattern;
