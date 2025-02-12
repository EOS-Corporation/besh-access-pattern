export class TokenResolver {
    wildcards;
    keys;
    constructor(tokens) {
        this.wildcards = [];
        this.keys = [];
        for (const token of tokens) {
            if (token.endsWith("*")) {
                this.wildcards.push(token.slice(0, -1));
            }
            else {
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
    removeWildcardsOverlappingWith(wildcards) {
        this.wildcards = TokenResolver.removeWildcardsOverlap(this.wildcards, wildcards);
        return this;
    }
    removeWildcardsNotOverlappingWith(wildcards) {
        this.wildcards = TokenResolver.removeWildcardsNotOverlap(this.wildcards, wildcards);
        return this;
    }
    removeKeysNotOverlappingWith(wildcards) {
        this.keys = TokenResolver.removeKeysNotOverlap(this.keys, wildcards);
        return this;
    }
    toString() {
        return this.toArray().join(";");
    }
    toSet() {
        return new Set(this.toArray());
    }
    toArray() {
        return this.wildcards.map((v) => v + "*").concat(this.keys);
    }
    static removeWildcardsSelfOverlap(wildcards) {
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
    static removeWildcardsOverlap(wildcards, references) {
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
    static removeWildcardsNotOverlap(wildcards, references) {
        const result = new Set();
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
    static removeKeysOverlap(keys, wildcards) {
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
    static removeKeysNotOverlap(keys, wildcards) {
        const result = new Set();
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
