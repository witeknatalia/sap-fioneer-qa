import Page from '../page.ts';
import redirectURL from '../redirectURL.page.ts';

class ContactForm extends Page {
  get getInTouchButton() {
    return $('//a[contains(@class, "btn--yellow")]//span[text()="Get in touch"]');
  }
  get businessEmailField() {
    return $('input#email-5a62ee32-df11-4c3f-be27-434624349c61');
  }
  get emailValidationError() {
    return $('label.hs-error-msg');
  }

  async redirectToContactForm() {
    const expectedUrl = 'https://www.sapfioneer.com/contact-sales/';

    await this.getInTouchButton.waitForDisplayed({ timeout: 20000 });
    await this.getInTouchButton.click();
    await redirectURL.waitForUrl(expectedUrl);
    expect(await browser.getUrl()).toBe(expectedUrl);
  }

  async checkEmailValidation() {
    await this.businessEmailField.waitForDisplayed({ timeout: 20000 });
    await this.businessEmailField.setValue('342323');
    await this.emailValidationError.waitForDisplayed({ timeout: 15000 });
    expect(await this.emailValidationError.isDisplayed()).toBe(true);
  }
}
export default new ContactForm();
