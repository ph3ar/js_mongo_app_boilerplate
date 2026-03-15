## 2024-05-24 - explicit label bindings on Pug radio buttons
**Learning:** Pug form templates often lack explicit `for` and `id` bindings on radio buttons/checkboxes, rendering them inaccessible to screen readers since they can't be reliably targeted.
**Action:** When working with Pug forms (especially custom UI elements like `form-check-inline`), consistently use `id` on inputs and a matching `for` on labels, rather than relying solely on visual proximity.
## 2024-05-24 - Pug Template Radio Button Labels
**Learning:** Pug templates in this repository using Bootstrap 4 form-checks often have radio inputs without explicit `id`s, and labels without `for` attributes. This breaks the link between label and input for screen readers and prevents clickability on the label.
**Action:** When adding or maintaining radio/checkbox inputs in `.pug` files (especially `views/account/profile.pug`), always explicitly map `id` on the input to `for` on the corresponding label to ensure screen reader accessibility.
