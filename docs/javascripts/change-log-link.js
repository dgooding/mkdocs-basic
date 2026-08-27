document$.subscribe(function () {
  const themeToggle = document.querySelector('[data-md-component="palette"]')
  const repositoryLink = document.querySelector('.md-header a[href="https://github.com/dgooding/mkdocs-basic"]')
  if (!themeToggle || !repositoryLink) return

  let link = document.querySelector("[data-itsd-change-log-link]")
  if (!link) {
    link = document.createElement("a")
    link.href = new URL("change-log.html", document.baseURI)
    link.className = "itsd-change-log-link"
    link.dataset.itsdChangeLogLink = "true"
    link.setAttribute("aria-label", "Open project change log")
    link.title = "Project change log"
    link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h11v2H4z"/></svg>'
  }

  let tools = document.querySelector("[data-itsd-header-tools]")
  if (!tools) {
    tools = document.createElement("div")
    tools.className = "itsd-header-tools"
    tools.dataset.itsdHeaderTools = "true"
    repositoryLink.insertAdjacentElement("afterend", tools)
  }
  tools.append(themeToggle, link)
})