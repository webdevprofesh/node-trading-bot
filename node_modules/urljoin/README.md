urljoin
========
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build status][appveyor-image]][appveyor-url] [![Dependency status][david-dm-image]][david-dm-url] [![De vDependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Built with Grunt][grunt-image]][grunt-url]

Join the urls like joining the paths


usage
========

    var urljoin = require('urljoin');
    
    ///static/css/index.css
    urljoin('\\static', '\\css', 'index.css');
    //http://yanni4night.com/static/index/main.css
    urljoin("http://yanni4night.com", 'static/css', '../index', 'main.css');
    //http://yanni4night.com/static/css/main.css
    urljoin("http://yanni4night.com/", '/static/css/', '/main.css');
    //http://yanni4night.com/static/css/main.css?aa=60
    urljoin("http://yanni4night.com?aa=60", 'static/css', '', 'main.css');
    //http://yanni4night.com/static/css/main.css?aa=60
    urljoin("http://yanni4night.com", 'static/css', '', 'main.css?aa=60');
    ///static/css/search/main.css?aa=60&bb=70&cc=80&dd=90
    urljoin("/?aa=60", 'static?bb=70', 'css?cc=80', 'main.css?dd=90'));
    //static/css/main.css?aa=60
    urljoin('static/css','main.css','?aa=60');
    //http://yanni4night.com/static/build
    urljoin('http://yanni4night.com/static','http://google.com/build')


 - Only the **protocol/port/host** in the first part will be saved
 - Get parameters will be **all** saved

author
========

 - yanni4night@gmail.com

[npm-url]: https://npmjs.org/package/urljoin
[downloads-image]: http://img.shields.io/npm/dm/urljoin.svg
[npm-image]: http://img.shields.io/npm/v/urljoin.svg
[travis-url]: https://travis-ci.org/yanni4night/urljoin
[travis-image]: http://img.shields.io/travis/yanni4night/urljoin.svg
[appveyor-image]:https://ci.appveyor.com/api/projects/status/bsu9w9ar8pboc2nj?svg=true
[appveyor-url]:https://ci.appveyor.com/project/yanni4night/urljoin
[david-dm-url]:https://david-dm.org/yanni4night/urljoin
[david-dm-image]:https://david-dm.org/yanni4night/urljoin.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/urljoin#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/yanni4night/urljoin/dev-status.svg
[coveralls-url]:https://coveralls.io/r/yanni4night/urljoin?branch=master
[coveralls-image]:https://coveralls.io/repos/yanni4night/urljoin/badge.png?branch=master
[grunt-url]:http://gruntjs.com/
[grunt-image]: http://img.shields.io/badge/BUILT%20WITH-GRUNT-yellow.svg
