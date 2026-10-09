/* 主题切换、代码块复制 */
(function () {
  "use strict";

  var STORAGE_KEY = "blog-theme";

  /* ---------- 主题切换 ---------------------------------------------- */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "";
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme) {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function initTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") applyTheme(saved);
    } catch (e) {
      /* 隐私模式下 localStorage 不可用，忽略 */
    }

    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var isDark =
        currentTheme() === "dark" ||
        (!currentTheme() &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
      btn.setAttribute("aria-label", next === "dark" ? "切换到浅色模式" : "切换到深色模式");
    });
  }

  /* ---------- 代码块复制 -------------------------------------------- */
  function initCopy() {
    var blocks = document.querySelectorAll(".article pre");
    if (!blocks.length || !navigator.clipboard) return;

    Array.prototype.forEach.call(blocks, function (pre) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "复制";
      pre.appendChild(btn);

      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = (code ? code.textContent : pre.textContent) || "";
        navigator.clipboard.writeText(text).then(
          function () {
            btn.textContent = "已复制";
            btn.classList.add("is-done");
            setTimeout(function () {
              btn.textContent = "复制";
              btn.classList.remove("is-done");
            }, 1800);
          },
          function () {
            btn.textContent = "复制失败";
          }
        );
      });
    });
  }

  /* ---------- 页脚年份 ---------------------------------------------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- 启动 ------------------------------------------------- */
  function boot() {
    initTheme();
    initCopy();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
