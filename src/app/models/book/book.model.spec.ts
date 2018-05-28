import { BookInterface, BookModel } from './book.model';
import * as faker from 'faker';

describe('BookModel', () => {
  let image: string;
  let title: string;
  let description: string;
  let price: number;
  let upvotes: number;

  beforeEach(() => {
    image = faker.image.image();
    title = faker.lorem.sentence();
    description = faker.lorem.sentence();
    price = faker.commerce.price();
    upvotes = faker.random.number();
  });

  it('has a valid model', () => {
      let book = new BookModel(image, title, description, price, upvotes);
      expect(book.image).toEqual(image);
      expect(book.title).toEqual(title);
      expect(book.description).toEqual(description);
      expect(book.price).toEqual(price);
      expect(book.upvotes).toEqual(upvotes);
  });
});
