---
tags:
  - documentation
  - standards
---

# Documentation Standards

## Page structure

Use a descriptive title, a short purpose statement, and headings that match the questions a reader is likely to ask.

## File names

Use lowercase, hyphen-separated names such as `incident-escalation.md`.

## Procedures

- State prerequisites first.
- Number ordered tasks.
- Include expected outcomes and escalation details.
- Review links before publishing.

## Search ranking

Add front matter to make an important page rank higher:

``` yaml
---
search:
  boost: 2
---
```