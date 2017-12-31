import { Component, NgZone } from '@angular/core';
import { BookInterface, BookModel } from './models/book/book.model';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public cart:BookModel[] = [];

  constructor(private cs: CartService, private ngZone: NgZone) {
    //this.ngZone.runOutsideAngular(() => {
      //this.ngZone.run(() => {
        this.cs.query().subscribe((items:BookModel[]) => {
          this.cart = items;
        });
      //});
    //});

    this.cs.addEmitted$.subscribe((item) => {
      this.cart.push(item);
    });
  }

  addToCart(book:BookModel) {
    this.cart.push(book);
  }
}
