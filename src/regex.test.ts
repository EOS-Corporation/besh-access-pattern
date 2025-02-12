import { describe, it } from 'mocha';

import * as regex from './regex';

describe('Regex', () => {
  it('should match valid token' , () => {
    return "foo.bar_123".match(regex.token_regex) !== null;
  });
});