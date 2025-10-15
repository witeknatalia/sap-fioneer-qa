import solutionsSection from '../../pageobjects/homepage/solutionsSection.page';

describe('E2E solutions for financial services', () => {
  before(async () => {
    await solutionsSection.open('');
  });
  it('should verify card navigation and request demo', async () => {
    await solutionsSection.testCardNavigation();
  });
});
