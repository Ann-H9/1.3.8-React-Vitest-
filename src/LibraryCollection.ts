export class LibraryCollection {
  private books: Map<string, { title: string; author: string }>;

  constructor() {
    this.books = new Map();
  }


 addBook(title: string, author: string): string | Error {
    for (const [_, book] of this.books) {
      if (book.title === title) {
        return new Error('!Книга с таким названием уже существует!');
      }
    }
     const id = crypto.randomUUID();
    this.books.set(id, { title, author });
    return id;
  }

  removeBook(id: string): void {
    this.books.delete(id);
  }

  getBookInfo(id: string): { title: string; author: string } | null {
    return this.books.get(id) || null;
  }

  getAllBooks(): Array<{ id: string; title: string; author: string }> {
    return Array.from(this.books.entries()).map(([id, book]) => ({
      id,
      ...book,
    }));
  }

  getBooksCount(): number {
    return this.books.size;
  }
}