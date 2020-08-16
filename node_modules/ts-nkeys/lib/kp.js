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
var ed25519 = require("tweetnacl");
var codec_1 = require("./codec");
var nkeys_1 = require("./nkeys");
var KP = /** @class */ (function () {
    function KP(seed) {
        this.seed = seed;
    }
    KP.prototype.getRawSeed = function () {
        var sd = codec_1.Codec.decodeSeed(this.seed);
        return sd.buf;
    };
    KP.prototype.getSeed = function () {
        return this.seed;
    };
    KP.prototype.getPublicKey = function () {
        var sd = codec_1.Codec.decodeSeed(this.seed);
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        return codec_1.Codec.encode(sd.prefix, Buffer.from(kp.publicKey));
    };
    ;
    KP.prototype.getPrivateKey = function () {
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        return codec_1.Codec.encode(nkeys_1.Prefix.Private, Buffer.from(kp.secretKey));
    };
    KP.prototype.sign = function (input) {
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        var a = ed25519.sign.detached(input, kp.secretKey);
        return Buffer.from(a.buffer);
    };
    KP.prototype.verify = function (input, sig) {
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        return ed25519.sign.detached.verify(input, sig, kp.publicKey);
    };
    return KP;
}());
exports.KP = KP;
//# sourceMappingURL=kp.js.map