import { browser, element, by } from 'protractor';

export class BookEditPage {
  titleInput: any;
  imageInput: any;
  descriptionInput: any;
  submitButtonReactive: any;

  constructor() {
    this.getPage();

    this.titleInput = element(by.css('.title'));
    this.imageInput = element(by.css('.image'));
    this.descriptionInput = element(by.css('.description'));
    this.submitButtonReactive = element(by.id('reactiveSubmitButton'));
  }

  getPage(): void {
    browser.get('/books/new');
  }

  setTitle(text: string) {
    this.titleInput.sendKeys(text);
  }

  setImage(text: string) {
    this.imageInput.sendKeys(text);
  }

  setDescription(text: string) {
    this.descriptionInput.sendKeys(text);
  }

  submitReactive() {
    this.submitButtonReactive.click();
  }
}
