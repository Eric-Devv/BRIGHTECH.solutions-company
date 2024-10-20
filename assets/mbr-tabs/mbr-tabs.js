var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value);
      };
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global && null != global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var f = a[d];
      f in c || (c[f] = {});
      c = c[f];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d &&
      null != b &&
      $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b,
      });
  }
};
$jscomp.polyfill(
  "Array.from",
  function (a) {
    return a
      ? a
      : function (a, c, d) {
          c =
            null != c
              ? c
              : function (a) {
                  return a;
                };
          var f = [],
            b =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              a[Symbol.iterator];
          if ("function" == typeof b) {
            a = b.call(a);
            for (var e = 0; !(b = a.next()).done; )
              f.push(c.call(d, b.value, e++));
          } else
            for (b = a.length, e = 0; e < b; e++) f.push(c.call(d, a[e], e));
          return f;
        };
  },
  "es6",
  "es3"
);
$jscomp.checkStringArgs = function (a, b, c) {
  if (null == a)
    throw new TypeError(
      "The 'this' value for String.prototype." +
        c +
        " must not be null or undefined"
    );
  if (b instanceof RegExp)
    throw new TypeError(
      "First argument to String.prototype." +
        c +
        " must not be a regular expression"
    );
  return a + "";
};
$jscomp.polyfill(
  "String.prototype.startsWith",
  function (a) {
    return a
      ? a
      : function (a, c) {
          var b = $jscomp.checkStringArgs(this, a, "startsWith");
          a += "";
          var f = b.length,
            g = a.length;
          c = Math.max(0, Math.min(c | 0, b.length));
          for (var e = 0; e < g && c < f; ) if (b[c++] != a[e++]) return !1;
          return e >= g;
        };
  },
  "es6",
  "es3"
);
function outerFind(a, b) {
  var c = Array.from(a.querySelectorAll(b));
  a.matches(b) && c.splice(0, 0, a);
  return c;
}
function updateId(a) {
  0 !== a.querySelectorAll(".nav-tabs").length &&
    outerFind(
      a,
      'section[id^="tabs"], section.tabs, section[id^="extTabs"], section [class*="-tabs"]'
    ).forEach(function (b) {
      if ("SECTION" === b.tagName) {
        var c = b.getAttribute("id"),
          d = b.querySelectorAll(".nav-tabs > .nav-item");
        b.querySelectorAll(".tab-pane").forEach(function (a, b) {
          a.setAttribute("id", c + "_tab" + b);
          0 === b
            ? (a.classList.contains("active") || a.classList.add("active"),
              a.classList.contains("show") || a.classList.add("show"))
            : (a.classList.remove("active"), a.classList.remove("show"));
        });
        d.forEach(function (b, d) {
          b = b.querySelector("a");
          b.setAttribute("href", "#" + c + "_tab" + d);
          a.getAttribute("data-bs-version") &&
            a.getAttribute("data-bs-version").startsWith("5") &&
            b.setAttribute("data-bs-toggle", "tab");
          0 === d
            ? (b.classList.contains("active") || b.classList.add("active"),
              b.classList.contains("show") || b.classList.add("show"))
            : (b.classList.remove("active"),
              b.classList.remove("show"),
              b.removeAttribute("active"));
        });
      }
    });
}
var $,
  isJQuery = "function" == typeof jQuery;
isJQuery && ($ = jQuery);
var isBuilder = document.querySelector("html").classList.contains("is-builder");
if (isBuilder && isJQuery)
  $(document).on("add.cards", function (a) {
    updateId(a.target);
  });
else
  "undefined" === typeof window.initTabsPlugin &&
    ((window.initTabsPlugin = !0), updateId(document.body));
