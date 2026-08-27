document$.subscribe(function () {
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