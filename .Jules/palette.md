# Palette's Journal

## 2024-05-18 - Missing ARIA Labels on Close Buttons in Flash Messages
**Learning:** Found an accessibility issue pattern where close buttons (`button.close`) for flash alerts in `views/partials/flash.pug` are missing `aria-label` attributes to explicitly tell screen reader users that the button closes the alert. The buttons currently contain an icon `i.far.fa-times-circle` but lack accessible names.
**Action:** When working on flash messages or modals that have generic "close" icons, always verify they have an `aria-label="Close"` added to the `button` tag. This is a quick and effective a11y enhancement.