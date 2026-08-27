document$.subscribe(function () {
  const view = document.querySelector("[data-suggestions-view]")
  if (!view) return

  const list = view.querySelector("[data-suggestions-list]")
  const status = view.querySelector("[data-suggestions-status]")
  const endpoint = "https://api.github.com/repos/dgooding/mkdocs-basic/issues?labels=feature-request&state=open&per_page=50"

  function renderIssue(issue) {
    const item = document.createElement("article")
    item.className = "itsd-suggestion"

    const content = document.createElement("div")
    content.className = "itsd-suggestion-content"

    const title = document.createElement("h3")
    const titleLink = document.createElement("a")
    titleLink.href = issue.html_url
    titleLink.target = "_blank"
    titleLink.rel = "noopener"
    titleLink.textContent = issue.title
    title.append(titleLink)

    const details = document.createElement("p")
    details.textContent = "Suggested by " + issue.user.login + " | " + issue.comments + " comments"
    content.append(title, details)

    const vote = document.createElement("a")
    vote.className = "itsd-suggestion-vote"
    vote.href = issue.html_url
    vote.target = "_blank"
    vote.rel = "noopener"
    vote.setAttribute("aria-label", "Vote +1 for " + issue.title + " on GitHub")
    vote.innerHTML = "<strong>+1</strong><span>" + issue.reactions["+1"] + "</span>"
    item.append(content, vote)
    return item
  }

  fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("Unable to load suggestions")
      return response.json()
    })
    .then(function (issues) {
      status.textContent = issues.length ? issues.length + " open suggestion" + (issues.length === 1 ? "" : "s") : "No suggestions yet"
      if (!issues.length) {
        list.innerHTML = "<p>No feature suggestions have been submitted yet.</p>"
        return
      }
      list.replaceChildren(...issues.map(renderIssue))
    })
    .catch(function () {
      status.textContent = "Suggestions are unavailable right now"
      list.innerHTML = "<p>Open the suggestions list on GitHub to view or submit ideas.</p>"
    })
})
