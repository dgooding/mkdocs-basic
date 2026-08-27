# Uploaded Documents

[:material-upload-outline: Upload a document](upload-documents.md){ .md-button .md-button--primary }

<div class="itsd-page-intro" markdown>

## Shared ITSD library

Search, filter, open, and manage documents in the shared ITSD library.

</div>


<div class="itsd-library-controls" data-document-library-controls>
	<input id="document-library-search" type="search" placeholder="Search documents" aria-label="Search documents">
	<div class="itsd-library-filters" role="group" aria-label="Filter documents by type">
		<button type="button" data-document-type="all" aria-pressed="true">All</button>
		<button type="button" data-document-type="md" aria-pressed="false">Markdown</button>
		<button type="button" data-document-type="pdf" aria-pressed="false">PDF</button>
	</div>
	<label for="document-library-category">Category</label>
	<select id="document-library-category" aria-label="Filter documents by category">
		<option value="all">All categories</option>
	</select>
	<label for="document-library-sort">Sort</label>
	<select id="document-library-sort">
		<option value="name">Name</option>
		<option value="type">Type</option>
		<option value="category">Category</option>
	</select>
</div>

<div class="itsd-library-summary" data-document-library-summary>Loading documents...</div>

<div class="itsd-library-actions">
	<a class="itsd-library-manage" href="https://github.com/dgooding/mkdocs-basic/tree/main/docs" target="_blank" rel="noopener" data-delete-all-documents>Delete all documents</a>
</div>

<div class="itsd-library-table-wrap">
	<table class="itsd-library-table">
		<thead>
			<tr>
				<th scope="col">Document</th>
				<th scope="col">Category</th>
				<th scope="col">Type</th>
				<th scope="col">Actions</th>
			</tr>
		</thead>
		<tbody data-document-library-results></tbody>
	</table>
</div>

<nav class="itsd-library-pagination" aria-label="Document pages" data-document-library-pagination></nav>

<div class="itsd-status" markdown>

Delete always hands off to GitHub. If you are not signed in, GitHub will require sign-in first; the file is deleted only after an authorized user reviews and commits the change. Delete all documents opens the full `docs` folder so you can remove files one at a time and commit the changes together.

</div>