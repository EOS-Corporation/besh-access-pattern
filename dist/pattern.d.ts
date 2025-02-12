export interface AccessPatternOptions {
    validate?: boolean;
}
export declare class AccessPattern {
    include: Set<string>;
    exclude: Set<string>;
    private includeTester;
    private excludeTester;
    constructor(pattern: string);
    constructor(pattern: string, options?: AccessPatternOptions);
    test(key: string): boolean;
    has(token: string): boolean;
    tidy(): this;
    toWhere(key: string): unknown;
    toString(): string;
    toArray(): string[];
    static validatePattern(pattern: string): boolean;
    static validateToken(token: string): boolean;
}
