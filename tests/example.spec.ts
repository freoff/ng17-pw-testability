import { test, expect } from '@playwright/test';
import { getButton } from './components/button';

test.describe('has title', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });
  test('button click', async ({ page }) => {
    const button = getButton('button1', page);

    await button.click();

    await expect(page.getByText('button clicked')).toBeVisible();
  });
});
