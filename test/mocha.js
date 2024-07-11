const assert = require('assert');
const { Parser } = require('..');

describe('tokenize', function() {
  it('(abc)  d e|f&g', function() {
    var P = new Parser('(abc)  d e|f&g');
    console.log(P.tok);
  });
});
