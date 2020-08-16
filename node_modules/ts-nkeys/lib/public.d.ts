/// <reference types="node" />
import { KeyPair } from "./nkeys";
/**
 * KeyPair capable of verifying only
 */
export declare class PublicKey implements KeyPair {
    publicKey: Buffer;
    constructor(publicKey: Buffer);
    getPublicKey(): Buffer;
    getPrivateKey(): Buffer;
    getSeed(): Buffer;
    sign(_: Buffer): Buffer;
    verify(input: Buffer, sig: Buffer): boolean;
}
