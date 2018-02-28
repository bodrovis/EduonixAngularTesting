export interface BookInterface {
  image: string,
  title: string,
  description: string,
  price: number,
  upvotes: number,
  genre?: object,
  category?: string
}

export class BookModel implements BookInterface {
  constructor(public image:string,
    public title: string,
    public description: string,
    public price: number,
    public upvotes: number = 0,
    public genre: object = {},
    public category: string = 'not defined'
  ) { }

  getData(): object {
    const result = {};
    Object.keys(this).map(key => result[key] = this[key]);
    return result;
  }

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

  save() {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    books.forEach((item, index) => {
      if (item.title == this.title) books.splice(index, 1);
    });
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }

  public static query() {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    let bookModels:BookModel[] = []
    for (let book of books) {
      bookModels.push(new BookModel(book.image,
                                    book.title,
                                    book.description,
                                    book.price,
                                    book.upvotes,
                                    book.genre,
                                    book.category));
    }
    return bookModels;
  }

  public static find(title: string) {
    let books:Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    for (let book of books) {
      if (book.title == title) return new BookModel(book.image,
        book.title,
        book.description,
        book.price,
        book.upvotes,
        book.genre,
        book.category)
      }
      return null;
    }
  }
