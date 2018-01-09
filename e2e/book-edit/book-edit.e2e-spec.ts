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

  it('should have reactive form working', async () => {
    //debugger;
    let image = faker.image.image();
    let title = faker.lorem.sentence();
    let description = faker.lorem.sentence();

    await this.bookEdit.setTitle(title);
    await this.bookEdit.setImage(image);
    await this.bookEdit.setDescription(description);
    await this.bookEdit.submitReactive();

    let bookPage = new BookPage(title);
    expect(bookPage.titleElement.getText()).toEqual(title);
    expect(bookPage.imageElement.getAttribute('src')).toContain(image);
    expect(bookPage.descriptionElement.getText()).toEqual(description);
  });
});
