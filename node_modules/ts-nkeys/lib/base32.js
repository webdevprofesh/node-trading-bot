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
// Fork of https://github.com/LinusU/base32-encode
// and https://github.com/LinusU/base32-decode to support returning
// buffers without padding.
var base32 = /** @class */ (function () {
    function base32() {
    }
    base32.encode = function (src) {
        var bits = 0;
        var value = 0;
        var a = new Uint8Array(src);
        var buf = Buffer.allocUnsafe(src.byteLength * 2);
        var j = 0;
        for (var i = 0; i < a.byteLength; i++) {
            value = (value << 8) | a[i];
            bits += 8;
            while (bits >= 5) {
                var index = (value >>> (bits - 5)) & 31;
                buf[j++] = base32.alphabet.charAt(index).charCodeAt(0);
                bits -= 5;
            }
        }
        if (bits > 0) {
            var index = (value << (5 - bits)) & 31;
            buf[j++] = base32.alphabet.charAt(index).charCodeAt(0);
        }
        return buf.slice(0, j);
    };
    base32.decode = function (src) {
        var bits = 0;
        var byte = 0;
        var j = 0;
        var a = new Uint8Array(src);
        var out = Buffer.alloc(a.byteLength * 5 / 8 | 0);
        for (var i = 0; i < a.byteLength; i++) {
            var v = String.fromCharCode(a[i]);
            var vv = base32.alphabet.indexOf(v);
            if (vv === -1) {
                throw new Error("Illegal Base32 character: " + a[i]);
            }
            byte = (byte << 5) | vv;
            bits += 5;
            if (bits >= 8) {
                out[j++] = (byte >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }
        return out.slice(0, j);
    };
    base32.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    return base32;
}());
exports.base32 = base32;
//# sourceMappingURL=base32.js.map