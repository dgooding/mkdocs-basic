document$.subscribe(function () {
  const view = document.querySelector("[data-suggestions-view]")
  if (!view) return

  const list = view.querySelector("[data-suggestions-list]")
  const status = view.querySelector("[data-suggestions-status]")
  const dateFilter = view.querySelector("[data-suggestion-date]")
  const statusFilter = view.querySelector("[data-suggestion-status]")
  const categoryFilter = view.querySelector("[data-suggestion-filter-category]")
  const keywordFilter = view.querySelector("[data-suggestion-keyword]")
  const resetFilters = view.querySelector("[data-suggestions-reset]")
  const form = document.querySelector("[data-suggestion-form]")
  const exportButton = document.querySelector("[data-suggestion-export]")
  const endpoint = "https://api.github.com/repos/dgooding/mkdocs-basic/issues?labels=feature-request&state=open&per_page=50"
  const votesStorageKey = "itsd-suggestion-votes"
  const votedStorageKey = "itsd-suggestion-voted"
  const statusesStorageKey = "itsd-suggestion-statuses"
  let sharedIssues = []
  let votes = JSON.parse(localStorage.getItem(votesStorageKey) || "{}")
  let voted = JSON.parse(localStorage.getItem(votedStorageKey) || "{}")
  let statuses = JSON.parse(localStorage.getItem(statusesStorageKey) || "{}")
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

  function formatCreatedDate(created) {
    if (!created) return ""
    const date = new Date(created)
    return isNaN(date.getTime()) ? "" : " | Posted " + date.toLocaleString()
  }

  function renderSuggestion(suggestion) {
    const item = document.createElement("article")
    item.className = "itsd-suggestion"

    const vote = document.createElement("button")
    vote.className = "itsd-suggestion-vote"
    vote.type = "button"
    const hasVoted = voted[suggestion.id] === true
    vote.setAttribute("aria-label", hasVoted ? "Upvoted " + suggestion.title : "Upvote " + suggestion.title)
    vote.setAttribute("aria-pressed", String(hasVoted))
    vote.disabled = hasVoted
    vote.innerHTML = "<span aria-hidden=\"true\">&uarr;</span><strong>" + (votes[suggestion.id] || 0) + "</strong>"
    vote.addEventListener("click", function () {
      if (voted[suggestion.id]) return
      votes[suggestion.id] = (votes[suggestion.id] || 0) + 1
      voted[suggestion.id] = true
      localStorage.setItem(votesStorageKey, JSON.stringify(votes))
      localStorage.setItem(votedStorageKey, JSON.stringify(voted))
      render()
    })

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
    details.textContent = (suggestion.category || "Suggestion") + " | " + suggestion.details + formatCreatedDate(suggestion.created)
    content.append(title, details)

    const actions = document.createElement("div")
    actions.className = "itsd-suggestion-controls"
    const statusButton = document.createElement("button")
    statusButton.className = "itsd-suggestion-status"
    statusButton.type = "button"
    const isComplete = (statuses[suggestion.id] || suggestion.status) === "complete"
    statusButton.setAttribute("aria-label", isComplete ? "Mark suggestion as pending" : "Mark suggestion as complete")
    statusButton.title = statusButton.getAttribute("aria-label")
    statusButton.innerHTML = isComplete ? "<span aria-hidden=\"true\">&#10003;</span> Complete" : "<span aria-hidden=\"true\">&#9675;</span> Pending"
    statusButton.addEventListener("click", function () {
      const nextStatus = isComplete ? "pending" : "complete"
      statuses[suggestion.id] = nextStatus
      localStorage.setItem(statusesStorageKey, JSON.stringify(statuses))
      suggestion.status = nextStatus
      render()
    })
    actions.append(statusButton)
    item.append(vote, content, actions)
    return item
  }

  function render() {
    const openCategories = new Set(Array.from(list.querySelectorAll("details[open] summary"), function (heading) {
      return heading.textContent.replace(/ \(\d+\)$/, "")
    }))
    const allSuggestions = exampleSuggestions.concat(sharedIssues)
    const visibleSuggestions = allSuggestions.filter(function (suggestion) {
      const currentStatus = (statuses[suggestion.id] || suggestion.status || "pending")
      const matchesStatus = !statusFilter.value || currentStatus === statusFilter.value
      const matchesCategory = !categoryFilter.value || (suggestion.category || "Other") === categoryFilter.value
      const matchesDate = !dateFilter.value || (suggestion.created && suggestion.created.indexOf(dateFilter.value) === 0)
      const searchText = keywordFilter.value.trim().toLowerCase()
      const matchesKeyword = !searchText || (suggestion.title + " " + (suggestion.details || "")).toLowerCase().indexOf(searchText) !== -1
      return matchesStatus && matchesCategory && matchesDate && matchesKeyword
    })
    status.textContent = visibleSuggestions.length + " suggestion" + (visibleSuggestions.length === 1 ? "" : "s")
    const recentCutoff = Date.now() - (4 * 24 * 60 * 60 * 1000)
    const recentSuggestions = visibleSuggestions.filter(function (suggestion) {
      return suggestion.created && new Date(suggestion.created).getTime() >= recentCutoff
    })
    const olderSuggestions = visibleSuggestions.filter(function (suggestion) {
      return !recentSuggestions.includes(suggestion)
    })
    const resultElements = []
    if (recentSuggestions.length) {
      const recentSection = document.createElement("section")
      recentSection.className = "itsd-recent-suggestions"
      const recentHeading = document.createElement("h3")
      recentHeading.textContent = "Recent suggestions"
      recentSection.append(recentHeading, ...recentSuggestions.map(renderSuggestion))
      resultElements.push(recentSection)
    }
    const groups = new Map()
    olderSuggestions.forEach(function (suggestion) {
      const category = suggestion.category || "Other"
      if (!groups.has(category)) groups.set(category, [])
      groups.get(category).push(suggestion)
    })
    const groupElements = Array.from(groups, function (entry) {
      const section = document.createElement("details")
      section.className = "itsd-suggestion-group"
      const heading = document.createElement("summary")
      heading.textContent = entry[0] + " (" + entry[1].length + ")"
      section.open = openCategories.has(entry[0])
      section.append(heading, ...entry[1].map(renderSuggestion))
      return section
    })
    resultElements.push(...groupElements)
    if (!resultElements.length) {
      const emptyState = document.createElement("p")
      emptyState.className = "itsd-suggestions-empty"
      emptyState.textContent = "No suggestions match these filters."
      resultElements.push(emptyState)
    }
    list.replaceChildren(...resultElements)
  }

  function exportSuggestions() {
    const exportSuggestions = exampleSuggestions.concat(sharedIssues)
    const escapeCsvValue = function (value) {
      return '"' + String(value || "").replace(/"/g, '""') + '"'
    }
    const lines = [["Category", "Suggestion", "Details", "Status", "Votes", "Created", "Source", "Link"]]
    exportSuggestions.forEach(function (suggestion) {
      const source = suggestion.id.indexOf("issue-") === 0 ? "GitHub" : "Example"
      lines.push([
        suggestion.category || "Other",
        suggestion.title,
        suggestion.details || "",
        statuses[suggestion.id] || suggestion.status || "pending",
        votes[suggestion.id] || 0,
        suggestion.created || "",
        source,
        suggestion.url || "",
      ])
    })
    const csv = "\uFEFF" + lines.map(function (line) {
      return line.map(escapeCsvValue).join(",")
    }).join("\r\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "itsd-feature-suggestions.csv"
    link.style.display = "none"
    document.body.append(link)
    link.click()
    setTimeout(function () {
      URL.revokeObjectURL(link.href)
      link.remove()
    }, 0)
  }

  function playShredderSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    try {
      const audioContext = new AudioContext()
      const now = audioContext.currentTime
      const duration = 0.45
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate)
      const noiseData = noiseBuffer.getChannelData(0)
      for (let index = 0; index < noiseData.length; index += 1) {
        noiseData[index] = Math.random() * 2 - 1
      }
      const noise = audioContext.createBufferSource()
      const noiseFilter = audioContext.createBiquadFilter()
      const noiseGain = audioContext.createGain()
      noise.buffer = noiseBuffer
      noiseFilter.type = "bandpass"
      noiseFilter.frequency.setValueAtTime(1200, now)
      noiseFilter.frequency.exponentialRampToValueAtTime(3200, now + duration)
      noiseGain.gain.setValueAtTime(0.001, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.16, now + 0.04)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration)
      noise.connect(noiseFilter).connect(noiseGain).connect(audioContext.destination)
      noise.start(now)
      noise.stop(now + duration)

      const motor = audioContext.createOscillator()
      const motorGain = audioContext.createGain()
      motor.type = "sawtooth"
      motor.frequency.setValueAtTime(95, now)
      motor.frequency.exponentialRampToValueAtTime(38, now + duration)
      motorGain.gain.setValueAtTime(0.001, now)
      motorGain.gain.exponentialRampToValueAtTime(0.035, now + 0.03)
      motorGain.gain.exponentialRampToValueAtTime(0.001, now + duration)
      motor.connect(motorGain).connect(audioContext.destination)
      motor.start(now)
      motor.stop(now + duration)
      motor.addEventListener("ended", function () { audioContext.close() })
    } catch (error) {
      return
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault()
    const data = new FormData(form)
    const issueUrl = new URL("https://github.com/dgooding/mkdocs-basic/issues/new")
    issueUrl.searchParams.set("template", "feature_request.md")
    issueUrl.searchParams.set("title", data.get("category") + ": " + data.get("text"))
    issueUrl.searchParams.set("body", "## Category\n\n" + data.get("category") + "\n\n## Suggestion\n\n" + data.get("text"))
    window.open(issueUrl.toString(), "_blank", "noopener")
    form.reset()
  })
  exportButton.addEventListener("click", exportSuggestions)
  ;[dateFilter, statusFilter, categoryFilter, keywordFilter].forEach(function (filter) {
    filter.addEventListener("input", render)
  })
  resetFilters.addEventListener("click", function () {
    dateFilter.value = ""
    statusFilter.value = ""
    categoryFilter.value = ""
    keywordFilter.value = ""
    render()
  })

  fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("Unable to load suggestions")
      return response.json()
    })
    .then(function (issues) {
      sharedIssues = issues.map(function (issue) {
        return { id: "issue-" + issue.number, title: issue.title, category: "Shared suggestion", details: issue.comments + " comments", url: issue.html_url, created: issue.created_at }
      })
      render()
    })
    .catch(function () {
      sharedIssues = []
      render()
    })

  render()
})
