/// <reference types="node" />
export declare const VERSION = "1.0.16";
export declare function createPair(prefix: Prefix): KeyPair;
export declare function createAccount(): KeyPair;
export declare function createUser(): KeyPair;
export declare function createOperator(): KeyPair;
export declare function createCluster(): KeyPair;
export declare function createServer(): KeyPair;
export declare function fromPublic(src: Buffer): KeyPair;
export declare function fromSeed(src: Buffer): KeyPair;
export interface KeyPair {
    /**
     * Returns the public key associated with the KeyPair
     * @returns {Promise<string>}
     * @throws NKeysError
     */
    getPublicKey(): Buffer;
    /**
     * Returns the private key associated with the KeyPair
     * @returns Buffer
     * @throws NKeysError
     */
    getPrivateKey(): Buffer;
    /**
     * Returns the PrivateKey's seed.
     * @returns Buffer
     * @throws NKeysError
     */
    getSeed(): Buffer;
    /**
     * Returns the digital signature of signing the input with the
     * the KeyPair's private key.
     * @param {Buffer} input
     * @returns Buffer
     * @throws NKeysError
     */
    sign(input: Buffer): Buffer;
    /**
     * Returns true if the signature can be verified with the KeyPair
     * @param {Buffer} input
     * @param {Buffer} sig
     * @returns {boolean}
     * @throws NKeysError
     */
    verify(input: Buffer, sig: Buffer): boolean;
}
export declare enum Prefix {
    Seed = 144,
    Private = 120,
    Operator = 112,
    Server = 104,
    Cluster = 16,
    Account = 0,
    User = 160
}
/**
 * Internal utility for testing prefixes
 */
export declare class Prefixes {
    static isValidPublicPrefix(prefix: Prefix): boolean;
    static startsWithValidPrefix(s: string): boolean;
    static isValidPrefix(prefix: Prefix): boolean;
    static parsePrefix(v: number): Prefix;
}
export declare enum NKeysErrorCode {
    InvalidPrefixByte = "nkeys: invalid prefix byte",
    InvalidKey = "nkeys: invalid key",
    InvalidPublicKey = "nkeys: invalid public key",
    InvalidSeedLen = "nkeys: invalid seed length",
    InvalidSeed = "nkeys: invalid seed",
    InvalidEncoding = "nkeys: invalid encoded key",
    InvalidSignature = "nkeys: signature verification failed",
    CannotSign = "nkeys: can not sign, no private key available",
    PublicKeyOnly = "nkeys: no seed or private key available",
    InvalidChecksum = "nkeys: invalid checksum",
    SerializationError = "nkeys: serialization error",
    ApiError = "nkeys: api error"
}
export declare class NKeysError extends Error {
    name: string;
    code: string;
    chainedError?: Error;
    /**
     * @param {NKeysErrorCode} code
     * @param {Error} [chainedError]
     * @constructor
     *
     * @api private
     */
    constructor(code: NKeysErrorCode, chainedError?: Error);
}
