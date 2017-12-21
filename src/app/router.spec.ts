import { TestBed, async, fakeAsync, tick, inject, ComponentFixture } from
'@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { CartServiceMock, CartList } from './services/cart/cart.service.mock';
import { CartService } from './services/cart/cart.service';
import { DiscountFormatterPipe } from './pipes/discount-formatter/discount-formatter.pipe';
import { environment } from '../environments/environment';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'book',
  template: '<div>book</div>'
})
class BookComponent {}

@Component({
  selector: 'book-edit',
  template: '<div>book edit</div>'
})
class BookEditComponent {}

@Component({
  selector: 'book-list',
  template: '<div>book list</div>'
})
class BookListComponent {}
