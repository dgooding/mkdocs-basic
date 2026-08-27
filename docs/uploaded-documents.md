# Documents

<div class="itsd-page-intro" markdown>

## Shared ITSD library

Find documents by name, file type, or category. Select a document title to open it.

This library is hosted on GitHub. You can modify the documents but then i'd have to fix it so... 
I'm leaving this open for a reason, i'll figure out later.

</div>

<div class="itsd-library-actions">
	<a class="md-button md-button--primary" href="https://github.com/dgooding/mkdocs-basic/upload/main/docs" target="_blank" rel="noopener">Upload a document</a>
	<a class="md-button" href="https://github.com/dgooding/mkdocs-basic/tree/main/docs" target="_blank" rel="noopener">Manage documents on GitHub</a>
</div>

<div class="itsd-library-controls" data-document-library-controls>
	<div class="itsd-library-control itsd-library-control--search">
		<label for="document-library-search">Search by name</label>
		<input id="document-library-search" type="search" placeholder="Enter a document name">
	</div>
	<fieldset class="itsd-library-control itsd-library-type-control">
		<legend>File type</legend>
		<div class="itsd-library-filters">
			<button type="button" data-document-type="all" aria-pressed="true">All</button>
			<button type="button" data-document-type="md" aria-pressed="false">Markdown</button>
			<button type="button" data-document-type="pdf" aria-pressed="false">PDF</button>
		</div>
	</fieldset>
	<div class="itsd-library-control">
		<label for="document-library-category">Category</label>
		<select id="document-library-category">
			<option value="all">All categories</option>
		</select>
	</div>
	<div class="itsd-library-control">
		<label for="document-library-sort">Sort by</label>
		<select id="document-library-sort">
			<option value="name">Name (A-Z)</option>
			<option value="category">Category (A-Z)</option>
			<option value="type">File type (A-Z)</option>
		</select>
	</div>
</div>

<div class="itsd-library-summary" data-document-library-summary>Loading documents...</div>

<div class="itsd-library-table-wrap">
	<table class="itsd-library-table">
		<thead>
			<tr>
				<th scope="col">Document</th>
				<th scope="col">Category</th>
				<th scope="col">Type</th>
				<th scope="col">GitHub action</th>
			</tr>
		</thead>
		<tbody data-document-library-results></tbody>
	</table>
</div>

<nav class="itsd-library-pagination" aria-label="Document pages" data-document-library-pagination></nav>

<div class="itsd-status" markdown>

**Deleting documents:** Delete on GitHub opens a confirmation page in the repository. You may need to sign in, and no file is removed until an authorized user commits the deletion. Use **Manage documents on GitHub** to review or remove several files.

</div>