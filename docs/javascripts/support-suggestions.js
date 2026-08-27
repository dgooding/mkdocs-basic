document$.subscribe(function () {
  const view = document.querySelector("[data-suggestions-view]")
  if (!view) return

  const list = view.querySelector("[data-suggestions-list]")
  const status = view.querySelector("[data-suggestions-status]")
  const form = document.querySelector("[data-suggestion-form]")
  const exportButton = document.querySelector("[data-suggestion-export]")
  const endpoint = "https://api.github.com/repos/dgooding/mkdocs-basic/issues?labels=feature-request&state=open&per_page=50"
  const localStorageKey = "itsd-suggestions"
  let sharedIssues = []
  let localSuggestions = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  const exampleSuggestions = [
    { title: "Add a searchable FAQ for common support questions", details: "Example suggestion | Shared support idea" },
    { title: "Add a quick reference for escalation paths", details: "Example suggestion | Shared support idea" },
    { title: "Add document owners and review dates", details: "Example suggestion | Shared support idea" },
    { title: "Add a printable troubleshooting checklist", details: "Example suggestion | Shared support idea" },
  ]

  function renderSuggestion(suggestion) {
    const item = document.createElement("article")
    item.className = "itsd-suggestion"

    const content = document.createElement("div")
    content.className = "itsd-suggestion-content"

    const title = document.createElement("h3")
    if (suggestion.url) {
      const titleLink = document.createElement("a")
      titleLink.href = suggestion.url
      titleLink.target = "_blank"
      titleLink.rel = "noopener"
      titleLink.textContent = suggestion.title
      title.append(titleLink)
    } else {
      title.textContent = suggestion.title
    }

    const details = document.createElement("p")
    details.textContent = suggestion.details
    content.append(title, details)

    item.append(content)
    return item
  }

  function render() {
    const suggestions = localSuggestions.concat(sharedIssues)
    const visibleSuggestions = suggestions.length ? suggestions : exampleSuggestions
    status.textContent = visibleSuggestions.length + " suggestion" + (visibleSuggestions.length === 1 ? "" : "s")
    list.replaceChildren(...visibleSuggestions.map(renderSuggestion))
  }

  function exportSuggestions() {
    const suggestions = localSuggestions.concat(sharedIssues)
    const exportSuggestions = suggestions.length ? suggestions : exampleSuggestions
    const lines = exportSuggestions.map(function (suggestion) {
      return suggestion.title + "\r\n" + suggestion.details + "\r\n"
    })
    const blob = new Blob([lines.join("\r\n") || "No suggestions have been submitted yet.\r\n"], { type: "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "itsd-feature-suggestions.txt"
    link.click()
    URL.revokeObjectURL(link.href)
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault()
    const data = new FormData(form)
    localSuggestions.unshift({
      title: data.get("text"),
      details: "Suggested by " + data.get("name") + " | Local browser suggestion",
      created: new Date().toISOString(),
    })
    localStorage.setItem(localStorageKey, JSON.stringify(localSuggestions))
    form.reset()
    render()
  })
  exportButton.addEventListener("click", exportSuggestions)

  fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("Unable to load suggestions")
      return response.json()
    })
    .then(function (issues) {
      sharedIssues = issues.map(function (issue) {
        return { title: issue.title, details: "Suggested by " + issue.user.login + " | " + issue.comments + " comments", url: issue.html_url }
      })
      render()
    })
    .catch(function () {
      sharedIssues = []
      render()
    })

  render()
})
