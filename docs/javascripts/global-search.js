document$.subscribe(function () {
  const searchInput = document.querySelector('[data-md-component="search-query"]') || document.querySelector('.md-header input[type="search"]')
  if (!searchInput || searchInput.dataset.resultsPageBound || document.querySelector("[data-document-search-view]")) return

  searchInput.dataset.resultsPageBound = "true"

  function openSearchResults() {
    const value = searchInput.value.trim()
    if (!value) return
    const url = new URL("search.html", document.baseURI)
    url.searchParams.set("q", value)
    location.assign(url)
  }

  searchInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" || !searchInput.value.trim()) return
    event.preventDefault()
    event.stopImmediatePropagation()
    openSearchResults()
  }, true)
})