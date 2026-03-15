## 2026-03-11 - Added Accessibility Attributes to Flash Message Close Buttons
**Learning:** Flash messages often use icon-only close buttons. Adding `aria-label='Close'` to the button and `aria-hidden='true'` to the decorative icon ensures the button's purpose is announced clearly to screen readers, improving accessibility without altering visual design.
**Action:** When adding or encountering icon-only interactive elements in templates, always verify they have accessible names (e.g., `aria-label`) and hide purely decorative icons from screen readers.
## 2026-03-12 - Form Label Copy-Paste Errors
**Learning:** Found an accessibility issue pattern where copy-pasted form groups retain the `for` attribute of the original field (e.g., Website label pointing to `steamid`). Also, custom radio buttons in Bootstrap 4 require explicit `id` and `for` mapping which was missing.
**Action:** Always verify `for` attributes match their corresponding `input` `id`s when adding new fields, and ensure custom radio/checkbox inputs use explicit IDs.
## 2024-05-24 - explicit label bindings on Pug radio buttons
**Learning:** Pug form templates often lack explicit `for` and `id` bindings on radio buttons/checkboxes, rendering them inaccessible to screen readers since they can't be reliably targeted.
**Action:** When working with Pug forms (especially custom UI elements like `form-check-inline`), consistently use `id` on inputs and a matching `for` on labels, rather than relying solely on visual proximity.
## 2024-05-24 - Pug Template Radio Button Labels
**Learning:** Pug templates in this repository using Bootstrap 4 form-checks often have radio inputs without explicit `id`s, and labels without `for` attributes. This breaks the link between label and input for screen readers and prevents clickability on the label.
**Action:** When adding or maintaining radio/checkbox inputs in `.pug` files (especially `views/account/profile.pug`), always explicitly map `id` on the input to `for` on the corresponding label to ensure screen reader accessibility.
