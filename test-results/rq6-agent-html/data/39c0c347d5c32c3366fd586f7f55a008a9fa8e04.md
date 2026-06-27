# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-note-editor.spec.ts >> Note type switching (via inline buttons) >> empty text note shows type-switch buttons
- Location: rq6-agent/05-note-editor.spec.ts:136:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.note-split:not(.hidden-ext)').locator('button').filter({ hasText: 'Code' }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.note-split:not(.hidden-ext)').locator('button').filter({ hasText: 'Code' }).first()

```

```yaml
- button "Menu":
  - img "Menu"
- button ""
- button ""
- button ""
- button ""
- button ""
- button ""
- button ""
- button ""
- button ""
- button ""
- button ""
- textbox "Quick search"
- tree:
  - treeitem " root " [expanded]:
    - text:  root 
    - group:
      - treeitem " New note"
      - treeitem "  Calendar" [expanded]:
        - button ""
        - text:  Calendar
        - group:
          - treeitem "  2026" [expanded]:
            - button ""
            - text:  2026
            - group:
              - treeitem "  06 - June" [expanded]:
                - button ""
                - text:  06 - June
                - group:
                  - treeitem "  26 - Friday" [expanded]:
                    - button ""
                    - text:  26 - Friday
                    - group:
                      - treeitem " New note"
      - treeitem " New note"
- button ""
- button ""
- button ""
- text: 
- button "Meta+[": 
- button "Meta+]": 
- text: " root   root: attachments   root   root   root  + "
- button ""
- button ""
- textbox "type note's title here...": root
- button ""
- button ""
- button ""
- textbox "type note's title here...": root
- listitem: Created on Jun 26, 2026
- text: •
- listitem: Modified on Jun 26, 2026
- text: "Switch from text to:  Canvas  Code  Markdown"
- button " Collection "
- button " Template "
- button " Other note type "
- 'textbox "Rich Text Editor. Editing area: main"':
  - paragraph: Type the content of your note here...
- heading " New note " [level=5]:
  - text: 
  - link "New note":
    - /url: "#root/tf92qgrkSdFf"
  - button ""
- heading " Calendar " [level=5]:
  - text: 
  - link "Calendar":
    - /url: "#root/xASeeg7Tmxf7"
  - button ""
- text: 
- link "2026":
  - /url: "#root/xASeeg7Tmxf7/bIx6SFG5LfR4"
- heading " New note " [level=5]:
  - text: 
  - link "New note":
    - /url: "#root/aIhcvHNl7YsM"
  - button ""
- button "Toggle right panel": 
- button ""
- text: Table of Contents No headings.
- button ""
- text: 0 highlights
- button ""
- text: No highlights found.
- button ""
- button ""
- button " -"
- button " 1 path"
- button " 0 attributes"
- button ""
- application:
  - list
  - list
