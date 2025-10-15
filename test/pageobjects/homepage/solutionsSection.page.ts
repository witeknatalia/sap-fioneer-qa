import Page from '../page.ts';
import redirectURL from '../redirectURL.page.ts';

class SolutionsForFinancialServices extends Page {
  /**
   * NOTE: Selectors are fragile due to lack of test attributes.
   * In real project we would add data-testid attributes.
   * This is a temporary solution for recruitment task.
   */
  get cards() {
    return $$('div.row > div[class="col-12 col-md-4"]');
  }
  get requestDemoButton() {
    return $('a[aria-label="Request a demo"]');
  }

  /**
   * Extract the header text from a specific card element
   * @param card - Card element to extract header from
   * @returns Trimmed header text
   */
  async getCardHeader(card: WebdriverIO.Element) {
    return await card.$('h3').getText();
  }

  /**
   * Normalize header text for URL comparison by removing non-alphabet characters
   * and converting to lowercase
   * @param header - Original header text to normalize
   * @returns Normalized header string
   */
  normalizeHeader(header: string): string {
    return header.toLowerCase().replace(/[^a-z]/g, '');
  }

  /**
   * Validate if navigation to target URL matches the expected card header
   * @param header - Original card header text
   * @param url - Current URL to validate against
   * @param normalizedHeader - Normalized header text for comparison
   * @returns True if navigation is valid, false otherwise
   */
  isValidNavigation(header: string, url: string, normalizedHeader: string): boolean {
    if (header === 'Finance & ESG') {
      return url.toLowerCase().includes('finance-esg');
    }
    return url.toLowerCase().includes(normalizedHeader);
  }

  /**
   * Clicks the Request Demo button and returns to the original page
   * @throws {Error} If navigation fails or timeout occurs
   * @returns {Promise<void>}
   */
  async clickRequestDemo() {
    const button = await this.requestDemoButton;
    await button.waitForClickable({ timeout: 10000 });

    const originalUrl = await browser.getUrl();
    await button.click();

    await redirectURL.waitForUrlChange(originalUrl);
    expect(await browser.getUrl()).toContain('request-a-demo');

    await browser.back();
    await browser.waitUntil(async () => (await browser.getUrl()) === originalUrl, { timeout: 10000, timeoutMsg: 'Did not return to original page' });
    expect(await browser.getUrl()).toBe(originalUrl);
  }

  /**
   * Test navigation functionality for all financial service cards
   * @throws Error if any card navigation fails validation
   */
  async testCardNavigation() {
    for (const card of await this.cards) {
      const header = await this.getCardHeader(card);
      const currentUrlBeforeClick = await browser.getUrl();

      await card.click();
      await redirectURL.waitForUrlChange(currentUrlBeforeClick);

      const url = await browser.getUrl();
      const normalizedHeader = this.normalizeHeader(header);
      expect(await browser.getUrl()).toContain(normalizedHeader);

      this.isValidNavigation(header, url, normalizedHeader);
      await this.clickRequestDemo();

      await browser.back();
      await redirectURL.waitForUrlChange(url);
      expect(await browser.getUrl()).toBe(currentUrlBeforeClick);
    }
  }
}

export default new SolutionsForFinancialServices();
