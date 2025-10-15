import productsPage from '../pageobjects/products.page';

describe('Redirect user to product page', () => {
  before(async () => {
    await productsPage.open('/');
  });
  it('should verify card navigation', async () => {
    await productsPage.goToProjectPage();
  });
});
