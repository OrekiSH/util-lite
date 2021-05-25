const { Suite } = require('benchmark');
const _ = require('lodash');
const { pick } = require('../lib');

const suite = new Suite('pick');
const obj = { 'a': 1, 'b': 2, 'c': 3, 'd': undefined, 'e': null };

suite
.add('util-lite', () => {
  pick(obj, ['a', 'c']);
})
.add('lodash', () => {
  _.pick(obj, ['a', 'c']);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });