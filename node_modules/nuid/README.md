# NODE NUID

[![license](https://img.shields.io/github/license/nats-io/node-nuid.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Travis branch](https://img.shields.io/travis/nats-io/node-nuid/master.svg)](https://travis-ci.org/nats-io/node-nuid)
[![Coveralls github branch](https://img.shields.io/coveralls/github/nats-io/node-nuid/master.svg)](https://coveralls.io/github/nats-io/node-nuid)
[![npm](https://img.shields.io/npm/v/nuid.svg)](https://www.npmjs.com/package/nuid)
[![npm](https://img.shields.io/npm/dt/nuid.svg)](https://www.npmjs.com/package/nuid)
[![npm](https://img.shields.io/npm/dm/nuid.svg)](https://www.npmjs.com/package/nuid)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A highly performant unique identifier generator.

## Installation

Use the `npm` command:

	$ npm install nuid

## Basic Usage
```javascript

const NUID = require('nuid');
let nuid = NUID.next();


// Generate a new crypto/rand seeded prefix.
// Generally not needed, happens automatically.
NUID.reset();
```

## Performance
NUID needs to be very fast to generate and be truly unique, all while being entropy pool friendly.
NUID uses 12 bytes of crypto generated data (entropy draining), and 10 bytes of pseudo-random
sequential data that increments with a pseudo-random increment.

Total length of a NUID string is 22 bytes of base 36 ascii text, so 36^22 or
17324272922341479351919144385642496 possibilities.

## Supported Node Versions    

Support policy for Nodejs versions follows 
[Nodejs release support]( https://github.com/nodejs/Release).
We will support and build node-nats on even Nodejs versions that are current 
or in maintenance.


## License

Unless otherwise noted, the NATS source files are distributed under the Apache Version 2.0 license found in the LICENSE file.
