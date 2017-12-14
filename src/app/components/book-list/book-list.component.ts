import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book/book.model';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: BookModel[] = [];

  constructor() {
    this.books = BookModel.query();
  }

  ngOnInit() {
  }

}
