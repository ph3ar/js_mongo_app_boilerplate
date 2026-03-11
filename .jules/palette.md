## 2026-03-11 - Added Accessibility Attributes to Flash Message Close Buttons
**Learning:** Flash messages often use icon-only close buttons. Adding `aria-label='Close'` to the button and `aria-hidden='true'` to the decorative icon ensures the button's purpose is announced clearly to screen readers, improving accessibility without altering visual design.
**Action:** When adding or encountering icon-only interactive elements in templates, always verify they have accessible names (e.g., `aria-label`) and hide purely decorative icons from screen readers.
