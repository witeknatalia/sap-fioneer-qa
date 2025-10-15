import Page from './page.ts';

class RedirectURL extends Page {
  /**
   * Wait for URL to change from the original URL after navigation action
   * @param originalUrl - The URL before navigation
   * @returns Promise that resolves when URL changes
   */
  async waitForUrlChange(originalUrl: string): Promise<void> {
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl !== originalUrl;
      },
      {
        timeout: 10000,
        timeoutMsg: 'URL did not change after navigation',
      },
    );
  }

  /**
   * Wait for browser to navigate to a specific expected URL
   * @param {string} expectedUrl - The exact URL to wait for
   * @returns {Promise<void>} Resolves when current URL matches expected URL
   * @throws {Error} If URL does not match expected value within timeout period (10 seconds)
   */

  async waitForUrl(expectedUrl: string): Promise<void> {
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === expectedUrl;
      },
      {
        timeout: 10000,
        timeoutMsg: `URL did not become ${expectedUrl}`,
      },
    );
  }
}

export default new RedirectURL();
