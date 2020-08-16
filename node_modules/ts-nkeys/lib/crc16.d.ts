/// <reference types="node" />
export declare class crc16 {
    static checksum(data: Buffer): number;
    static validate(data: Buffer, expected: number): boolean;
}
