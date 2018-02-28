import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import * as faker from 'faker';
import { Subject } from 'rxjs/Subject';
export let CartList = [];

for (var i = 0; i < 10; i++) {
  CartList.push({
    image: faker.image.image(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    price: 1234.45,
    upvotes: 0
  })
}
export class CartServiceMock {
  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();

  constructor() {}

  add(item) {
    return item;
  }

  query() {
    return Observable.of(CartList);
  }
}
