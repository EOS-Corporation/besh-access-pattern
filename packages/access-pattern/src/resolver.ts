
export class TokenResolver {
  wildcards: string[];
  keys: string[];

  constructor(tokens: Iterable<string>) {
    this.wildcards = [];
    this.keys = [];

    for (const token of tokens) {
      if (token.endsWith("*")) {
        this.wildcards.push(token.slice(0, -1));
      } else {
        this.keys.push(token);
      }
    }
  }

  removeOverlappingWildcards() {
    this.wildcards = TokenResolver.removeWildcardsSelfOverlap(this.wildcards);
    return this;
  }

  removeOverlappingKeys() {
    this.keys = TokenResolver.removeKeysOverlap(this.keys, this.wildcards);
    return this;
  }

  removeWildcardsOverlappingWith(wildcards: string[]) {
    this.wildcards = TokenResolver.removeWildcardsOverlap(this.wildcards, wildcards);
    return this;
  }

  removeWildcardsNotOverlappingWith(wildcards: string[]) {
    this.wildcards = TokenResolver.removeWildcardsNotOverlap(this.wildcards, wildcards);
    return this;
  }

  removeKeysNotOverlappingWith(wildcards: string[]) {
    this.keys = TokenResolver.removeKeysNotOverlap(this.keys, wildcards);
    return this;
  }

  toString() {
    return this.toArray().join(";")
  }

  toSet() {
    return new Set(this.toArray());
  }

  toArray() {
    return this.wildcards.map((v) => v + "*").concat(this.keys);
  }

  private static removeWildcardsSelfOverlap(wildcards: string[]) {
    const result = new Set(wildcards);
    // Use set to ensure there is no duplicates
    const wildcards_tmp = Array.from(result);
    // Sort array to make sure that "b" wildcard is longer or equal to "a" wildcard
    wildcards_tmp.sort();
    for (let a = 0; a < wildcards_tmp.length; a++) {
      for (let b = a + 1; b < wildcards_tmp.length; b++) {
        if (wildcards_tmp[b].startsWith(wildcards_tmp[a])) {
          // The "b" wildcard is a subset of the "a" wildcard
          result.delete(wildcards_tmp[b]);
        }
      }
    }
    return Array.from(result);
  }

  private static removeWildcardsOverlap(wildcards: string[], references: string[]) {
    const result = new Set(wildcards);
    for (let a = 0; a < wildcards.length; a++) {
      for (let b = 0; b < references.length; b++) {
        if (wildcards[a].startsWith(references[b])) {
          result.delete(wildcards[a]);
        }
      }
    }
    return Array.from(result);
  }

  private static removeWildcardsNotOverlap(wildcards: string[], references: string[]) {
    const result = new Set<string>();
    for (let a = 0; a < wildcards.length; a++) {
      for (let b = 0; b < references.length; b++) {
        if (wildcards[a].startsWith(references[b])) {
          result.add(wildcards[a]);
        }
      }
    }
    return Array.from(result);
  }

  /**
   * Removes keys that are part of wildcards
   */
  private static removeKeysOverlap(keys: string[], wildcards: string[]) {
    const result = new Set(keys);
    for (const key of keys) {
      for (const wildcard of wildcards) {
        if (key.startsWith(wildcard)) {
          // The key is a part of the wildcard
          result.delete(key);
        }
      }
    }
    return Array.from(result);
  }
  
  private static removeKeysNotOverlap(keys: string[], wildcards: string[]) {
    const result = new Set<string>();
    for (const key of keys) {
      for (const wildcard of wildcards) {
        if (key.startsWith(wildcard)) {
          result.add(key);
        }
      }
    }
    return Array.from(result);
  }
}