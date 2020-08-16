# ts-nkeys


A public-key signature system based on Ed25519 for the [NATS ecosystem system](https://nats.io) in JavaScript and Typescript.

[![license](https://img.shields.io/github/license/nats-io/ts-nats.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Build Status](https://travis-ci.org/nats-io/ts-nkeys.svg?branch=master)](https://travis-ci.org/nats-io/ts-nkeys)
[![Coveralls github branch](https://img.shields.io/coveralls/github/nats-io/ts-nkeys/master.svg)](https://coveralls.io/github/nats-io/ts-nkeys)
[![npm](https://img.shields.io/npm/v/ts-nkeys.svg)](https://www.npmjs.com/package/ts-nkeys)
[![npm](https://img.shields.io/npm/dt/ts-nkeys.svg)](https://www.npmjs.com/package/ts-nkeys)

ts-nkeys is a typescript nats library for node that for generating nkeys.

## Installation

```bash
npm install ts-nkeys
```

## Basic Usage

```typescript
    // create an user nkey - also possible to create accounts, clusters, servers.
    let user = createUser();

    // once you have an nkey you can generate various keys.
    // A seed is the public and private keys together.
    // Seeds are strings, and start with the letter 'S'. 
    // Seeds need to be kept safe and never shared.
    let seed = user.getSeed();
    t.true(Buffer.isBuffer(seed));
    t.is(seed[0], 'S'.charCodeAt(0));
    
    // the second letter in the seed represents its type:
    // `U` for user, 
    // `A` for account, 
    // `C` for cluster
    // `N` for severs
    t.is(seed[1], 'U'.charCodeAt(0));

    // public keys can be shared and can be used to verify signed content
    let publicKey = user.getPublicKey();
    t.true(Buffer.isBuffer(publicKey));
    // first letter represents the type of public key
    // `U` for user, 
    // `A` for account, 
    // `C` for cluster
    // `N` for severs
    t.is(publicKey[0], 'U'.charCodeAt(0));


    // To sign data
    let data = Buffer.from("HelloWorld");
    let sig = user.sign(data);
    
    // to verify use the user, public or seed:
    t.true(user.verify(data, sig));

    // public keys can be used to verify signatures you cannot sign with them though.
    let pk = fromPublic(publicKey);
    t.true(pk.verify(data, sig));

    // seeds can be used to reconstitute the keypair from a string
    let sk = fromSeed(seed);
    t.true(sk.verify(data, sig));
    // and can be used to sign
    let sig2 = sk.sign(data);
    t.true(sk.verify(data, sig));
```


## Supported Node Versions

Our support policy for Nodejs versions follows [Nodejs release support]( https://github.com/nodejs/Release).
We will support and build node-nats on even-numbered Nodejs versions that are current or in LTS.

## License

Unless otherwise noted, the NATS source files are distributed under the Apache Version 2.0 license found in the LICENSE file.
