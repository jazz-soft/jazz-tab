const assert = require('assert');
const { Parser } = require('..');

function compare(x, y) {
  assert.equal(x.length, y.length);
  for (var i = 0; i < x.length; i++) compare_obj(x[i], y[i]);
}
function compare_obj(x, y) {
  var keys = Object.keys(x);
  assert.equal(keys.length, Object.keys(y).length);
  for (var k of keys) assert.equal(x[k], y[k]);
}

describe('tokenize', function() {
  it('(abc)  d e|f&g', function() {
    var P = new Parser('(abc)  d e|f&g');
    //console.log(P.tok);
    compare(P.tok, [
      { from: 0, to: 1, txt: '(', t: '(' },
      { from: 1, to: 4, txt: 'abc' },
      { from: 4, to: 5, txt: ')', t: ')' },
      { from: 7, to: 8, txt: 'd' },
      { from: 9, to: 10, txt: 'e' },
      { from: 10, to: 11, txt: '|', t: '|' },
      { from: 11, to: 12, txt: 'f' },
      { from: 12, to: 13, txt: '&', t: '&' },
      { from: 13, to: 14, txt: 'g' }
    ]);
  });
  it('C1C2CxC3(C4)C10Cb0Cbb0A#1A##10', function() {
    var P = new Parser('C1C2CxC3(C4)C10Cb0Cbb0A#1A##10');
    //console.log(P.tok);
    compare(P.tok, [
      { from: 0, to: 2, txt: 'C1', t: 'm', m: 12 },
      { from: 2, to: 4, txt: 'C2', t: 'm', m: 24 },
      { from: 4, to: 6, txt: 'Cx' },
      { from: 6, to: 8, txt: 'C3', t: 'm', m: 36 },
      { from: 8, to: 9, txt: '(', t: '(' },
      { from: 9, to: 11, txt: 'C4', t: 'm', m: 48 },
      { from: 11, to: 12, txt: ')', t: ')' },
      { from: 12, to: 15, txt: 'C10', t: 'm', m: 120 },
      { from: 15, to: 22, txt: 'Cb0Cbb0' },
      { from: 22, to: 25, txt: 'A#1', t: 'm', m: 22 },
      { from: 25, to: 30, txt: 'A##10' }    ]);
  });
});
