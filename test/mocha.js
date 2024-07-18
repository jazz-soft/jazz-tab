const assert = require('assert');
const { Parser } = require('..');

describe('tokenize', function() {
  it('(abc)  d e|f&g', function() {
    var P = new Parser('(abc)  d e|f&g');
    console.log(P.tok);
  });
  it('C1C2CxC3(C4)C10Cb0Cbb0A#1A##10', function() {
    var P = new Parser('C1C2CxC3(C4)C10Cb0Cbb0A#1A##10');
    console.log(P.tok);
  });
});
