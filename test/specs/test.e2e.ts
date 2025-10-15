import solutionsSection from '../pageobjects/solutionsForFinancialServices.page.ts';

describe('E2E solutions for financial services', () => {
  before(async () => {
    await solutionsSection.open('/');
  });
  it('should verify card navigation', async () => {
    await solutionsSection.testCardNavigation();
  });
});
