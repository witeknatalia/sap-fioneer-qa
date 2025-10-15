import { browser } from '@wdio/globals';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path: string) {
    return browser.url(`https://www.sapfioneer.com/${path}`);
  }

  public async waitForPageLoad() {
    await browser.waitUntil(
      async () => {
        const state = await browser.execute(() => document.readyState);
        return state === 'complete';
      },
      {
        timeout: 15000,
        timeoutMsg: 'Page did not load completely',
      },
    );
  }

  public async closeCookieBanner() {
    const rejectButton = await $('[data-cky-tag="reject-button"]');

    await this.waitForPageLoad();
    await rejectButton.waitForExist({ timeout: 5000 });

    if (await rejectButton.isDisplayed()) {
      await rejectButton.waitForClickable({ timeout: 5000 });
      await rejectButton.click();

      await rejectButton.waitForDisplayed({
        timeout: 10000,
        reverse: true,
        timeoutMsg: 'Cookie banner did not disappear after clicking reject',
      });
    }
  }
}
