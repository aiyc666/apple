// let head = require('d:\\node_libs\\head');
let head = require('head');
let body = require('./body');
head.hello();
body.hello();

module.exports = {
    head,
    body,
    hello() {
        this.head.hello();
        this.body.hello();
    }
};