import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BookModel } from  '../../models/book/book.model';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable()
export class CartService {
  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();
  hardCodedUrl = 'https://firestore.googleapis.com/v1beta1/projects/angular-tdd-eduonix/databases/(default)/documents/cart?key=AIzaSyCZuCInoEdZny7MXIVTs3TgMVXgoIjWjns'


  constructor(private db: AngularFirestore, private http: Http) { }

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

  httpCall() {
    return this.http.get(this.hardCodedUrl);
  }
}
