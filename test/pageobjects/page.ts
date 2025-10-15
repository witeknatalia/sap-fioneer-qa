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

  public async closeCookieBanner() {
    const rejectButton = await $('[data-cky-tag="reject-button"]');

    if (await rejectButton.isDisplayed()) {
      await rejectButton.click();
    } else {
      console.log('No cookie banner found or already closed');
    }
  }
}
