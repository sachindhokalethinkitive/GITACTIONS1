import { test, expect } from '@playwright/test';

test('Hello World Test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  console.log('Page Title:', title);
  expect(title).toBe('Example Domain');
});
