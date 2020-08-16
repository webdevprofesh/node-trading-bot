/// <reference types="node" />
import { KeyPair } from "./nkeys";
export declare class KP implements KeyPair {
    seed: Buffer;
    constructor(seed: Buffer);
    getRawSeed(): Buffer;
    getSeed(): Buffer;
    getPublicKey(): Buffer;
    getPrivateKey(): Buffer;
    sign(input: Buffer): Buffer;
    verify(input: Buffer, sig: Buffer): boolean;
}
