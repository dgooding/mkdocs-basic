<form class="itsd-search-bar itsd-global-search" action="search.html" method="get">
  <label for="document-search-query">Search the knowledge base</label>
  <div>
    <input id="document-search-query" name="q" type="search" placeholder="Search document titles and content" autocomplete="off">
    <button class="md-button md-button--primary" type="submit">Search</button>
  </div>
</form>

# Search Results

<section class="itsd-search-workspace" data-document-search-view>
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