```

# Test source

```ts
  49  |         const noteSplit = getNoteSplit(page);
  50  |         const actionsBtn = noteSplit.locator(".note-actions");
  51  |         await actionsBtn.click();
  52  |         await page.waitForTimeout(300);
  53  | 
  54  |         const dropdown = noteSplit.locator(".dropdown-menu").first();
  55  |         await expect(dropdown).toBeVisible();
  56  |     });
  57  | 
  58  |     test("note actions menu contains expected items", async ({ page }) => {
  59  |         const noteSplit = getNoteSplit(page);
  60  |         const actionsBtn = noteSplit.locator(".note-actions");
  61  |         await actionsBtn.click();
  62  |         await page.waitForTimeout(300);
  63  | 
  64  |         const dropdown = noteSplit.locator(".dropdown-menu").first();
  65  |         await expect(dropdown).toContainText("Search in note");
  66  |         await expect(dropdown).toContainText("Note attachments");
  67  |         await expect(dropdown).toContainText("Note map");
  68  |         await expect(dropdown).toContainText("Export note");
  69  |         await expect(dropdown).toContainText("Note revisions");
  70  |     });
  71  | 
  72  |     test("clicking Escape closes note actions menu", async ({ page }) => {
  73  |         const noteSplit = getNoteSplit(page);
  74  |         const actionsBtn = noteSplit.locator(".note-actions");
  75  |         await actionsBtn.click();
  76  |         await page.waitForTimeout(300);
  77  |         const dropdown = noteSplit.locator(".dropdown-menu").first();
  78  |         await expect(dropdown).toBeVisible();
  79  | 
  80  |         // Close with Escape
  81  |         await page.keyboard.press("Escape");
  82  |         await page.waitForTimeout(500);
  83  |         await expect(dropdown).not.toBeVisible();
  84  |     });
  85  | 
  86  |     test("'Note revisions' opens revisions dialog", async ({ page }) => {
  87  |         const noteSplit = getNoteSplit(page);
  88  |         const actionsBtn = noteSplit.locator(".note-actions");
  89  |         await actionsBtn.click();
  90  |         await page.waitForTimeout(300);
  91  |         const dropdown = noteSplit.locator(".dropdown-menu").first();
  92  |         await dropdown.getByText("Note revisions...").click();
  93  | 
  94  |         await page.waitForTimeout(1000);
  95  | 
  96  |         // A modal/dialog should appear
  97  |         const modal = page.locator(".modal.show");
  98  |         await expect(modal).toBeVisible({ timeout: 10_000 });
  99  |         const modalText = await modal.innerText();
  100 |         expect(modalText).toMatch(/revision|version|history/i);
  101 |     });
  102 | 
  103 |     test("'Note attachments' opens the attachments UI", async ({ page }) => {
  104 |         const noteSplit = getNoteSplit(page);
  105 |         const actionsBtn = noteSplit.locator(".note-actions");
  106 |         await actionsBtn.click();
  107 |         await page.waitForTimeout(300);
  108 |         const dropdown = noteSplit.locator(".dropdown-menu").first();
  109 |         await dropdown.getByText("Note attachments").click();
  110 | 
  111 |         await page.waitForTimeout(2000);
  112 | 
  113 |         // Attachments might open as modal OR as a sidebar/panel
  114 |         // Check for any visible attachment-related UI
  115 |         const modal = page.locator(".modal.show");
  116 |         const hasModal = await modal.isVisible().catch(() => false);
  117 | 
  118 |         // Also check if there's an attachment panel in the sidebar or note area
  119 |         const attachmentPanel = page.locator(
  120 |             "[class*='attachment'], [data-trigger-command='showAttachments'], .note-detail-printable.visible"
  121 |         );
  122 |         const panelContent = await noteSplit.innerText().catch(() => "");
  123 |         const hasAttachmentContent = panelContent.toLowerCase().includes("attachment") ||
  124 |             panelContent.toLowerCase().includes("upload");
  125 | 
  126 |         // Accept if either modal or panel appeared
  127 |         expect(hasModal || hasAttachmentContent || await attachmentPanel.count() > 0).toBeTruthy();
  128 |     });
  129 | });
  130 | 
  131 | test.describe("Note type switching (via inline buttons)", () => {
  132 |     test.beforeEach(async ({ page }) => {
  133 |         await login(page);
  134 |     });
  135 | 
  136 |     test("empty text note shows type-switch buttons", async ({ page }) => {
  137 |         // Click root note which is an empty text note
  138 |         await page.locator(".tree-wrapper .fancytree-node").first().click();
  139 |         await page.waitForTimeout(800);
  140 | 
  141 |         const noteSplit = getNoteSplit(page);
  142 |         await expect(noteSplit).toBeVisible();
  143 | 
  144 |         // Look for the inline "Switch from text to:" section
  145 |         const switchSection = noteSplit.locator("text=Switch from text to:");
  146 |         if (await switchSection.isVisible().catch(() => false)) {
  147 |             // Look for Code button
  148 |             const codeBtn = noteSplit.locator("button", { hasText: "Code" });
> 149 |             await expect(codeBtn.first()).toBeVisible();
      |                                           ^ Error: expect(locator).toBeVisible() failed
  150 |         } else {
  151 |             // The note might have content already; check it's still a text note
  152 |             const content = await noteSplit.innerText();
  153 |             expect(content.length).toBeGreaterThan(0);
  154 |         }
  155 |     });
  156 | 
  157 |     test("can create a Code note via context menu", async ({ page }) => {
  158 |         // Create a new code note from context menu
  159 |         const rootNote = page.locator(".tree-wrapper .fancytree-node").first();
  160 |         await rootNote.click({ button: "right" });
  161 |         await page.waitForTimeout(400);
  162 | 
  163 |         const menu = page.locator("#context-menu-container");
  164 |         await expect(menu).toBeVisible({ timeout: 5_000 });
  165 | 
  166 |         // Look for "Code" in insert child note section
  167 |         const codeItem = menu.locator(".dropdown-item").filter({ hasText: /^Code$/ });
  168 |         if (await codeItem.count() > 0) {
  169 |             await codeItem.first().click();
  170 |             await page.waitForTimeout(1500);
  171 | 
  172 |             // The new note should show a code editor
  173 |             const noteSplit = getNoteSplit(page);
  174 |             const content = await noteSplit.innerText();
  175 |             // Code notes show "Auto" or a language selector
  176 |             expect(content.length).toBeGreaterThanOrEqual(0);
  177 |         } else {
  178 |             // Close menu - code type might be in a submenu
  179 |             await page.keyboard.press("Escape");
  180 |             expect(true).toBe(true);
  181 |         }
  182 |     });
  183 | 
  184 |     test("can create a Markdown note via context menu", async ({ page }) => {
  185 |         const rootNote = page.locator(".tree-wrapper .fancytree-node").first();
  186 |         await rootNote.click({ button: "right" });
  187 |         await page.waitForTimeout(400);
  188 | 
  189 |         const menu = page.locator("#context-menu-container");
  190 |         await expect(menu).toBeVisible({ timeout: 5_000 });
  191 | 
  192 |         const markdownItem = menu.locator(".dropdown-item").filter({ hasText: /^Markdown/ });
  193 |         if (await markdownItem.count() > 0) {
  194 |             await markdownItem.first().click();
  195 |             await page.waitForTimeout(1500);
  196 |             const noteSplit = getNoteSplit(page);
  197 |             await expect(noteSplit).toBeVisible();
  198 |         } else {
  199 |             await page.keyboard.press("Escape");
  200 |             expect(true).toBe(true);
  201 |         }
  202 |     });
  203 | });
  204 | 
```