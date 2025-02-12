"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pattern_regex = exports.token_regex = exports.valid_characters_regex = void 0;
/**
 * The string must contain only
 * letters (`a-Z`),
 * numbers (`0-9`),
 * underscores (`_`),
 * dots (`.`),
 * semicolons (`;`),
 * stars (`*`),
 * dashes (`-`),
 */
exports.valid_characters_regex = /^[a-zA-Z0-1_.;*-]+$/;
/**
 * String must be like one from the list below
 * - `*` any key
 * - `foo` specific key
 * - `foo*` wildcard
 * - `-foo` exclude key
 * - `-foo*` exclude wildcard
 */
exports.token_regex = /^\*$|^-?[a-zA-Z0-9_.]+\*?$/;
/**
 * Checks the string is valid pattern
 */
exports.pattern_regex = /^(?:\*|-?[a-zA-Z0-9_.]+\*?)(?:;-?[a-zA-Z0-9_.]+\*?)*$/;
