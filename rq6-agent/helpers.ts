import { Page, expect } from "@playwright/test";

export const BASE_URL = "http://localhost:3010";
export const PASSWORD = "test1234";

/**
 * Log in to the Trilium app with the test password.
 * After this call the page will be on the main "/" route with the note tree visible.
 */
export async function login(page: Page): Promise<void> {
    await page.goto("/login", { waitUntil: "networkidle", timeout: 30_000 });
    await page.locator("#password").fill(PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    // Wait for navigation to main app
    await page.waitForURL("/", { timeout: 30_000 });
    await page.waitForLoadState("networkidle", { timeout: 30_000 });
    // Wait for the note tree to appear - use generous timeout since SPA may need time to init
    await expect(page.locator(".tree-wrapper")).toBeVisible({ timeout: 30_000 });
}

/**
 * Open settings dialog via the cog launcher button.
 */
export async function openSettings(page: Page): Promise<void> {
    await page.locator(".launcher-button.bx-cog").click();
    await expect(page.locator(".modal.options-dialog")).toBeVisible({ timeout: 10_000 });
}

/**
 * Navigate to a specific settings section by clicking its nav link.
 */
export async function goToSettingsSection(page: Page, label: string): Promise<void> {
    const optionsDialog = page.locator(".modal.options-dialog");
    await optionsDialog.locator(".settings-navigation-item", { hasText: label }).click();
    await page.waitForTimeout(800);
}

/**
 * Get the currently active note split (the main note editing area).
 */
export function getNoteSplit(page: Page) {
    return page.locator(".note-split:not(.hidden-ext)");
}

/**
 * Click the first note in the tree (the root note).
 */
export async function clickFirstNote(page: Page): Promise<string> {
    const firstNote = page.locator(".tree-wrapper .fancytree-node").first();
    const text = await firstNote.innerText().catch(() => "");
    await firstNote.click();
    await page.waitForTimeout(500);
    return text;
}

/**
 * Create a new child note under the selected note via Insert Child Note → Text.
 */
export async function createChildTextNote(page: Page): Promise<void> {
    await page.keyboard.press("Meta+P");
    await page.waitForTimeout(1000);
}
