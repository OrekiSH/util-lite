const { Suite } = require('benchmark');
const _ = require('lodash');
const { kebabCase } = require('../lib');

const suite = new Suite('kebabCase');

suite
.add('util-lite', () => {
  kebabCase('fooBar')
})
.add('lodash', () => {
  _.kebabCase('fooBar');
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });