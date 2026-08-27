# Support and Suggestions

<div class="itsd-page-intro" markdown>

## Help shape the documentation

Suggest a feature, improvement, or piece of guidance you would like to see here. Use the local option for a browser-only preview, or send it to GitHub to make it a shared suggestion the project can review.

</div>

<div class="itsd-suggestion-actions">
  <button class="md-button itsd-export-button" type="button" data-suggestion-export>Export suggestions</button>
</div>

<form class="itsd-suggestion-form" data-suggestion-form>
  <label for="suggestion-category">Category</label>
  <select id="suggestion-category" name="category" required>
    <option value="">Choose a category</option>
    <option>Issue</option>
    <option>Problem</option>
    <option>UI fix</option>
    <option>Feature request</option>
    <option>Documentation</option>
    <option>Accessibility</option>
    <option>Question</option>
  </select>
  <label for="suggestion-text">Suggestion or problem</label>
  <textarea id="suggestion-text" name="text" maxlength="500" required></textarea>
  <div class="itsd-suggestion-submit-row">
    <button class="md-button md-button--primary" type="submit">Into the Void it goes!</button>
    <button class="md-button itsd-github-suggestion" type="button" data-github-suggestion>Submit to GitHub</button>
  </div>
</form>

<section class="itsd-suggestions" data-suggestions-view>
  <div class="itsd-suggestions-header">
    <h2>Feature suggestions</h2>
    <div class="itsd-suggestions-toolbar">
      <p data-suggestions-status>Loading suggestions...</p>
      <label for="suggestion-status">Status</label>
      <select id="suggestion-status" data-suggestion-status aria-label="Filter suggestions by status">
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
      </select>
      <label for="suggestion-filter-category">Category</label>
      <select id="suggestion-filter-category" data-suggestion-filter-category aria-label="Filter suggestions by category">
        <option value="">All categories</option>
        <option>Issue</option>
        <option>Problem</option>
        <option>UI fix</option>
        <option>Feature request</option>
        <option>Documentation</option>
        <option>Accessibility</option>
        <option>Question</option>
        <option>Shared suggestion</option>
      </select>
      <label for="suggestion-date">Date</label>
      <input id="suggestion-date" type="date" data-suggestion-date aria-label="Filter suggestions by date">
      <label for="suggestion-keyword">Search</label>
      <input id="suggestion-keyword" type="search" data-suggestion-keyword placeholder="Search suggestions" aria-label="Search suggestions">
      <button class="itsd-filter-reset" type="button" data-suggestions-reset>Clear filters</button>
    </div>
  </div>
  <div class="itsd-suggestions-list" data-suggestions-list>
    <p>Loading suggestions...</p>
  </div>
</section>

<div class="itsd-status" markdown>

The local action stores suggestions and status changes in this browser. Submit to GitHub to create a shared issue that can be reviewed and discussed by the project.

</div>
