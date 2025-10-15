import contactForm from '../../pageobjects/homepage/contactForm.page';

describe('Redirect user to product page', () => {
  before(async () => {
    await contactForm.open('');
    await contactForm.closeCookieBanner();
  });
  it('should verify card navigation', async () => {
    await contactForm.redirectToContactForm();
  });
  it('should check validation after field email value', async () => {
    await contactForm.checkEmailValidation();
  });
});
