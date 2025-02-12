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
export const valid_characters_regex = /^[a-zA-Z0-9_.;*-]+$/;

/**
 * String must be like one from the list below
 * - `*` any key
 * - `foo` specific key
 * - `foo*` wildcard
 * - `-foo` exclude key
 * - `-foo*` exclude wildcard
 */
export const token_regex = /^\*$|^-?[a-zA-Z0-9_.]+\*?$/;

/**
 * Checks the string is valid pattern
 */
export const pattern_regex = /^(?:\*|-?[a-zA-Z0-9_.]+\*?)(?:;-?[a-zA-Z0-9_.]+\*?)*$/;