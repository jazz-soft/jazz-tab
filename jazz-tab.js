function Parser(s, opt) {
  this.txt = s;
  this.opt = opt;
  this.prev = 0;
  this.cur = 0;
  this.tok = [];
  while (this.cur < this.txt.length) {
    var c = this.txt[this.cur];
    if (/\s/.test(c)) {
      this.cut();
      this.prev++;
    }
    else if (c == '|' || c == '&' || c == '(' || c == ')') {
      this.cut();
      this.cur++;
      this.cut({ t: c });
      continue;
    }
    else if (this.readNote()) {
      continue;
    }
    this.cur++;
  }
  this.cut();
}

Parser.prototype.cut = function(o) {
  if (this.prev != this.cur) {
    var x = { from: this.prev, to: this.cur, txt: this.txt.substring(this.prev, this.cur) };
    if (o) for (var k of Object.keys(o)) x[k] = o[k];
    this.tok.push(x);
    this.prev = this.cur;
  }
}

Parser.prototype.readNote = function() {
  if (this.opt && !this.opt.m) return false;
  var p = this.cur;
  var c = this.txt[p];
  var n = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[c];
  if (typeof n == 'undefined') return false;
  p++; c = this.txt[p];
  if (c == '#') {
    n++;
    p++; c = this.txt[p];
  }
  else if (c == 'b') {
    n--;
    p++; c = this.txt[p];
  }
  if (c >= 0 && c <=9) {
    n += c * 12;
    if (n < 0) return false; // e.g. Cb0
    p++;
    if (c == 1 && this.txt[p] == 0 && n + 9 * 12 < 128) { // e.g. C#10
      p++; n += 9 * 12;
    }
    this.cut();
    this.cur = p;
    this.cut({ t: 'm', m: n });
    return true;
  }
  return false;
}

module.exports = {
  Parser: Parser
};