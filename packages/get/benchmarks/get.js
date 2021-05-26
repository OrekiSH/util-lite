const { Suite } = require('benchmark');
const _ = require('lodash');
const { get } = require('../lib');

const suite = new Suite('pick');
const obj = { 'a': 1, 'b': { f: 'a' }, 'c': 3, 'd': undefined, 'e': null };

suite
.add('util-lite', () => {
  get(obj, 'b.f');
})
.add('lodash', () => {
  _.get(obj, 'b.f');
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });