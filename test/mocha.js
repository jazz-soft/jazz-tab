const assert = require('assert');
const { Parser } = require('..');

describe('tokenize', function() {
  it('(abc)  d e|f&g', function() {
    var P = new Parser('(abc)  d e|f&g');
    console.log(P.tok);
  });
  it('C20Cb0C#10', function() {
    var P = new Parser('C20Cb0C#10');
    console.log(P.tok);
  });
  it('Cx', function() {
    var P = new Parser('Cx');
    console.log(P.tok);
  });
});
