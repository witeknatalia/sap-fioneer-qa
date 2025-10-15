import Page from './page.ts';

class ProductsPage extends Page {
  get productsTab() {
    return $('//button[contains(@class, "menu-item__link")]//span[text()="Products"]');
  }
  get financeEsgSection() {
    return $('//button[@data-index="2"]//span[contains(text(), "Finance & ESG")]');
  }
  get esgKpiEngineLink() {
    return $('a[aria-label="ESG KPI Engine"]');
  }

  /**
   * Wait for URL to change from original URL
   * @param originalUrl - URL before navigation
   */
  async waitForUrlChange(originalUrl: string) {
    await browser.waitUntil(async () => (await browser.getUrl()) !== originalUrl, {
      timeout: 10000,
      timeoutMsg: 'URL did not change after navigation',
    });
  }

  /**
   * Navigates to ESG KPI Engine page through Products menu and verifies URL
   * @throws {Error} If any navigation step fails or URL is incorrect
   * @returns {Promise<void>}
   */
  async goToProjectPage() {
    const originalUrl = await browser.getUrl();
    const expectedUrl = 'https://www.sapfioneer.com/finance-esg/esg-kpi-engine/';

    await this.productsTab.waitForDisplayed({ timeout: 10000 });
    await this.productsTab.click();

    await this.financeEsgSection.waitForDisplayed({ timeout: 10000 });
    await this.financeEsgSection.click();

    await this.esgKpiEngineLink.waitForDisplayed({ timeout: 10000 });
    await this.esgKpiEngineLink.click();

    await this.waitForUrlChange(originalUrl);

    const actualUrl = await browser.getUrl();
    if (actualUrl !== expectedUrl) {
      throw new Error(`Navigation failed! Expected: "${expectedUrl}", but got: "${actualUrl}"`);
    }

    console.log('✓ Successfully navigated to ESG KPI Engine page');
  }
}

export default new ProductsPage();
