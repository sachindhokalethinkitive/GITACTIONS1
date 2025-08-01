// Automated Login Test Suite using Playwright and Page Object Model
// Framework: Playwright with TypeScript


import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

const validUsername = 'tomsmith';
const validPassword = 'SuperSecretPassword!';
const invalidUsername = 'wronguser';
const invalidPassword = 'wrongpass';

// Test: Successful login with valid credentials
test('Successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUsername, validPassword);
  await expect(page.locator('h2')).toHaveText('Secure Area');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

// Test: Failed login with invalid username
test('Failed login with invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(invalidUsername, validPassword);
  await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
});

// Test: Failed login with invalid password
test('Failed login with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUsername, invalidPassword);
  await expect(loginPage.errorMessage).toContainText('Your password is invalid!');
});

// Test: Verify error messages appear correctly
test('Verify error messages for invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(invalidUsername, invalidPassword);
  await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
  await loginPage.login(validUsername, invalidPassword);
  await expect(loginPage.errorMessage).toContainText('Your password is invalid!');
});

// Each test uses the Page Object Model and includes clear assertions and comments.
