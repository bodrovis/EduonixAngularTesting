import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CartService } from './cart.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { CartList } from './cart.service.mock';
import { Observable } from 'rxjs';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCZuCInoEdZny7MXIVTs3TgMVXgoIjWjns",
    authDomain: "angular-tdd-eduonix.firebaseapp.com",
    databaseURL: "https://angular-tdd-eduonix.firebaseio.com",
    projectId: "angular-tdd-eduonix",
    storageBucket: "angular-tdd-eduonix.appspot.com",
    messagingSenderId: "25723624635"
  }
};

let AngularFirestoreMock = {
  collection: function(param:any) {
    return {
      valueChanges: function() { return Observable.of(CartList) },
      add: function(item) { return item }
    }
  }
}

describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        CartService,
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    });
  });

  it('should be created', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));

  it('should have add method defined', inject([CartService], (service: CartService) => {
    expect(service.add).toBeTruthy();
  }));

  it('should have query method defined', inject([CartService], (service: CartService) => {
    expect(service.query).toBeTruthy();
  }));

  it('should have query method working', inject([CartService], fakeAsync((service: CartService) => {
    let all$ = service.query();
    let response;

    all$.subscribe((items) => {
      response = items;
    });

    tick();

    expect(response).toBe(CartList);
  })));
});
