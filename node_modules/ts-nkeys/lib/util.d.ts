/// <reference types="node" />
export declare function dump(buf: Buffer, msg?: string): void;
export interface ToArrayBuffer {
    (buf: Buffer): ArrayBuffer;
}
export declare function toArrayBuffer(): ToArrayBuffer;
