(function () {
  var input = document.getElementById("search-q");
  var resultsEl = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  if (!input || !resultsEl || typeof elasticlunr === "undefined") return;

  var idx = elasticlunr.Index.load(window.searchIndex);
  var params = new URLSearchParams(window.location.search);
  var initial = params.get("q") || "";
  input.value = initial;

  function run(q) {
    resultsEl.innerHTML = "";
    if (!q || !q.trim()) {
      status.textContent = "";
      return;
    }
    var res = idx.search(q, { bool: "AND", expand: true });
    status.textContent = res.length + " result" + (res.length === 1 ? "" : "s");
    res.slice(0, 30).forEach(function (r) {
      var doc = idx.documentStore.getDoc(r.ref);
      var li = document.createElement("li");
      var h = document.createElement("h3");
      var a = document.createElement("a");
      a.href = r.ref;
      a.textContent = doc.title;
      h.appendChild(a);
      li.appendChild(h);
      if (doc.body) {
        var p = document.createElement("p");
        p.className = "meta";
        p.textContent = doc.body.slice(0, 160) + (doc.body.length > 160 ? "…" : "");
        li.appendChild(p);
      }
      resultsEl.appendChild(li);
    });
  }

  input.addEventListener("input", function () {
    run(input.value);
    var url = new URL(window.location.href);
    if (input.value) url.searchParams.set("q", input.value);
    else url.searchParams.delete("q");
    history.replaceState(null, "", url);
  });

  run(initial);
})();
