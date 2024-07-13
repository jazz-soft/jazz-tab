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
      this.cut(c);
    }
    else if (this.readNote()) {
    }
    this.cur++;
  }
  this.cut();
}

Parser.prototype.cut = function(t) {
  if (this.prev != this.cur) {
    this.tok.push(t ?
      { from: this.prev, to: this.cur, txt: this.txt.substring(this.prev, this.cur), type: t } :
      { from: this.prev, to: this.cur, txt: this.txt.substring(this.prev, this.cur) }
    );
    this.prev = this.cur;
  }
}

Parser.prototype.readNote = function() {
  if (this.opt && !this.opt.m) return false;
  var p = this.cur;
}

module.exports = {
  Parser: Parser
};