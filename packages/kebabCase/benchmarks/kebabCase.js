const { Suite } = require('benchmark');
const _ = require('lodash');
const { kebabcase } = require('../lib');

const suite = new Suite('kebabcase');

suite
.add('util-lite', () => {
  kebabcase('fooBar')
})
.add('lodash', () => {
  _.kebabcase('fooBar');
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });