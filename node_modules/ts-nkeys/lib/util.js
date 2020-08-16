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
function dump(buf, msg) {
    if (msg) {
        console.log(msg);
    }
    var a = [];
    for (var i = 0; i < buf.byteLength; i++) {
        if (i % 8 === 0) {
            a.push('\n');
        }
        var v = buf[i].toString(16);
        if (v.length === 1) {
            v = '0' + v;
        }
        a.push(v);
    }
    console.log(a.join('  '));
}
exports.dump = dump;
function node6(buf) {
    // @ts-ignore
    return buf;
}
function node8(buf) {
    return buf.buffer;
}
function parseNodeVersion() {
    var ma = process.version.match(/^v(\d+).+/i);
    if (ma && ma.length > 1) {
        return parseInt(ma[1], 10);
    }
    return 0;
}
// Node < 8 needs different handling on how a Buffer
// is converted to ArrayBuffer. These older nodes
// don't have the '.buffer' property.
function toArrayBuffer() {
    if (parseNodeVersion() < 8) {
        return node6;
    }
    else {
        return node8;
    }
}
exports.toArrayBuffer = toArrayBuffer;
//# sourceMappingURL=util.js.map