var A = Object.defineProperty;
var y = (o, e, s) => e in o ? A(o, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : o[e] = s;
var n = (o, e, s) => (y(o, typeof e != "symbol" ? e + "" : e, s), s);
const b = (o, e) => (o > e ? o : e).toString().length, c = (o, e) => {
  const s = (t, i) => t.length < i ? s("0" + t, i) : t;
  return ((t) => t.split("").map(Number))(s(o.toString(), e)).reverse();
}, g = (o) => Object.prototype.toString.call(o) === "[object String]";
class C {
  constructor({
    node: e,
    from: s = 0,
    easeFn: r = (m) => (m /= 0.5) < 1 ? 0.5 * Math.pow(m, 3) : 0.5 * (Math.pow(m - 2, 3) + 2),
    systemArr: t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    duration: i = 0.5,
    to: h,
    direct: l = !0,
    delay: a,
    separator: d,
    separateOnly: u = 0,
    separateEvery: p = 3,
    letterMargin: f = 0
  }) {
    n(this, "node");
    // 最大位数就是根据这个 from 来定的
    n(this, "from");
    n(this, "easeFn");
    n(this, "systemArr");
    n(this, "beforeArr");
    n(this, "afterArr");
    n(this, "numberColumnNodeArr");
    n(this, "duration");
    n(this, "to");
    n(this, "direct");
    n(this, "separator");
    n(this, "separateOnly");
    n(this, "separateEvery");
    n(this, "height");
    n(this, "letterMargin");
    this.beforeArr = [], this.afterArr = [], this.numberColumnNodeArr = [], this.duration = i * 1e3, this.systemArr = t, this.easeFn = r, this.from = s, this.to = h || 0, this.node = e, this.direct = l, this.separator = d, this.separateOnly = u, this.separateEvery = u ? 0 : p, this.letterMargin = f, this._initHTML(b(this.from, this.to)), this.setSelect(this.from), h !== void 0 && (a ? setTimeout(() => this.rollTo({ to: this.to }), a) : this.rollTo({ to: this.to }));
  }
  _initHTML(e) {
    for (; this.node.lastChild; )
      this.node.removeChild(this.node.lastChild);
    this.node.classList.add("number-roll"), this.node.style.position = "relative", this.node.style.overflow = "hidden", this.node.style.display = "block", this.node;
    for (let r = 0; r < e; r++) {
      const t = document.createElement("div");
      if (t.classList.add(`ncn${r}`), t.classList.add("ncn"), t.style.position = "relative", t.style.display = "inline-block", t.style.verticalAlign = "top", t.style.margin = `0 ${this.letterMargin}px`, [...this.systemArr, this.systemArr[0]].forEach((l) => {
        const a = document.createElement("div");
        a.className = "digit", a.innerHTML = `${l}`, t.appendChild(a);
      }), this.numberColumnNodeArr.unshift(t), this.node.appendChild(t), this.beforeArr.push(0), !this.separator || !this.separateOnly && !this.separateEvery || r === e - 1 || (e - r) % this.separateEvery != 1 && e - r - this.separateOnly != 1)
        continue;
      const i = g(this.separator) ? this.separator : this.separator.shift(), h = document.createElement("div");
      h.className = "sprtr", h.style.display = "inline-block", h.innerHTML = i, this.node.appendChild(h);
    }
    const s = () => {
      if (this.height = this.numberColumnNodeArr[0].clientHeight / (this.systemArr.length + 1), this.node.style.height = this.height + "px", !this.afterArr.length)
        for (let r = 0, t = this.numberColumnNodeArr.length; r < t; r++)
          this._draw({
            digit: r,
            per: 1,
            alter: ~~(this.from / Math.pow(10, r))
          });
    };
    s(), window.addEventListener("resize", s);
  }
  _draw({ per: e, alter: s, digit: r }) {
    const t = this.numberColumnNodeArr[0].clientHeight / (this.systemArr.length + 1);
    this.height !== t && (this.height = t);
    const i = this.beforeArr[r], l = `translateY(${-(((e * s + i) % 10 + 10) % 10) * (this.height || 0)}px) `;
    this.numberColumnNodeArr[r].style.webkitTransform = l, this.numberColumnNodeArr[r].style.transform = l;
  }
  frame(e) {
    let s = 0;
    for (let r = this.numberColumnNodeArr.length - 1; r >= 0; r--) {
      const t = this.afterArr[r] - this.beforeArr[r];
      s += t, this._draw({
        digit: r,
        per: this.easeFn(e),
        alter: this.direct ? t : s
      }), s *= 10;
    }
  }
  rollTo({
    to: e,
    duration: s = 0,
    easeFn: r,
    direct: t
  }) {
    r && (this.easeFn = r), t !== void 0 && (this.direct = t), this.setSelect(e);
    const i = this.numberColumnNodeArr.length;
    this.beforeArr = c(this.from, i), this.afterArr = c(e, i);
    const h = Date.now(), l = s * 1e3 || this.duration, a = () => {
      const d = Date.now() - h;
      this.frame(d / l), d < l ? requestAnimationFrame(a) : (this.from = e, this.frame(1));
    };
    requestAnimationFrame(a);
  }
  // 无关紧要这个方法
  setSelect(e) {
    const s = this.numberColumnNodeArr.length;
    c(e, s).forEach((r, t) => {
      for (let i = 0; i < this.numberColumnNodeArr[t].childNodes.length; i++) {
        const h = this.numberColumnNodeArr[t].childNodes[i];
        h.style.userSelect = i === r ? "auto" : "none";
      }
    });
  }
}
export {
  C as Roll
};
