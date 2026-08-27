# Uploaded Documents

[:material-upload-outline: Upload a document](upload-documents.md){ .md-button .md-button--primary }

<div class="itsd-page-intro" markdown>

## Shared ITSD library

Search, filter, and open documents in the shared ITSD library.

</div>


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