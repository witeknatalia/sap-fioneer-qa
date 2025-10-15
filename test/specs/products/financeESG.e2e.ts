import financeESG from '../../pageobjects/products/financeESG.page';

describe('Redirect user to product page', () => {
  before(async () => {
    await financeESG.open('');
    await financeESG.closeCookieBanner();
  });
  it('should verify card navigation', async () => {
    await financeESG.goToProjectPage();
  });
});
