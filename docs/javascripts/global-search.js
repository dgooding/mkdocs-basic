document$.subscribe(function () {
  const article = document.querySelector(".md-content article")
  if (article && !document.querySelector(".itsd-global-search") && !document.querySelector(".itsd-search-workspace") && !document.querySelector(".itsd-home-search")) {
    const panel = document.createElement("form")
    panel.className = "itsd-global-search"
    panel.action = new URL("search.html", document.baseURI).href
    panel.method = "get"
    panel.innerHTML = "<label for=\"itsd-global-search-input\">Search the knowledge base</label><div><input id=\"itsd-global-search-input\" name=\"q\" type=\"search\" placeholder=\"Search documents and guidance\" autocomplete=\"off\"><button class=\"md-button md-button--primary\" type=\"submit\">Search</button></div>"
    article.prepend(panel)
  }

  const searchInput = document.querySelector('[data-md-component="search-query"]') || document.querySelector('.md-header input[type="search"]')
  if (!searchInput || searchInput.dataset.resultsPageBound) return

  searchInput.dataset.resultsPageBound = "true"
  searchInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" || !searchInput.value.trim()) return
    event.preventDefault()
    event.stopImmediatePropagation()
    const url = new URL("search.html", document.baseURI)
    url.searchParams.set("q", searchInput.value.trim())
    location.assign(url)
  }, true)
})