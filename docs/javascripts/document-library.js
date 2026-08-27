document$.subscribe(function () {
  const results = document.querySelector("[data-document-library-results]")
  if (!results) return

  const search = document.querySelector("#document-library-search")
  const category = document.querySelector("#document-library-category")
  const sort = document.querySelector("#document-library-sort")
  const filters = [...document.querySelectorAll("[data-document-type]")]
  const summary = document.querySelector("[data-document-library-summary]")
  const pagination = document.querySelector("[data-document-library-pagination]")
  const pageSize = 25
  let documents = []
  let activeType = "all"
  let activeCategory = "all"
  let page = 1

  function render() {
    const query = search.value.trim().toLowerCase()
    const visible = documents
      .filter(function (item) {
        return (activeType === "all" || item.typeKey === activeType) && (activeCategory === "all" || (item.category || "Other") === activeCategory) && item.name.toLowerCase().includes(query)
      })
      .sort(function (first, second) {
        const firstValue = sort.value === "type" ? first.type + first.name : sort.value === "category" ? (first.category || "Other") + first.name : first.name
        const secondValue = sort.value === "type" ? second.type + second.name : sort.value === "category" ? (second.category || "Other") + second.name : second.name
        return firstValue.localeCompare(secondValue)
      })
    const totalPages = Math.max(1, Math.ceil(visible.length / pageSize))
    page = Math.min(page, totalPages)
    const visiblePage = visible.slice((page - 1) * pageSize, page * pageSize)

    summary.textContent = visible.length === documents.length
      ? visible.length + (visible.length === 1 ? " document" : " documents")
      : "Showing " + visible.length + " of " + documents.length + " documents"
    const rows = visiblePage.map(function (item) {
      const row = document.createElement("tr")
      const documentCell = document.createElement("td")
      const link = document.createElement("a")
      link.href = item.url.split("/").map(encodeURIComponent).join("/")
      link.textContent = item.name
      documentCell.append(link)
      const typeCell = document.createElement("td")
      typeCell.textContent = item.type
      const categoryCell = document.createElement("td")
      categoryCell.textContent = item.category || "Other"
      const actionsCell = document.createElement("td")
      const deleteLink = document.createElement("a")
      deleteLink.className = "itsd-document-delete"
      deleteLink.href = "https://github.com/dgooding/mkdocs-basic/delete/main/docs/" + item.path.split("/").map(encodeURIComponent).join("/")
      deleteLink.target = "_blank"
      deleteLink.rel = "noopener"
      deleteLink.textContent = "Delete on GitHub"
      deleteLink.addEventListener("click", function (event) {
        if (!window.confirm("Open GitHub to review and commit the deletion of '" + item.name + "'?")) event.preventDefault()
      })
      actionsCell.append(deleteLink)
      row.append(documentCell, categoryCell, typeCell, actionsCell)
      return row
    })
    if (!rows.length) {
      const row = document.createElement("tr")
      const cell = document.createElement("td")
      cell.className = "itsd-library-empty"
      cell.colSpan = 4
      cell.textContent = "No documents match these filters."
      row.append(cell)
      rows.push(row)
    }
    results.replaceChildren(...rows)

    pagination.replaceChildren()
    if (totalPages > 1) {
      for (let number = 1; number <= totalPages; number += 1) {
        const button = document.createElement("button")
        button.type = "button"
        button.textContent = number
        button.ariaCurrent = number === page ? "page" : null
        button.addEventListener("click", function () {
          page = number
          render()
        })
        pagination.append(button)
      }
    }
  }

  search.addEventListener("input", function () {
    page = 1
    render()
  })
  sort.addEventListener("change", function () {
    page = 1
    render()
  })
  category.addEventListener("change", function () {
    activeCategory = category.value
    page = 1
    render()
  })
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      activeType = button.dataset.documentType
      page = 1
      filters.forEach(function (filter) {
        filter.setAttribute("aria-pressed", String(filter === button))
      })
      render()
    })
  })

  fetch(new URL("assets/document-library.json", document.baseURI))
    .then(function (response) {
      if (!response.ok) throw new Error("Unable to load document library")
      return response.json()
    })
    .then(function (items) {
      documents = items
      Array.from(new Set(documents.map(function (item) { return item.category || "Other" })))
        .sort(function (first, second) { return first.localeCompare(second) })
        .forEach(function (itemCategory) {
          const option = document.createElement("option")
          option.value = itemCategory
          option.textContent = itemCategory
          category.append(option)
        })
      render()
    })
    .catch(function () {
      summary.textContent = "Unable to load the document library."
    })
})