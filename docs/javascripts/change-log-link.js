document$.subscribe(function () {
  if (document.querySelector("[data-itsd-change-log-link]")) return

  const themeToggle = document.querySelector('[data-md-component="palette"]')
  if (!themeToggle) return

  const link = document.createElement("a")
  link.href = new URL("change-log.html", document.baseURI)
  link.className = "itsd-change-log-link"
  link.dataset.itsdChangeLogLink = "true"
  link.setAttribute("aria-label", "Open project change log")
  link.title = "Project change log"
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h11v2H4z"/></svg>'
  themeToggle.insertAdjacentElement("afterend", link)
})