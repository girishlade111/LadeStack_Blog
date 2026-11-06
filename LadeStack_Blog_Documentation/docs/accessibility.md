# Accessibility and Inclusive Reading Specification

## Target

Build toward **WCAG 2.2 AA** where applicable, audited by automated tools and manual keyboard/screen-reader testing. This is a target for implementation, not a claim of certification. Support phone/desktop, multiple scripts, text zoom and reduced motion.

## Structure and semantics

Use semantic `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>` and `<footer>` as appropriate. Each page has one logical H1. Article body heading levels proceed H2→H3 without arbitrary visual-only jumps. Link text is descriptive; buttons are for actions, links for navigation. Do not duplicate interactive elements invisibly that confuse screen readers.

## Keyboard flows

- Skip-to-main link visible on focus.
- Header menus and categories reachable via Tab; Escape closes dialogs/menus where appropriate.
- Search dialog puts focus on input, traps focus only while modal, restores focus on dismissal.
- Locale and theme controls operate with keyboard and expose current selection state.
- TOC links are actual anchors. Focus/scroll behavior doesn't trap a keyboard user.
- No key shortcuts should interfere when user is typing in inputs/editors.

## Color and contrast

Verify minimum text contrast for normal/large text against actual surfaces; muted metadata must remain readable in both themes. Visible focus indicators distinct from hover states. Do not rely on color alone for current category, active TOC topic, validation error or search match. Test active icon strokes and code highlight colors as well as ordinary text.

## Motion and layout

Respect `prefers-reduced-motion`, especially TOC smooth scrolling and animated transitions. Allow 200% zoom and reflow at 320 CSS px without loss of essential controls or horizontal document scrolling. Article tables and code blocks may have **local** horizontal overflow with clear affordance. Avoid sticky header swallowing targets; use `scroll-margin-top`.

## Language accessibility

Every rendered document has accurate `<html lang>`. Translate UI labels, status messages, navigation names and date presentation. Avoid strange transliterations or mixed language fallback for 9-locale UI. Ensure font stacks render CJK/Cyrillic/Turkish characters without tofu. Internationalized long words/headings should wrap sensibly.

## Images and media

Useful images need concise, contextual alt text; decorative imagery gets intentionally empty alt. Credit/caption information must not be available only through hover. No autoplay audio or video at launch. If embedded media is introduced later, provide captions/transcripts and consent considerations.

## Search and TOC

Search results have explicit labels, result count updates announced politely (not on every keystroke without debounce), and visible empty/error state. Dialog backdrop doesn't hide focused controls. TOC has `aria-label="On this page"`, conveys active section accessibly (e.g. `aria-current="location"` when appropriate), supports both pointer and keyboard.

## Testing plan

Run automated static checks on key pages, then manual keyboard-only pass. Spot-check with at least one screen reader and mobile touch target evaluation. Test page templates in all relevant states: long headline, mobile drawer, nested TOC, missing image, no results and category with zero posts. Log known issues with severity and resolve high impact findings before launch.
