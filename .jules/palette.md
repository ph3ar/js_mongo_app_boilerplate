## 2026-03-08 - Added accessibility attributes to flash alerts and profile images
**Learning:** Found an accessibility issue pattern specific to this app's components: flash messages and alert popups rely on icon-only buttons (like `.close` with `fa-times-circle`) which completely omit `aria-label` attributes.
**Action:** Always ensure icon-only buttons receive an `aria-label` providing their context, and ensure `alt` attributes are present on all user-uploaded or dynamically generated images such as avatars in headers.
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
## 2024-05-18 - Form Input Accessibility
**Learning:** Found that custom form blocks or copy-pasted blocks in pug templates sometimes do not have explicitly added and mapped `for` and `id` attributes on inputs and labels, especially in older API views like Twilio API. This impacts screen reader accessibility.
**Action:** When working with Pug templates and form groups in this repository, explicitly add and map `for` and `id` attributes on all inputs (especially custom inputs) to ensure screen reader accessibility. Check that copy-pasted form blocks do not retain stale `for` attributes.

## 2024-05-24 - Flash Message Accessibility Roles
**Learning:** Dynamic flash message containers (like `.alert`) often visually convey information without automatically notifying screen readers. Using `role='alert'` ensures screen readers announce the contents of the container immediately upon display. Additionally, when using icon-only close buttons, ensure there is only a single decorative icon and apply `aria-hidden='true'` to prevent redundant announcements.
**Action:** Always add `role='alert'` to flash message or toast containers and clean up duplicate, visually identical, decorative icons inside buttons for improved accessibility.
