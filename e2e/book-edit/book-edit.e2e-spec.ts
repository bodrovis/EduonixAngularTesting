import { BookEditPage } from './book-edit.po';
import { BookPage } from '../book/book.po';
import { browser } from 'protractor';
import * as faker from 'faker';

describe('Book edit page', () => {
  let bookEdit: BookEditPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    this.bookEdit = new BookEditPage();
  });

  it('should have reactive form working', () => {
    //debugger;
    let image = faker.image.image();
    let title = faker.lorem.sentence();
    let description = faker.lorem.sentence();

    this.bookEdit.setTitle(title);
    this.bookEdit.setImage(image);
    this.bookEdit.setDescription(description);
    this.bookEdit.submitReactive();

    let bookPage = new BookPage(title);
    expect(bookPage.titleElement.getText()).toEqual(title);
    expect(bookPage.imageElement.getAttribute('src')).toContain(image);
    expect(bookPage.descriptionElement.getText()).toEqual(description);
  });
});
