# Capability Specification: Improved Content Scannability

## Requirement: Sentence Length Constraints for Mobile Readability

Markdown pages under `src/content/pages/` MUST enforce sentence length limits to maximize Flesch-Kincaid readability on mobile devices and facilitate AI search extraction (GEO/AEO).

### Scenario: Maximum sentence length enforcement
- **Given** Markdown content files under `src/content/pages/`
- **When** paragraphs are evaluated for readability
- **Then** individual sentences SHOULD be targeted between 15 and 20 words
- **And** NO single sentence in optimized content sections SHALL exceed 35 words.

## Requirement: Keyword and Technical Term Preservation

Sentence refactoring for readability MUST NOT alter or remove target local SEO keywords, technical terms, or brand guarantees.

### Scenario: Keyword and technical specification retention
- **Given** Markdown pages undergoing sentence division or scannability adjustments
- **When** long compound sentences are rewritten into concise structures
- **Then** local SEO phrases (such as "mantenimiento de aires acondicionados", "Cancún", "Zona Hotelera") MUST be preserved verbatim
- **And** technical specifications (such as "R410A", "R32", "microfaradios") and warranty guarantees MUST remain intact.

## Requirement: Markdown Scannability & Visual Hierarchy

Long content blocks MUST be formatted with visual scannability enhancements suitable for fast skimming.

### Scenario: Bullet list and visual separation formatting
- **Given** complex multi-step procedures or technical explanations in Markdown files
- **When** content is structured for reader comprehension
- **Then** dense text paragraphs containing multi-step lists SHOULD be refactored into Markdown bullet lists (`-`) or numbered lists (`1.`)
- **And** headings (`<h2>`, `<h3>`) MUST maintain strict hierarchy without skipping heading levels.
