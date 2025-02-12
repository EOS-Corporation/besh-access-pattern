import { assert } from 'chai';
import { describe, it } from 'mocha';

import * as regex from './regex.js';

describe('Characters Regex', () => {
  it('should match latin letters (a-Z)', () => {
    assert.match("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", regex.valid_characters_regex);
  });
  it('should match digits (0-9)', () => {
    assert.match("0123456789", regex.valid_characters_regex);
  });
  it('should match dot (.)', () => {
    assert.match(".", regex.valid_characters_regex);
  });
  it('should match underscore (_)', () => {
    assert.match("_", regex.valid_characters_regex);
  });
  it('should match dash (-)', () => {
    assert.match("-", regex.valid_characters_regex);
  });
  it('should match star (*)', () => {
    assert.match("*", regex.valid_characters_regex);
  });
  it('should match semicolon (;)', () => {
    assert.match(";", regex.valid_characters_regex);
  });
  it('should not match string with spaces', () => {
    assert.notMatch("string with spaces", regex.valid_characters_regex);
  });
});

describe('Token Regex', () => {
  it('should match *', () => {
    assert.match("*", regex.token_regex);
  });
  it('should match valid key', () => {
    assert.match("foo.bar_123", regex.token_regex);
  });
  it('should match valid wildcard', () => {
    assert.match("foo.bar_123*", regex.token_regex);
  });
  it('should match valid exclude key', () => {
    assert.match("-foo.bar_123", regex.token_regex);
  });
  it('should match valid exclude wildcard', () => {
    assert.match("-foo.bar_123*", regex.token_regex);
  });
});

describe('Pattern Regex', () => {
  it('should match all-wildcard', () => {
    assert.match("*", regex.pattern_regex);
  });
  it('should match all-wildcard with exclusion', () => {
    assert.match("*;-foo;-bar*", regex.pattern_regex);
  });
  it('should match single key', () => {
    assert.match("foo.bar_123", regex.pattern_regex);
  });
  it('should match single wildcard', () => {
    assert.match("foo*", regex.pattern_regex);
  });
  it('should match multiple keys', () => {
    assert.match("foo;foo.bar;baz_123", regex.pattern_regex);
  });
  it('should match multiple wildcards', () => {
    assert.match("foo*;bar*;baz*", regex.pattern_regex);
  });
  it('should match multiple keys and wildcards', () => {
    assert.match("foo;bar*;baz_123;lol*", regex.pattern_regex);
  });
  it('should match multiple keys and wildcards with exclusion', () => {
    assert.match("foo;bar*;-bar.baz;lol*;-lol.kek", regex.pattern_regex);
  });
  it('should not match pattern starting with semicolon', () => {
    assert.notMatch(";foo;bar;baz", regex.pattern_regex);
  });
  it('should not match pattern ending with semicolon', () => {
    assert.notMatch("foo;bar;baz;", regex.pattern_regex);
  });
  it('should not match empty string', () => {
    assert.notMatch("", regex.pattern_regex);
  });
});