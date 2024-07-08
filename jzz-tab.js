function Parser(s, opt) {
  this.txt = s;
  this.prev = 0;
  this.cur = 0;
  this.tok = [];
  while (this.cur < this.txt.length) {
    var c = this.txt[this.cur];
    if (/\s/.test(c)) {
      this.cut();
      this.prev++;
    }
    else if (c == '|') {
      this.cut();
      this.cur++;
      this.cut();
    }
    this.cur++;
  }
  this.cut();
}

Parser.prototype.cut = function() {
  if (this.prev != this.cur) {
    this.tok.push({ from: this.prev, to: this.cur, txt: this.txt.substring(this.prev, this.cur) });
    this.prev = this.cur;
  }
}

module.exports = {
  Parser: Parser
};