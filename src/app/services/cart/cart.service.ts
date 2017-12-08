import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BookModel } from  '../../models/book/book.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {
  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();

  constructor(private db: AngularFirestore) { }

  query() {
    // promise
    return this.db.collection('/cart').valueChanges();
  }

  add(data) {
    let item = this.db.collection<BookModel>('/cart').add(data.getData());
    this.emitAddToCart.next(item);
    return item;
  }

  emitChange(book: BookModel) {
    this.emitAddToCart.next(book);
  }
}
