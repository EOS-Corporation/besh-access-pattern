export declare class TokenResolver {
    wildcards: string[];
    keys: string[];
    constructor(tokens: Iterable<string>);
    removeOverlappingWildcards(): this;
    removeOverlappingKeys(): this;
    removeWildcardsOverlappingWith(wildcards: string[]): this;
    removeWildcardsNotOverlappingWith(wildcards: string[]): this;
    removeKeysNotOverlappingWith(wildcards: string[]): this;
    toString(): string;
    toSet(): Set<string>;
    toArray(): string[];
    private static removeWildcardsSelfOverlap;
    private static removeWildcardsOverlap;
    private static removeWildcardsNotOverlap;
    /**
     * Removes keys that are part of wildcards
     */
    private static removeKeysOverlap;
    private static removeKeysNotOverlap;
}
