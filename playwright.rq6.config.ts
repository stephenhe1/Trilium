import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./rq6-agent",
    outputDir: "./test-results/rq6-agent",
    reporter: [["list"], ["html", { outputFolder: "test-results/rq6-agent-html", open: "never" }]],
    use: {
        baseURL: "http://localhost:3010",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "off",
        actionTimeout: 15_000,
        navigationTimeout: 30_000,
    },
    retries: 2,
    workers: 1,
    timeout: 60_000,
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
