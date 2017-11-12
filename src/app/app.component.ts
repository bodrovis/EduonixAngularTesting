import { Component } from '@angular/core';
import { BookInterface, BookModel } from './models/book/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public book: BookModel = new BookModel(
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Tom_Sawyer_1876_frontispiece.jpg',
    'Tom Sawyer',
    `Thomas "Tom" Sawyer is the title character of the Mark Twain novel The Adventures of Tom Sawyer`,
    15,
    0
  );
}
