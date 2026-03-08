## 2026-03-08 - Added accessibility attributes to flash alerts and profile images
**Learning:** Found an accessibility issue pattern specific to this app's components: flash messages and alert popups rely on icon-only buttons (like `.close` with `fa-times-circle`) which completely omit `aria-label` attributes.
**Action:** Always ensure icon-only buttons receive an `aria-label` providing their context, and ensure `alt` attributes are present on all user-uploaded or dynamically generated images such as avatars in headers.
