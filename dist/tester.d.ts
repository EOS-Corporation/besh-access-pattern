export declare class TokenTester {
    wildcards: Set<string>;
    keys: Set<string>;
    constructor();
    constructor(tokens: Iterable<string>);
    setTokens(tokens: Iterable<string>): void;
    test(key: string): boolean;
    isInKeys(key: string): boolean;
    isInWildcards(key: string): boolean;
}
