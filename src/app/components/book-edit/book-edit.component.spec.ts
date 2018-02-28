import { async, ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { BookModel } from '../../models/book/book.model';
import { TreeComponent } from '../../components/tree/tree.component';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { By }           from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookEditComponent } from './book-edit.component';
import { NgInitDirective } from '../../directive/ng-init/ng-init.directive';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditComponent, TreeComponent, NgInitDirective ],
      imports: [ RouterTestingModule, ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  afterEach(() => {
    if(component.book) {
      component.book.destroy();
    }
  });

  function fillTheForm(image, title, description, price) {
    component.bookEditForm.controls['image'].setValue(image);
    component.bookEditForm.controls['title'].setValue(title);
    component.bookEditForm.controls['description'].setValue(description);
    component.bookEditForm.controls['price'].setValue(price);
  }

  it('should have dynamic form working right',
    fakeAsync(() => {
      component.activeForm = 'dynamicForm';
      fixture.detectChanges();
      let form = component.bookEditDynamic;
      let elements = component.question['children'];
      let ethalonObject:any = {};

      for(let el of elements) {
        if(el.type == 'input') {
          let value = faker.lorem.sentence();
          form.get(el.paramName).setValue(value);
          ethalonObject[el.paramName] = value;
        }
        if(el.type == 'select') {
          let option = el.options[Math.floor(Math.random() * el.options.length)];
          component.book[el.paramName] = option.paramName;
          fixture.detectChanges();
          ethalonObject[el.paramName] = option.paramName;
        }
        if(el.type == 'checkbox') {
          form.controls[el.paramName].setValue(true);
          ethalonObject[el.paramName] = true;
        }
      }

      let button = fixture.debugElement.
      query(By.css('button[type="submit"]')).nativeElement;

      button.click();
      let bookFromStorage = BookModel.find(ethalonObject['title']);
      expect<any>(bookFromStorage).toEqual(component.book);
    })
  );

  it('should have title error if less than 3 symbols provided',
    fakeAsync(() => {
      component.activeForm = 'templateDriven';
      fixture.detectChanges();
      let form = component.templateForm.form;
      tick();
      form.setValue({
        title2: 'te',
        image2: 'http://test.com',
        description2: 'none',
        price2: 100
      });
      form.controls.title2.markAsTouched();
      fixture.detectChanges();
      expect(form.controls.title2.errors).toBeTruthy();
      expect(nativeElement.querySelector('.title-group').textContent).
      toContain('Title must be at least 3 characters long.')
    })
  );

  it('should have price error if incorrect value provided',
    fakeAsync(() => {
      component.activeForm = 'templateDriven';
      fixture.detectChanges();
      let form = component.templateForm.form;
      tick();
      form.setValue({
        title2: 'test',
        image2: 'http://test.com',
        description2: 'none',
        price2: '$100'
      });
      form.controls.title2.markAsTouched();
      fixture.detectChanges();
      expect(form.controls.price2.errors).toBeTruthy();

      form.controls.price2.setValue('100');
      expect(form.get('price2')).toBeTruthy();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have blank fields in reactive form', () => {
    expect(component.bookEditForm.value).toEqual({
      image: '',
      title: '',
      description: '',
      price: ''
    })
  });

  it('should have submit button if required fields are not filled in',
    fakeAsync(() => {
      let spy = spyOn(component, 'submitReactiveForm');
      fillTheForm('', '', faker.lorem.paragraph(), faker.commerce.price());
      let button = nativeElement.querySelector('#reactiveSubmitButton');
      button.dispatchEvent(new Event('click'));
      expect(spy).not.toHaveBeenCalled();
      expect(button.hasAttribute('disabled')).toBe(true);
    })
  );

  it('should have submit enabled if required fields are filled in',
    fakeAsync(() => {
      let spy = spyOn(component, 'submitReactiveForm').and.callThrough();

      fillTheForm(
        faker.image.image(),
        faker.lorem.sentence(),
        faker.lorem.paragraph(),
        faker.commerce.price()
      );

      fixture.detectChanges();
      let button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();
      tick();
      expect(spy).toHaveBeenCalled();
      let bookFromStorage = BookModel.find(component.book.title);
      expect(bookFromStorage).toEqual(component.book);
    })
  );
});
