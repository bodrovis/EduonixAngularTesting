export interface BookInterface {
  image: string,
  title: string,
  description: string,
  price: number,
  upvotes: number
}

export class BookModel implements BookInterface {
  constructor(public image:string,
    public title: string,
    public description: string,
    public price: number,
    public upvotes: number = 0
  ) { }

  destroy() {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    books.forEach((item, index) => {
      if (item.title == this.title) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    return null;
  }

  public static query() {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    return books;
  }

  save() {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    books.forEach((item, index) => {
      if (item.title == this.title) books.splice(index, 1);
    });
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }

  public static find(title: string) {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    for (let book of books) {
      if (book.title == title) return new BookModel(book.image,
        book.title,
        book.description,
        book.price,
        book.upvotes)
      }
      return null;
    }
  }
