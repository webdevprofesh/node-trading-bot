/// <reference types="node" />
export declare class base32 {
    static alphabet: string;
    static encode(src: Buffer): Buffer;
    static decode(src: Buffer): Buffer;
}
