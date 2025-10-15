import Page from '../page.ts';
import redirectURL from '../redirectURL.page.ts';

class FinanceESG extends Page {
  get productsTab() {
    return $('//button[contains(@class, "menu-item__link")]//span[text()="Products"]');
  }
  get financeEsgSection() {
    return $('//button[@data-index="2"]//span[contains(text(), "Finance & ESG")]');
  }
  get esgKpiEngineLink() {
    return $('a[aria-label="ESG KPI Engine"]');
  }
  get mobileMenuButton() {
    return $('button[aria-label="Open menu"]');
  }

  async goToProjectPage() {
    const originalUrl = await browser.getUrl();
    const expectedUrl = 'https://www.sapfioneer.com/finance-esg/esg-kpi-engine/';

    if (await this.mobileMenuButton.isDisplayed()) {
      await this.mobileMenuButton.click();
      await browser.pause(2000);
    }

    await this.productsTab.waitForExist({ timeout: 30000 });
    await browser.execute((el) => el.click(), await this.productsTab);

    await this.financeEsgSection.waitForExist({ timeout: 30000 });
    await browser.execute((el) => el.click(), await this.financeEsgSection);

    await this.esgKpiEngineLink.waitForExist({ timeout: 30000 });
    await browser.execute((el) => el.click(), await this.esgKpiEngineLink);

    await redirectURL.waitForUrlChange(originalUrl);

    const actualUrl = await browser.getUrl();
    expect(actualUrl).toBe(expectedUrl);
  }
}

export default new FinanceESG();
