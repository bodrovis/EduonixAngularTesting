import { browser, element, by } from 'protractor';

export class BookPage {
  titleElement: any;
  imageElement: any;
  descriptionElement: any;

  constructor(title: string) {
    this.getPage(title);
    this.titleElement = element(by.css('.book-title'));
    this.imageElement = element(by.css('.book-image'));
    this.descriptionElement = element(by.css('.book-description'));
  }

  getPage(title: string): void {
    browser.get('/books/' + title);
  }
}
