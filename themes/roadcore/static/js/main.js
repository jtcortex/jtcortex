(function () {
  var btn = document.getElementById("menu-btn");
  var list = document.getElementById("menu-list");
  if (btn && list) {
    list.classList.add("menu__list--transition");
    btn.addEventListener("click", function () {
      var open = list.classList.toggle("menu__list--active");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.classList.toggle("menu__btn--active", open);
    });
  }

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    function isLight() {
      return document.documentElement.getAttribute("data-theme") === "light";
    }
    function label() {
      toggle.textContent = isLight() ? "Mocha" : "Latte";
    }
    label();
    toggle.addEventListener("click", function () {
      if (isLight()) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "mocha");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      label();
    });
  }

  var roots = document.querySelectorAll(".content");
  roots.forEach(function (root) {
    root.querySelectorAll("pre").forEach(function (pre) {
      if (pre.parentElement && pre.parentElement.classList.contains("code-block")) return;
      var wrap = document.createElement("div");
      wrap.className = "code-block";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var copy = document.createElement("button");
      copy.type = "button";
      copy.className = "code-block__copy";
      copy.textContent = "Copy";
      copy.setAttribute("aria-label", "Copy code");
      wrap.appendChild(copy);

      copy.addEventListener("click", function () {
        var text = pre.innerText || pre.textContent || "";
        function done(ok) {
          copy.textContent = ok ? "Copied" : "Failed";
          setTimeout(function () {
            copy.textContent = "Copy";
          }, 1400);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            done(true);
          }).catch(function () {
            done(false);
          });
        } else {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          try {
            done(document.execCommand("copy"));
          } catch (e) {
            done(false);
          }
          document.body.removeChild(ta);
        }
      });
    });
  });
})();
