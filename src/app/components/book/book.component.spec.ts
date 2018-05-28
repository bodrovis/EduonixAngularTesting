import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { BookComponent } from './book.component';
import { BookModel } from '../../models/book/book.model';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.sentence(),
      faker.lorem.paragraph(),
      1234.55,
      0
    );
    component.book = book;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should emit addToCart event', (done) => {
    component.addToCart.subscribe(e => {
      expect(e).toEqual(component.book);
      done();
    });
    component.sendToCart();
  });

  it('should call to a function sendToCart when clicked', () => {
    let spy = spyOn(component, 'sendToCart');
    let button = nativeElement.querySelector('button.send-to-cart');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the book image', () => {
    let image = nativeElement.querySelector('.book-image').getAttribute('src');
    expect(image).toEqual(book.image);
  });

  it('should show the book title', () => {
    let title = nativeElement.querySelector('.book-title').innerHTML;
    expect(title).toEqual(book.title);
  });

  it('should show the book description', () => {
    let description = nativeElement.querySelector('.book-description').innerHTML;
    expect(description).toEqual(book.description);
  });

  it('should show the book price', () => {
    let price = nativeElement.querySelector('.book-price').innerHTML;
    expect(price).toEqual('$1,234.55');
  });

  xit('pending', () => {
    let any:any = jasmine.any(Number);
  });

  it('should set correct number of upvotes', () => {
    let votes = component.votesCounter();
    expect(component.votesCounter()).toEqual(votes);
    expect(component.votesCounter()).toBeGreaterThan(votes - 1);
    expect(component.votesCounter()).not.toEqual(votes + 1);
    expect(component.votesCounter()).toBeLessThan(votes + 1);
  });

  it('upvote invokes the component function', () => {
    let spy = spyOn(component, 'upvote');
    let button = nativeElement.querySelector('button.upvote');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
