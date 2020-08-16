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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ed25519 = require("tweetnacl");
var kp_1 = require("./kp");
var public_1 = require("./public");
var codec_1 = require("./codec");
exports.VERSION = "1.0.16";
function createPair(prefix) {
    var rawSeed = ed25519.randomBytes(32).buffer;
    var str = codec_1.Codec.encodeSeed(prefix, Buffer.from(rawSeed));
    return new kp_1.KP(str);
}
exports.createPair = createPair;
function createAccount() {
    return createPair(Prefix.Account);
}
exports.createAccount = createAccount;
function createUser() {
    return createPair(Prefix.User);
}
exports.createUser = createUser;
function createOperator() {
    return createPair(Prefix.Operator);
}
exports.createOperator = createOperator;
function createCluster() {
    return createPair(Prefix.Cluster);
}
exports.createCluster = createCluster;
function createServer() {
    return createPair(Prefix.Server);
}
exports.createServer = createServer;
function fromPublic(src) {
    var raw = codec_1.Codec._decode(src);
    var prefix = Prefixes.parsePrefix(raw.readUInt8(0));
    if (Prefixes.isValidPublicPrefix(prefix)) {
        return new public_1.PublicKey(src);
    }
    throw new NKeysError(NKeysErrorCode.InvalidPublicKey);
}
exports.fromPublic = fromPublic;
function fromSeed(src) {
    codec_1.Codec.decodeSeed(src);
    // if we are here it decoded
    return new kp_1.KP(src);
}
exports.fromSeed = fromSeed;
var Prefix;
(function (Prefix) {
    //Seed is the version byte used for encoded NATS Seeds
    Prefix[Prefix["Seed"] = 144] = "Seed";
    //PrefixBytePrivate is the version byte used for encoded NATS Private keys
    Prefix[Prefix["Private"] = 120] = "Private";
    //PrefixByteOperator is the version byte used for encoded NATS Operators
    Prefix[Prefix["Operator"] = 112] = "Operator";
    //PrefixByteServer is the version byte used for encoded NATS Servers
    Prefix[Prefix["Server"] = 104] = "Server";
    //PrefixByteCluster is the version byte used for encoded NATS Clusters
    Prefix[Prefix["Cluster"] = 16] = "Cluster";
    //PrefixByteAccount is the version byte used for encoded NATS Accounts
    Prefix[Prefix["Account"] = 0] = "Account";
    //PrefixByteUser is the version byte used for encoded NATS Users
    Prefix[Prefix["User"] = 160] = "User";
})(Prefix = exports.Prefix || (exports.Prefix = {}));
/**
 * Internal utility for testing prefixes
 */
var Prefixes = /** @class */ (function () {
    function Prefixes() {
    }
    Prefixes.isValidPublicPrefix = function (prefix) {
        return prefix == Prefix.Server
            || prefix == Prefix.Operator
            || prefix == Prefix.Cluster
            || prefix == Prefix.Account
            || prefix == Prefix.User;
    };
    Prefixes.startsWithValidPrefix = function (s) {
        var c = s[0];
        return c == 'S' || c == 'P' || c == 'O' || c == 'N' || c == 'C' || c == 'A' || c == 'U';
    };
    Prefixes.isValidPrefix = function (prefix) {
        var v = this.parsePrefix(prefix);
        return v != -1;
    };
    Prefixes.parsePrefix = function (v) {
        switch (v) {
            case Prefix.Seed:
                return Prefix.Seed;
            case Prefix.Private:
                return Prefix.Private;
            case Prefix.Operator:
                return Prefix.Operator;
            case Prefix.Server:
                return Prefix.Server;
            case Prefix.Cluster:
                return Prefix.Cluster;
            case Prefix.Account:
                return Prefix.Account;
            case Prefix.User:
                return Prefix.User;
            default:
                return -1;
        }
    };
    return Prefixes;
}());
exports.Prefixes = Prefixes;
var NKeysErrorCode;
(function (NKeysErrorCode) {
    NKeysErrorCode["InvalidPrefixByte"] = "nkeys: invalid prefix byte";
    NKeysErrorCode["InvalidKey"] = "nkeys: invalid key";
    NKeysErrorCode["InvalidPublicKey"] = "nkeys: invalid public key";
    NKeysErrorCode["InvalidSeedLen"] = "nkeys: invalid seed length";
    NKeysErrorCode["InvalidSeed"] = "nkeys: invalid seed";
    NKeysErrorCode["InvalidEncoding"] = "nkeys: invalid encoded key";
    NKeysErrorCode["InvalidSignature"] = "nkeys: signature verification failed";
    NKeysErrorCode["CannotSign"] = "nkeys: can not sign, no private key available";
    NKeysErrorCode["PublicKeyOnly"] = "nkeys: no seed or private key available";
    NKeysErrorCode["InvalidChecksum"] = "nkeys: invalid checksum";
    NKeysErrorCode["SerializationError"] = "nkeys: serialization error";
    NKeysErrorCode["ApiError"] = "nkeys: api error";
})(NKeysErrorCode = exports.NKeysErrorCode || (exports.NKeysErrorCode = {}));
var NKeysError = /** @class */ (function (_super) {
    __extends(NKeysError, _super);
    /**
     * @param {NKeysErrorCode} code
     * @param {Error} [chainedError]
     * @constructor
     *
     * @api private
     */
    function NKeysError(code, chainedError) {
        var _this = _super.call(this, code) || this;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = "NKeysError";
        _this.code = code;
        _this.chainedError = chainedError;
        return _this;
    }
    return NKeysError;
}(Error));
exports.NKeysError = NKeysError;
//# sourceMappingURL=nkeys.js.map