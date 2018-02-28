import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CartService } from './cart.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { CartList } from './cart.service.mock';
import { Observable } from 'rxjs';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response } from '@angular/http';

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
        { provide: AngularFirestore, useValue: AngularFirestoreMock },
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [ MockBackend, BaseRequestOptions ]
          }
        ]
      });
    });

    it('should have callHttp working', inject([CartService, MockBackend],
      fakeAsync((service: CartService, backend: MockBackend) => {
        let resFromBackEnd;

        let response = {
          "documents": [
            {
              "name": "projects/angular-tdd-eduonix/databases/(default)/documents/cart/sxS5BymhG2VNX3UYUOrX",
              "fields": {
                "genre": {
                  "mapValue": {}
                },
                "category": {
                  "stringValue": "not defined"
                },
                "price": {
                  "integerValue": "100.100"
                },
                "title": {
                  "stringValue": "Hello world"
                },
                "description": {
                  "stringValue": "Hello world description"
                },
                "image": {
                  "stringValue": "https://www.planwallpaper.com/static/images/Benjamin-Blonder.png"
                },
                "upvotes": {
                  "integerValue": "0"
                }
              },
              "createTime": "2017-12-08T14:16:52.061390Z",
              "updateTime": "2017-12-08T14:16:52.061390Z"
            }]
          };

          backend.connections.subscribe(connection => {
            connection.mockRespond(new Response(<any>{
              body: JSON.stringify(response)
            }));
          });

          service.httpCall().subscribe(data => {
            resFromBackEnd = data;
          });

          tick();

          let jsonFromBackEnd = JSON.parse(resFromBackEnd.text());
          expect(jsonFromBackEnd).toEqual(response);
        })
      ));

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
