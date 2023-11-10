import { Page } from '@playwright/test';

const byTestId = (testId: string) => `[data-testid="${testId}"]`;

export const getButton = (testId: string, page: Page) => {
  // const buttonLocator = await page.waitForSelector(byTestId(testId));

  const buttonLocator = page.getByTestId(testId);

  const wrapper = {
    _locator: buttonLocator,
    click: async () => {
      buttonLocator.click({});
      return wrapper;
    },
    isVisible: async () => {
      buttonLocator.isVisible();
      return wrapper;
    },
  };

  return wrapper;
};
