import Page from './page.ts';

class SolutionsForFinancialServicesPage extends Page {
  /**
   * NOTE: Selectors are fragile due to lack of test attributes.
   * In real project we would add data-testid attributes.
   * This is a temporary solution for recruitment task.
   */
  get cards() {
    return $$('div.row > div[class="col-12 col-md-4"]');
  }

  /**
   * Extract the header text from a specific card element
   * @param {WebdriverIO.Element} card - Card element to extract header from
   * @returns {Promise<string>} Trimmed header text
   * @throws {Error} If card header cannot be found or read
   */
  async getCardHeader(card: ChainablePromiseElement) {
    return await card.$('h3').getText();
  }

  /**
   * Normalize header text for URL comparison by removing non-alphabet characters
   * and converting to lowercase
   * @param {string} header - Original header text to normalize
   * @returns {string} Normalized header string
   */
  normalizeHeader(header: string): string {
    return header.toLowerCase().replace(/[^a-z]/g, '');
  }

  /**
   * Validate if navigation to target URL matches the expected card header
   * @param {string} header - Original card header text
   * @param {string} url - Current URL to validate against
   * @param {string} normalizedHeader - Normalized header text for comparison
   * @returns {boolean} True if navigation is valid, false otherwise
   */
  isValidNavigation(header: string, url: string, normalizedHeader: string): boolean {
    if (header === 'Finance & ESG') {
      return url.includes('finance-esg');
    }
    return url.toLowerCase().includes(normalizedHeader);
  }

  /**
   * Wait for URL to change from the original URL after navigation action
   * @param {string} originalUrl - The URL before navigation
   * @returns {Promise<void>}
   * @throws {Error} If URL does not change within timeout period
   */
  async waitForUrlChange(originalUrl: string) {
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl !== originalUrl;
      },
      {
        timeout: 10000,
        timeoutMsg: 'URL did not change after clicking card',
      },
    );
  }

  /**
   * Test navigation functionality for all financial service cards
   * @returns {Promise<void>}
   * @throws {Error} If any card navigation fails validation
   */
  async testCardNavigation() {
    const originalUrl = await browser.getUrl();
    const cardCount = (await this.cards).length;

    for (let i = 0; i < (await cardCount); i++) {
      const cards = await this.cards;
      const card = cards[i];

      await card.waitForDisplayed();
      const header = await this.getCardHeader(card);

      await card.click();
      await this.waitForUrlChange(originalUrl);

      const newUrl = await browser.getUrl();
      const normalizedHeader = this.normalizeHeader(header);

      if (!this.isValidNavigation(header, newUrl, normalizedHeader)) {
        throw new Error(`Navigation failed for "${header}". Expected to contain "${normalizedHeader}" in URL, but got: "${newUrl}"`);
      }

      if ((await browser.getUrl()) !== originalUrl) {
        await browser.back();

        await browser.waitUntil(async () => (await browser.getUrl()) === originalUrl, {
          timeout: 10000,
          timeoutMsg: 'Did not return to original page after back navigation',
        });
      }
    }
  }
}

export default new SolutionsForFinancialServicesPage();
