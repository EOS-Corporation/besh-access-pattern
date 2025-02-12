
export class TokenTester {
  wildcards: Set<string>;
  keys: Set<string>;

  constructor()
  constructor(tokens: Iterable<string>)
  constructor(tokens?: Iterable<string>) {
    this.wildcards = new Set();
    this.keys = new Set();
    if (tokens) {
      this.setTokens(tokens);
    }
  }

  setTokens(tokens: Iterable<string>) {
    this.wildcards.clear();
    this.keys.clear();
    for (const token of tokens) {
      if (token.endsWith("*")) {
        this.wildcards.add(token.slice(0, -1));
      } else {
        this.keys.add(token);
      }
    }
  }

  test(key: string) {
    return this.isInKeys(key) || this.isInWildcards(key);
  }

  isInKeys(key: string) {
    return this.keys.has(key);
  }

  isInWildcards(key: string) {
    for (const wildcard of this.wildcards) {
      if (key.startsWith(wildcard)) {
        this.keys.add(key); // Cache key
        return true;
      }
    }
    return false;
  }
}