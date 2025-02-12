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
export declare const valid_characters_regex: RegExp;
/**
 * String must be like one from the list below
 * - `*` any key
 * - `foo` specific key
 * - `foo*` wildcard
 * - `-foo` exclude key
 * - `-foo*` exclude wildcard
 */
export declare const token_regex: RegExp;
/**
 * Checks the string is valid pattern
 */
export declare const pattern_regex: RegExp;
