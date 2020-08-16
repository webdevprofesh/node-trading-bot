"use strict";
/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var crc16_1 = require("./crc16");
var ed25519 = require("tweetnacl");
var nkeys_1 = require("./nkeys");
var util = require("./util");
var base32_1 = require("./base32");
var Codec = /** @class */ (function () {
    function Codec() {
    }
    Codec.encode = function (prefix, src) {
        if (!Buffer.isBuffer(src)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.SerializationError);
        }
        if (!nkeys_1.Prefixes.isValidPrefix(prefix)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        return Codec._encode(false, prefix, src);
    };
    Codec.encodeSeed = function (role, src) {
        if (!nkeys_1.Prefixes.isValidPublicPrefix(role)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        if (!Buffer.isBuffer(src)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.ApiError);
        }
        if (src.byteLength != ed25519.sign.seedLength) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidSeedLen);
        }
        return Codec._encode(true, role, src);
    };
    Codec.decode = function (expected, src) {
        if (!nkeys_1.Prefixes.isValidPrefix(expected)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        var raw = Codec._decode(src);
        if (raw[0] !== expected) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        return raw.slice(1);
    };
    Codec.decodeSeed = function (src) {
        var raw = Codec._decode(src);
        var prefix = Codec._decodePrefix(raw);
        if (prefix[0] != nkeys_1.Prefix.Seed) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidSeed);
        }
        if (!nkeys_1.Prefixes.isValidPublicPrefix(prefix[1])) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        return ({ buf: raw.slice(2), prefix: prefix[1] });
    };
    // unsafe encode no prefix/role validation
    Codec._encode = function (seed, role, payload) {
        // offsets for this token
        var payloadOffset = seed ? 2 : 1;
        var payloadLen = payload.byteLength;
        var checkLen = 2;
        var cap = payloadOffset + payloadLen + checkLen;
        var checkOffset = payloadOffset + payloadLen;
        var raw = Buffer.alloc(cap);
        // make the prefixes human readable when encoded
        if (seed) {
            var encodedPrefix = Codec._encodePrefix(nkeys_1.Prefix.Seed, role);
            encodedPrefix.copy(raw, 0, 0);
        }
        else {
            raw[0] = role;
        }
        payload.copy(raw, payloadOffset, 0);
        //calculate the checksum write it LE
        var checksum = crc16_1.crc16.checksum(raw.slice(0, checkOffset));
        raw.writeUInt16LE(checksum, checkOffset);
        return base32_1.base32.encode(raw);
    };
    // unsafe decode - no prefix/role validation
    Codec._decode = function (src) {
        if (src.byteLength < 4) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidEncoding);
        }
        var raw;
        try {
            raw = base32_1.base32.decode(src);
        }
        catch (ex) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidEncoding, ex);
        }
        var checkOffset = raw.byteLength - 2;
        var checksum = raw.readUInt16LE(checkOffset);
        var payload = raw.slice(0, checkOffset);
        if (!crc16_1.crc16.validate(payload, checksum)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidChecksum);
        }
        return payload;
    };
    Codec._encodePrefix = function (kind, role) {
        // In order to make this human printable for both bytes, we need to do a little
        // bit manipulation to setup for base32 encoding which takes 5 bits at a time.
        var b1 = kind | (role >> 5);
        var b2 = (role & 31) << 3; // 31 = 00011111
        return Buffer.from([b1, b2]);
    };
    Codec._decodePrefix = function (raw) {
        // Need to do the reverse from the printable representation to
        // get back to internal representation.
        var b1 = raw[0] & 248; // 248 = 11111000
        var b2 = (raw[0] & 7) << 5 | ((raw[1] & 248) >> 3); // 7 = 00000111
        var a = new Uint8Array(2);
        a[0] = b1;
        a[1] = b2;
        return a;
    };
    Codec.toArrayBuffer = util.toArrayBuffer();
    return Codec;
}());
exports.Codec = Codec;
//# sourceMappingURL=codec.js.map