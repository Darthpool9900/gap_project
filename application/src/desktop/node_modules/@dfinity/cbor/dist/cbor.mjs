class w extends Error {
  constructor(n) {
    super(n), this.name = "DecodingError";
  }
}
const m = 55799, L = Symbol("CBOR_STOP_CODE");
var g = /* @__PURE__ */ ((t) => (t[t.False = 20] = "False", t[t.True = 21] = "True", t[t.Null = 22] = "Null", t[t.Undefined = 23] = "Undefined", t[t.Break = 31] = "Break", t))(g || {}), c = /* @__PURE__ */ ((t) => (t[t.UnsignedInteger = 0] = "UnsignedInteger", t[t.NegativeInteger = 1] = "NegativeInteger", t[t.ByteString = 2] = "ByteString", t[t.TextString = 3] = "TextString", t[t.Array = 4] = "Array", t[t.Map = 5] = "Map", t[t.Tag = 6] = "Tag", t[t.Simple = 7] = "Simple", t))(c || {});
const z = 23, Y = 255, G = 65535, P = 4294967295, H = BigInt("0xffffffffffffffff");
var d = /* @__PURE__ */ ((t) => (t[t.Value = 23] = "Value", t[t.OneByte = 24] = "OneByte", t[t.TwoBytes = 25] = "TwoBytes", t[t.FourBytes = 26] = "FourBytes", t[t.EightBytes = 27] = "EightBytes", t[t.Indefinite = 31] = "Indefinite", t))(d || {});
const h = !1;
function W(t) {
  return t == null;
}
function R(t, n) {
  const e = new Uint8Array(n);
  return e.set(t), e;
}
const K = new TextDecoder();
function Z(t) {
  return (t & 224) >> 5;
}
function q(t) {
  return t & 31;
}
let A = new Uint8Array(), y, a = 0;
function ut(t, n) {
  A = t, a = 0;
  const e = B(n);
  return (n == null ? void 0 : n(e)) ?? e;
}
function B(t) {
  const [n, e] = N();
  switch (n) {
    case c.UnsignedInteger:
      return E(e);
    case c.NegativeInteger:
      return j(e);
    case c.ByteString:
      return $(e);
    case c.TextString:
      return F(e);
    case c.Array:
      return J(e, t);
    case c.Map:
      return b(e, t);
    case c.Tag:
      return M(e, t);
    case c.Simple:
      return Q(e);
  }
  throw new w(`Unsupported major type: ${n}`);
}
function N() {
  const t = A.at(a);
  if (W(t))
    throw new w("Provided CBOR data is empty");
  const n = Z(t), e = q(t);
  return a++, [n, e];
}
function J(t, n) {
  const e = E(t);
  if (e === 1 / 0) {
    const u = [];
    let f = B(n);
    for (; f !== L; )
      u.push((n == null ? void 0 : n(f)) ?? f), f = B(n);
    return u;
  }
  const i = new Array(e);
  for (let u = 0; u < e; u++) {
    const f = B(n);
    i[u] = (n == null ? void 0 : n(f)) ?? f;
  }
  return i;
}
function Q(t) {
  switch (t) {
    case g.False:
      return !1;
    case g.True:
      return !0;
    case g.Null:
      return null;
    case g.Undefined:
      return;
    case g.Break:
      return L;
  }
  throw new w(`Unrecognized simple type: ${t.toString(2)}`);
}
function b(t, n) {
  const e = E(t), i = {};
  if (e === 1 / 0) {
    let [u, f] = N();
    for (; u !== c.Simple && f !== g.Break; ) {
      const l = F(f), U = B(n);
      i[l] = (n == null ? void 0 : n(U, l)) ?? U, [u, f] = N();
    }
    return i;
  }
  for (let u = 0; u < e; u++) {
    const [f, l] = N();
    if (f !== c.TextString)
      throw new w("Map keys must be text strings");
    const U = F(l), D = B(n);
    i[U] = (n == null ? void 0 : n(D, U)) ?? D;
  }
  return i;
}
function E(t) {
  if (t <= d.Value)
    return t;
  switch (y = new DataView(A.buffer, A.byteOffset + a), t) {
    case d.OneByte:
      return a++, y.getUint8(0);
    case d.TwoBytes:
      return a += 2, y.getUint16(0, h);
    case d.FourBytes:
      return a += 4, y.getUint32(0, h);
    case d.EightBytes:
      return a += 8, y.getBigUint64(0, h);
    case d.Indefinite:
      return 1 / 0;
    default:
      throw new w(`Unsupported integer info: ${t.toString(2)}`);
  }
}
function j(t) {
  const n = E(t);
  return typeof n == "number" ? -1 - n : -1n - n;
}
function $(t) {
  const n = E(t);
  if (n > Number.MAX_SAFE_INTEGER)
    throw new w("Byte length is too large");
  const e = Number(n);
  return a += e, A.slice(a - e, a);
}
function F(t) {
  const n = $(t);
  return K.decode(n);
}
function M(t, n) {
  const e = E(t);
  if (e === m)
    return B(n);
  throw new w(`Unsupported tag: ${e}.`);
}
class x extends Error {
  constructor(n) {
    super(n), this.name = "SerializationError";
  }
}
const p = 2 * 1024, C = 100, v = new TextEncoder();
function S(t) {
  return t << 5;
}
let o = new Uint8Array(p), r = new DataView(o.buffer), s = 0, O = [];
function rt(t, n) {
  s = 0;
  const e = (n == null ? void 0 : n(t)) ?? t;
  return _(e, n), o.slice(0, s);
}
function dt(t, n) {
  s = 0;
  const e = (n == null ? void 0 : n(t)) ?? t;
  return it(m, e, n), o.slice(0, s);
}
function _(t, n) {
  if (s > o.length - C && (o = R(o, o.length * 2), r = new DataView(o.buffer)), t === !1 || t === !0 || t === null || t === void 0) {
    et(t);
    return;
  }
  if (typeof t == "number" || typeof t == "bigint") {
    ft(t);
    return;
  }
  if (typeof t == "string") {
    X(t);
    return;
  }
  if (t instanceof Uint8Array) {
    V(t);
    return;
  }
  if (t instanceof ArrayBuffer) {
    V(new Uint8Array(t));
    return;
  }
  if (Array.isArray(t)) {
    tt(t, n);
    return;
  }
  if (typeof t == "object") {
    nt(t, n);
    return;
  }
  throw new x(`Unsupported type: ${typeof t}`);
}
function tt(t, n) {
  I(c.Array, t.length), t.forEach((e, i) => {
    _((n == null ? void 0 : n(e, i.toString())) ?? e, n);
  });
}
function nt(t, n) {
  O = Object.entries(t), I(c.Map, O.length), O.forEach(([e, i]) => {
    X(e), _((n == null ? void 0 : n(i, e)) ?? i, n);
  });
}
function I(t, n) {
  if (n <= z) {
    r.setUint8(
      s++,
      S(t) | Number(n)
    );
    return;
  }
  if (n <= Y) {
    r.setUint8(
      s++,
      S(t) | d.OneByte
    ), r.setUint8(s, Number(n)), s += 1;
    return;
  }
  if (n <= G) {
    r.setUint8(
      s++,
      S(t) | d.TwoBytes
    ), r.setUint16(s, Number(n), h), s += 2;
    return;
  }
  if (n <= P) {
    r.setUint8(
      s++,
      S(t) | d.FourBytes
    ), r.setUint32(s, Number(n), h), s += 4;
    return;
  }
  if (n <= H) {
    r.setUint8(
      s++,
      S(t) | d.EightBytes
    ), r.setBigUint64(s, BigInt(n), h), s += 8;
    return;
  }
  throw new x(`Value too large to encode: ${n}`);
}
function et(t) {
  I(c.Simple, st(t));
}
function st(t) {
  if (t === !1)
    return g.False;
  if (t === !0)
    return g.True;
  if (t === null)
    return g.Null;
  if (t === void 0)
    return g.Undefined;
  throw new x(`Unrecognized simple value: ${t.toString()}`);
}
function k(t, n) {
  I(t, n.length), s > o.length - n.length && (o = R(o, o.length + n.length), r = new DataView(o.buffer)), o.set(n, s), s += n.length;
}
function T(t, n) {
  I(t, n);
}
function ct(t) {
  T(c.UnsignedInteger, t);
}
function ot(t) {
  T(
    c.NegativeInteger,
    typeof t == "bigint" ? -1n - t : -1 - t
  );
}
function ft(t) {
  t >= 0 ? ct(t) : ot(t);
}
function X(t) {
  k(c.TextString, v.encode(t));
}
function V(t) {
  k(c.ByteString, t);
}
function it(t, n, e) {
  I(c.Tag, t), _(n, e);
}
export {
  w as DecodingError,
  x as EncodingError,
  ut as decode,
  rt as encode,
  dt as encodeWithSelfDescribedTag
};
//# sourceMappingURL=cbor.mjs.map
