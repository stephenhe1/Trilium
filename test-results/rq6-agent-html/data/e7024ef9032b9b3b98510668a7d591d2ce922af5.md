# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 06-settings.spec.ts >> Settings dialog >> can navigate to Text Notes settings
- Location: rq6-agent/06-settings.spec.ts:58:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.tree-wrapper')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('.tree-wrapper')

```

```yaml
- text: Too many requests, please try again later.
```

# Test source

```ts
  1  | import { Page, expect } from "@playwright/test";
  2  | 
  3  | export const BASE_URL = "http://localhost:3010";
  4  | export const PASSWORD = "test1234";
  5  | 
  6  | /**
  7  |  * Log in to the Trilium app with the test password.
  8  |  * After this call the page will be on the main "/" route with the note tree visible.
  9  |  */
  10 | export async function login(page: Page): Promise<void> {
  11 |     await page.goto("/login", { waitUntil: "networkidle", timeout: 30_000 });
  12 |     await page.locator("#password").fill(PASSWORD);
  13 |     await page.getByRole("button", { name: "Login" }).click();
  14 |     // Wait for navigation to main app
  15 |     await page.waitForURL("/", { timeout: 30_000 });
  16 |     await page.waitForLoadState("networkidle", { timeout: 30_000 });
  17 |     // Wait for the note tree to appear - use generous timeout since SPA may need time to init
> 18 |     await expect(page.locator(".tree-wrapper")).toBeVisible({ timeout: 30_000 });
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  19 | }
  20 | 
  21 | /**
  22 |  * Open settings dialog via the cog launcher button.
  23 |  */
  24 | export async function openSettings(page: Page): Promise<void> {
  25 |     await page.locator(".launcher-button.bx-cog").click();
  26 |     await expect(page.locator(".modal.options-dialog")).toBeVisible({ timeout: 10_000 });
  27 | }
  28 | 
  29 | /**
  30 |  * Navigate to a specific settings section by clicking its nav link.
  31 |  */
  32 | export async function goToSettingsSection(page: Page, label: string): Promise<void> {
  33 |     const optionsDialog = page.locator(".modal.options-dialog");
  34 |     await optionsDialog.locator(".settings-navigation-item", { hasText: label }).click();
  35 |     await page.waitForTimeout(800);
  36 | }
  37 | 
  38 | /**
  39 |  * Get the currently active note split (the main note editing area).
  40 |  */
  41 | export function getNoteSplit(page: Page) {
  42 |     return page.locator(".note-split:not(.hidden-ext)");
  43 | }
  44 | 
  45 | /**
  46 |  * Click the first note in the tree (the root note).
  47 |  */
  48 | export async function clickFirstNote(page: Page): Promise<string> {
  49 |     const firstNote = page.locator(".tree-wrapper .fancytree-node").first();
  50 |     const text = await firstNote.innerText().catch(() => "");
  51 |     await firstNote.click();
  52 |     await page.waitForTimeout(500);
  53 |     return text;
  54 | }
  55 | 
  56 | /**
  57 |  * Create a new child note under the selected note via Insert Child Note → Text.
  58 |  */
  59 | export async function createChildTextNote(page: Page): Promise<void> {
  60 |     await page.keyboard.press("Meta+P");
  61 |     await page.waitForTimeout(1000);
  62 | }
  63 | 
```