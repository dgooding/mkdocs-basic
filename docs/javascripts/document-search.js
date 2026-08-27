document$.subscribe(function () {
  const workspace = document.querySelector("[data-document-search-view]")
  if (!workspace) return

  const query = document.querySelector("#document-search-query")
  const summary = document.querySelector("[data-document-search-summary]")
  const results = document.querySelector("[data-document-search-results]")
  const reader = document.querySelector("[data-document-search-reader]")
  let searchDocuments = []

  document.body.classList.add("itsd-search-page")
  const materialSearchToggle = document.querySelector('[data-md-toggle="search"]')
  if (materialSearchToggle) {
    materialSearchToggle.checked = false
  }

  function stripHtml(value) {
    const element = document.createElement("div")
    element.innerHTML = value || ""
    return element.textContent.replace(/\s+/g, " ").trim()
  }

  function normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "")
  }

  function editDistance(first, second) {
    const previous = Array.from({ length: second.length + 1 }, function (_, index) { return index })
    for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
      const current = [firstIndex]
      for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
        const substitution = previous[secondIndex - 1] + (first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1)
        current.push(Math.min(current[secondIndex - 1] + 1, previous[secondIndex] + 1, substitution))
      }
      previous.splice(0, previous.length, ...current)
    }
    return previous[second.length]
  }

  function fuzzyTitleScore(title, term) {
    const normalizedTerm = normalize(term)
    if (normalizedTerm.length < 3) return 0
    const words = title.toLowerCase().split(/\s+/).filter(Boolean)
    return Math.max.apply(null, words.map(function (word) {
      const normalizedWord = normalize(word)
      if (!normalizedWord) return 0
      if (normalizedWord.includes(normalizedTerm) || normalizedTerm.includes(normalizedWord)) return 150
      const distance = editDistance(normalizedTerm, normalizedWord)
      const tolerance = normalizedTerm.length >= 7 ? 2 : 1
      return distance <= tolerance ? 140 - distance * 20 : 0
    })) || 0
  }

  function score(item, terms) {
    const title = item.title.toLowerCase()
    const text = stripHtml(item.text).toLowerCase()
    return terms.reduce(function (total, term) {
      return total + (title.includes(term) ? 100 : fuzzyTitleScore(title, term)) + (text.split(term).length - 1)
    }, 0)
  }

  function excerpt(item, terms) {
    const text = stripHtml(item.text)
    const lowercase = text.toLowerCase()
    const position = terms.map(function (term) { return lowercase.indexOf(term) }).find(function (index) { return index >= 0 })
    if (position === undefined) return "Title match"
    const start = Math.max(0, position - 70)
    const end = Math.min(text.length, position + 170)
    return (start ? "..." : "") + text.slice(start, end) + (end < text.length ? "..." : "")
  }

  function openResult(item, button) {
    results.querySelectorAll("button").forEach(function (entry) {
      entry.setAttribute("aria-pressed", String(entry === button))
    })
    if (item.type === "PDF") {
      reader.replaceChildren()
      const heading = document.createElement("h2")
      heading.textContent = item.title
      const text = document.createElement("p")
      text.textContent = "PDF documents open in a separate tab."
      const link = document.createElement("a")
      link.className = "md-button md-button--primary"
      link.href = item.location
      link.target = "_blank"
      link.rel = "noopener"
      link.textContent = "Open PDF"
      reader.append(heading, text, link)
      return
    }

    reader.textContent = "Loading document..."
    fetch(item.location)
      .then(function (response) {
        if (!response.ok) throw new Error("Unable to load document")
        return response.text()
      })
      .then(function (html) {
        const parsed = new DOMParser().parseFromString(html, "text/html")
        const content = parsed.querySelector("article .md-content__inner") || parsed.querySelector("article")
        reader.replaceChildren()
        if (!content) throw new Error("Document content not found")
        reader.append(...content.cloneNode(true).childNodes)
      })
      .catch(function () {
        reader.textContent = "Unable to load this document. Use the document link instead."
      })
  }

  function render() {
    const terms = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!terms.length) {
      summary.textContent = "Enter a search term."
      results.replaceChildren()
      reader.innerHTML = "<p>Choose a result to read it here.</p>"
      return
    }
    const matches = searchDocuments
      .map(function (item) { return { item, score: score(item, terms) } })
      .filter(function (entry) { return entry.score > 0 })
      .sort(function (first, second) { return second.score - first.score || first.item.title.localeCompare(second.item.title) })
      .slice(0, 30)

    summary.textContent = matches.length ? matches.length + " matching documents" : "No matching documents"
    results.replaceChildren(...matches.map(function (entry, index) {
      const item = entry.item
      const button = document.createElement("button")
      button.type = "button"
      button.className = "itsd-search-result"
      button.setAttribute("aria-pressed", "false")
      const title = document.createElement("strong")
      title.textContent = item.title
      const meta = document.createElement("span")
      meta.textContent = index === 0 ? "Best match" : item.type
      const detail = document.createElement("small")
      detail.textContent = excerpt(item, terms)
      button.append(title, meta, detail)
      button.addEventListener("click", function () { openResult(item, button) })
      return button
    }))
    reader.innerHTML = "<p>Choose a result to read it here.</p>"
  }

  query.addEventListener("input", render)

  Promise.all([
    fetch(new URL("search/search_index.json", document.baseURI)).then(function (response) { return response.json() }),
    fetch(new URL("assets/document-library.json", document.baseURI)).then(function (response) { return response.json() }),
  ])
    .then(function (data) {
      const index = data[0].docs
      const library = data[1]
      const libraryByUrl = new Map(library.map(function (item) { return [item.url, item] }))
      searchDocuments = index
        .filter(function (item) {
          return libraryByUrl.has(decodeURIComponent(item.location.split("#")[0]))
        })
        .map(function (item) {
          const libraryItem = libraryByUrl.get(decodeURIComponent(item.location.split("#")[0]))
          return { title: item.title, text: item.text, type: libraryItem.type, location: item.location }
        })
      library.filter(function (item) { return item.type === "PDF" }).forEach(function (item) {
        searchDocuments.push({ title: item.name, text: "", type: item.type, location: encodeURI(item.url) })
      })
      const requestedQuery = new URLSearchParams(location.search).get("q")
      if (requestedQuery) {
        query.value = requestedQuery
        render()
      }
    })
    .catch(function () {
      summary.textContent = "Search is unavailable right now."
    })
})