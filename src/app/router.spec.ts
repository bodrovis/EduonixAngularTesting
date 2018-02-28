import { TestBed, async, fakeAsync, tick, inject, ComponentFixture } from
'@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('Routing', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    let routerStub: any = {
      navigate: function() {},
      routerState: {}
    };

    spyOn(routerStub, 'navigate');

    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent, BookComponent, BookListComponent,
        BookEditComponent, DiscountFormatterPipe
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'books/:title', component: BookComponent },
          { path: 'books/:title/edit', component: BookEditComponent },
          { path: 'books', component: BookListComponent }
        ])
      ],
      providers: [
        { provide: CartService, useClass: CartServiceMock },
        { provide: environment, useValue: {} }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);

  }));

  it('should navigate to the default route',
    inject([Router, Location], fakeAsync((router: Router, location: Location) => {
      router.initialNavigation();
      tick();
      router.navigate(['books']);
      tick();
      expect(location.path()).toBe('/books');
    })
  ));

  it('should navigate to book edit',
    inject([Router, Location], fakeAsync((router: Router, location: Location) => {
      router.navigate(['books', 1, 'edit']);
      tick();
      expect(location.path()).toBe('/books/1/edit');
      expect(fixture.nativeElement.innerHTML).toContain('book edit');
    })
  ));
});
