import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,
  Validators, AbstractControl, FormControl } from '@angular/forms';

import { BookModel } from '../../models/book/book.model';

@Component({
  selector: 'book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  book: BookModel;
  activeForm: string = 'reactive';

  constructor(fb: FormBuilder, private route: ActivatedRoute) {
    this.bookEditForm = fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: [''],
      price: ['']
    });
    route.params.subscribe(res => {
      this.book = BookModel.find(res['title']);
      if(this.book == null) {
        this.book = new BookModel('', '', '', 0);
      }
    });
  }

  ngOnInit() {
  }

}
