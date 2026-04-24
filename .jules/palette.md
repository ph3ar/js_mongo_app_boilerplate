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
## 2026-03-17 - Added role='alert' to Flash Messages
**Learning:** Found an accessibility issue pattern where flash messages visually appeared but weren't automatically announced by screen readers due to missing ARIA roles. Additionally, duplicate close icons (one missing `aria-hidden`) caused redundant reading.
**Action:** Always add `role='alert'` to flash message containers and verify that decorative icons inside icon-only buttons have a single instance with `aria-hidden='true'`.

## 2024-05-24 - Flash Message Accessibility Roles
**Learning:** Dynamic flash message containers (like `.alert`) often visually convey information without automatically notifying screen readers. Using `role='alert'` ensures screen readers announce the contents of the container immediately upon display. Additionally, when using icon-only close buttons, ensure there is only a single decorative icon and apply `aria-hidden='true'` to prevent redundant announcements.
**Action:** Always add `role='alert'` to flash message or toast containers and clean up duplicate, visually identical, decorative icons inside buttons for improved accessibility.
## 2026-03-20 - Missing alt attributes on large image grids
**Learning:** Found an accessibility issue pattern where large collections of images (like the 24 API Sandbox logos in views/api/index.pug) consistently missed `alt` attributes, likely due to copy-pasting the initial grid cell structure.
**Action:** Always verify `alt` attributes are present when creating or modifying grids or lists of images, ensuring each image has descriptive alternative text, even if the text immediately follows the image visually.
## 2026-03-20 - Redundant Alt Text on Decorative Icons
**Learning:** Adding descriptive `alt` text to images that sit right next to their textual equivalent (e.g., `alt='GitHub Logo' | GitHub`) can cause screen readers to announce the information redundantly. For decorative images next to text, an empty string `alt=""` is often preferred to make the screen reader skip the image entirely. However, adding descriptive `alt` text is still vastly superior to omitting the attribute entirely, which causes the screen reader to read the raw image URL.
**Action:** When adding `alt` attributes to images that are purely decorative or immediately followed by the exact same text, consider using an empty string `alt=""` to avoid redundant announcements.
## 2026-03-26 - Missing form labels in Twitter API view
**Learning:** Found an accessibility issue pattern where inputs in views (like the Compose Tweet field) were completely lacking labels, forcing screen readers to guess their purpose.
**Action:** Always verify that input fields have either a visible label or a screen-reader-only (`.sr-only`) label connected via `for`/`id` attributes.
## 2024-05-24 - Missing Alt Attributes in API Views
**Learning:** Many views in the `api` folder use `img` tags to display user profiles, album covers, or API-specific icons (like Foursquare venues or Google Drive icons), but lack `alt` tags. Because they are often dynamically populated (e.g., `artist.image`), they are easily missed during copy-pasting.
**Action:** When working on API or user profile views, consistently verify that `img` tags include contextual `alt` attributes based on template variables (e.g., `alt=artist.name + ' profile picture'`) to improve accessibility.
## 2026-04-03 - Decorative FontAwesome Icons in Buttons
**Learning:** Found an accessibility issue where decorative FontAwesome icons (`i.far.fa-user.fa-sm` and `i.fab.*`) inside login buttons were lacking `aria-hidden='true'`, which could cause screen readers to read confusing or redundant characters.
**Action:** When working with buttons or links containing both text and decorative icons, ensure the icons are hidden from screen readers using `aria-hidden='true'`.
