"use strict";
/*
 * Copyright 2018-2020 The NATS Authors
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
/**
 * KeyPair capable of verifying only
 */
var PublicKey = /** @class */ (function () {
    function PublicKey(publicKey) {
        this.publicKey = publicKey;
    }
    PublicKey.prototype.getPublicKey = function () {
        return this.publicKey;
    };
    PublicKey.prototype.getPrivateKey = function () {
        throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.PublicKeyOnly);
    };
    PublicKey.prototype.getSeed = function () {
        throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.PublicKeyOnly);
    };
    PublicKey.prototype.sign = function (_) {
        throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.CannotSign);
    };
    PublicKey.prototype.verify = function (input, sig) {
        var buf = codec_1.Codec._decode(this.publicKey);
        return ed25519.sign.detached.verify(input, sig, buf.slice(1));
    };
    return PublicKey;
}());
exports.PublicKey = PublicKey;
//# sourceMappingURL=public.js.map