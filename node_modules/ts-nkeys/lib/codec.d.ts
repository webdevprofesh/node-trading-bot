/// <reference types="node" />
import { Prefix } from "./nkeys";
import * as util from "./util";
export interface SeedDecode {
    prefix: Prefix;
    buf: Buffer;
}
export declare class Codec {
    static toArrayBuffer: util.ToArrayBuffer;
    static encode(prefix: Prefix, src: Buffer): Buffer;
    static encodeSeed(role: Prefix, src: Buffer): Buffer;
    static decode(expected: Prefix, src: Buffer): Buffer;
    static decodeSeed(src: Buffer): SeedDecode;
    static _encode(seed: boolean, role: Prefix, payload: Buffer): Buffer;
    static _decode(src: Buffer): Buffer;
    static _encodePrefix(kind: Prefix, role: Prefix): Buffer;
    static _decodePrefix(raw: Buffer): Uint8Array;
}
