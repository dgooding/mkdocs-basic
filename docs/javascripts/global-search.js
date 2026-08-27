document$.subscribe(function () {
  const searchInput = document.querySelector('[data-md-component="search-query"]') || document.querySelector('.md-header input[type="search"]')
  if (!searchInput) return

  if (!searchInput.dataset.resultsPageBound) {
    searchInput.dataset.resultsPageBound = "true"
    searchInput.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" || !searchInput.value.trim()) return
      event.preventDefault()
      event.stopImmediatePropagation()
      const url = new URL("search.html", document.baseURI)
      url.searchParams.set("q", searchInput.value.trim())
      location.assign(url)
    }, true)
  }

  if (document.querySelector("[data-itsd-profile-link]")) return
  const repositoryLink = document.querySelector('.md-header a[href="https://github.com/dgooding/mkdocs-basic"]')
  if (!repositoryLink) return
  const profileLink = document.createElement("a")
  profileLink.href = "https://github.com/dgooding"
  profileLink.className = "itsd-profile-link"
  profileLink.dataset.itsdProfileLink = "true"
  profileLink.textContent = "dgooding"
  profileLink.setAttribute("aria-label", "Open dgooding on GitHub")
  repositoryLink.insertAdjacentElement("afterend", profileLink)
})