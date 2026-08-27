# Uploaded Documents

[:material-upload-outline: Upload a document](upload-documents.md){ .md-button .md-button--primary }

<div class="itsd-page-intro" markdown>

## Shared ITSD library

Search, filter, and open documents in the shared ITSD library.

</div>

<div class="itsd-library-view-toggle" role="group" aria-label="Document view">
	<button type="button" data-document-view="browse" aria-pressed="true">Browse</button>
	<button type="button" data-document-view="search" aria-pressed="false">Search</button>
</div>

<div data-document-browse-view>
	<div class="itsd-library-controls" data-document-library-controls>
	<input id="document-library-search" type="search" placeholder="Search documents" aria-label="Search documents">
	<div class="itsd-library-filters" role="group" aria-label="Filter documents by type">
		<button type="button" data-document-type="all" aria-pressed="true">All</button>
		<button type="button" data-document-type="md" aria-pressed="false">Markdown</button>
		<button type="button" data-document-type="pdf" aria-pressed="false">PDF</button>
	</div>
	<label for="document-library-sort">Sort</label>
	<select id="document-library-sort">
		<option value="name">Name</option>
		<option value="type">Type</option>
	</select>
  </div>

  <div class="itsd-library-summary" data-document-library-summary>Loading documents...</div>

  <div class="itsd-library-table-wrap">
	<table class="itsd-library-table">
		<thead>
			<tr>
				<th scope="col">Document</th>
				<th scope="col">Type</th>
			</tr>
		</thead>
		<tbody data-document-library-results></tbody>
	</table>
  </div>

  <nav class="itsd-library-pagination" aria-label="Document pages" data-document-library-pagination></nav>
</div>

<section class="itsd-search-workspace" data-document-search-view hidden>
  <div class="itsd-search-bar">
    <label for="document-search-query">Search the library</label>
    <input id="document-search-query" type="search" placeholder="Search document titles and content" autocomplete="off">
  </div>
  <div class="itsd-search-layout">
    <aside class="itsd-search-results" aria-label="Search results">
      <div class="itsd-search-results-header" data-document-search-summary>Enter a search term.</div>
      <div data-document-search-results></div>
    </aside>
    <article class="itsd-search-reader" data-document-search-reader>
      <p>Choose a result to read it here.</p>
    </article>
  </div>
</section>