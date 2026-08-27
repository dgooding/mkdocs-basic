document$.subscribe(function () {
  const view = document.querySelector("[data-suggestions-view]")
  if (!view) return

  const list = view.querySelector("[data-suggestions-list]")
  const status = view.querySelector("[data-suggestions-status]")
  const form = document.querySelector("[data-suggestion-form]")
  const exportButton = document.querySelector("[data-suggestion-export]")
  const endpoint = "https://api.github.com/repos/dgooding/mkdocs-basic/issues?labels=feature-request&state=open&per_page=50"
  const localStorageKey = "itsd-suggestions"
  const votesStorageKey = "itsd-suggestion-votes"
  let sharedIssues = []
  let localSuggestions = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let votes = JSON.parse(localStorage.getItem(votesStorageKey) || "{}")
  localSuggestions = localSuggestions.map(function (suggestion, index) {
    return Object.assign({ id: "local-existing-" + index }, suggestion)
  })
  const exampleSuggestions = [
    { id: "example-faq", category: "Feature request", title: "Add a searchable FAQ for common support questions", details: "Example suggestion | Shared support idea" },
    { id: "example-escalation", category: "Problem", title: "Add a quick reference for escalation paths", details: "Example suggestion | Shared support idea" },
    { id: "example-owners", category: "Documentation", title: "Add document owners and review dates", details: "Example suggestion | Shared support idea" },
    { id: "example-checklist", category: "UI fix", title: "Add a printable troubleshooting checklist", details: "Example suggestion | Shared support idea" },
    { id: "example-hours", category: "Question", title: "Add service hours and response expectations", details: "Example suggestion | Shared support idea" },
    { id: "example-recurring", category: "Issue", title: "Add a guide for reporting recurring incidents", details: "Example suggestion | Shared support idea" },
    { id: "example-glossary", category: "Documentation", title: "Add a glossary of common ITSD terms", details: "Example suggestion | Shared support idea" },
    { id: "example-history", category: "Feature request", title: "Add version history to every document", details: "Example suggestion | Shared support idea" },
    { id: "example-onboarding", category: "Feature request", title: "Add a checklist for new team members", details: "Example suggestion | Shared support idea" },
    { id: "example-quick-start", category: "Documentation", title: "Add printable quick-start guides", details: "Example suggestion | Shared support idea" },
    { id: "example-notes", category: "Problem", title: "Add examples of well-written ticket notes", details: "Example suggestion | Shared support idea" },
    { id: "example-known-issues", category: "Issue", title: "Add a page for known service issues", details: "Example suggestion | Shared support idea" },
    { id: "example-categories", category: "UI fix", title: "Add document categories and filters", details: "Example suggestion | Shared support idea" },
    { id: "example-summary", category: "Feature request", title: "Add a monthly documentation update summary", details: "Example suggestion | Shared support idea" },
    { id: "example-status", category: "Issue", title: "Add service status updates to the home page", details: "Example suggestion | Shared support idea" },
    { id: "example-templates", category: "Feature request", title: "Add reusable ticket response templates", details: "Example suggestion | Shared support idea" },
    { id: "example-search-tips", category: "Question", title: "Add search tips for finding older documents", details: "Example suggestion | Shared support idea" },
    { id: "example-contact", category: "Question", title: "Add contact details for specialist support teams", details: "Example suggestion | Shared support idea" },
    { id: "example-ownership", category: "Problem", title: "Add a way to flag outdated documentation", details: "Example suggestion | Shared support idea" },
    { id: "example-print", category: "UI fix", title: "Add printer-friendly versions of key procedures", details: "Example suggestion | Shared support idea" },
    { id: "example-attachments", category: "Documentation", title: "Add related-document links to each procedure", details: "Example suggestion | Shared support idea" },
    { id: "example-feedback", category: "Accessibility", title: "Add a simple feedback prompt to document pages", details: "Example suggestion | Shared support idea" },
    { id: "example-calendar", category: "Feature request", title: "Add a calendar of planned maintenance windows", details: "Example suggestion | Shared support idea" },
    { id: "example-requests", category: "Issue", title: "Add a simple documentation change request workflow", details: "Example suggestion | Shared support idea" },
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
    details.textContent = (suggestion.category || "Suggestion") + " | " + suggestion.details
    content.append(title, details)

    const vote = document.createElement("button")
    vote.className = "itsd-suggestion-vote"
    vote.type = "button"
    vote.setAttribute("aria-label", "Upvote " + suggestion.title)
    vote.innerHTML = "<strong>Upvote</strong><span>" + (votes[suggestion.id] || 0) + "</span>"
    vote.addEventListener("click", function () {
      votes[suggestion.id] = (votes[suggestion.id] || 0) + 1
      localStorage.setItem(votesStorageKey, JSON.stringify(votes))
      render()
    })
    item.append(content, vote)
    return item
  }

  function render() {
    const suggestions = localSuggestions.concat(sharedIssues)
    const visibleSuggestions = suggestions.length ? suggestions : exampleSuggestions
    status.textContent = visibleSuggestions.length + " suggestion" + (visibleSuggestions.length === 1 ? "" : "s")
    const groups = new Map()
    visibleSuggestions.forEach(function (suggestion) {
      const category = suggestion.category || "Other"
      if (!groups.has(category)) groups.set(category, [])
      groups.get(category).push(suggestion)
    })
    list.replaceChildren(...Array.from(groups, function (entry, index) {
      const section = document.createElement("details")
      section.className = "itsd-suggestion-group"
      section.open = index === 0
      const heading = document.createElement("summary")
      heading.textContent = entry[0] + " (" + entry[1].length + ")"
      section.append(heading, ...entry[1].map(renderSuggestion))
      return section
    }))
  }

  function exportSuggestions() {
    const suggestions = localSuggestions.concat(sharedIssues)
    const exportSuggestions = suggestions.length ? suggestions : exampleSuggestions
    const lines = exportSuggestions.map(function (suggestion) {
      return (suggestion.category || "Other") + "\r\n" + suggestion.title + "\r\n" + suggestion.details + "\r\n"
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
      id: "local-" + Date.now(),
      title: data.get("text"),
      category: data.get("category"),
      details: "Local browser suggestion",
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
        return { id: "issue-" + issue.number, title: issue.title, category: "Shared suggestion", details: issue.comments + " comments", url: issue.html_url }
      })
      render()
    })
    .catch(function () {
      sharedIssues = []
      render()
    })

  render()
})
