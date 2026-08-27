# Support and Feedback

<div class="itsd-page-intro" markdown>

## Help improve the documentation

Share a feature request, report a problem, or suggest guidance that would make the ITSD documentation more useful. Your submission is saved in this browser and appears on this page immediately.

</div>

<div class="itsd-suggestion-actions">
  <button class="md-button itsd-export-button" type="button" data-suggestion-export>Export suggestions</button>
</div>

<form class="itsd-suggestion-form" data-suggestion-form>
  <label for="suggestion-category">Feedback type</label>
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
  <label for="suggestion-text">What should we improve?</label>
  <textarea id="suggestion-text" name="text" maxlength="500" required></textarea>
  <button class="md-button md-button--primary" type="submit">Submit feedback</button>
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

New submissions appear in **Recent suggestions** for four days before moving into their category. Suggestions, votes, and status changes are stored in this browser so the site remains fully static and GitHub Pages compatible. Each browser can upvote a suggestion once. This prevents accidental repeat votes in one browser, but it is not customer-level identity enforcement; that requires sign-in and a server-side vote store.

</div>
