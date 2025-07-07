import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });

  it('should add a book and return its id', () => {
    const result = library.addBook('The Hobbit', 'J.R.R. Tolkien');
    expect(typeof result).toBe('string');
    expect(result).not.toBeInstanceOf(Error);
  });

  it('should return error when adding a book with existing title', () => {
    library.addBook('The Hobbit', 'J.R.R. Tolkien');
    const result = library.addBook('The Hobbit', 'J.R.R. Tolkien');
    expect(result).toBeInstanceOf(Error);
  });

  it('should remove a book by id', () => {
    const id = library.addBook('The Hobbit', 'J.R.R. Tolkien') as string;
    expect(library.getBooksCount()).toBe(1);
    library.removeBook(id);
    expect(library.getBooksCount()).toBe(0);
  });

  it('should get book info by id', () => {
    const id = library.addBook('The Hobbit', 'J.R.R. Tolkien') as string;
    const info = library.getBookInfo(id);
    expect(info).toEqual({
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
    });
  });

  it('should return null for non-existent book id', () => {
    const info = library.getBookInfo('non-existent-id');
    expect(info).toBeNull();
  });

  it('should get all books', () => {
    const id1 = library.addBook('The Hobbit', 'J.R.R. Tolkien') as string;
    const id2 = library.addBook('1984', 'George Orwell') as string;

    const allBooks = library.getAllBooks();
    expect(allBooks).toEqual([
      { id: id1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
      { id: id2, title: '1984', author: 'George Orwell' },
    ]);
  });

  it('should get books count', () => {
    expect(library.getBooksCount()).toBe(0);
    library.addBook('The Hobbit', 'J.R.R. Tolkien');
    expect(library.getBooksCount()).toBe(1);
    library.addBook('1984', 'George Orwell');
    expect(library.getBooksCount()).toBe(2);
  });

  it('should handle multiple operations correctly', () => {
   
    const id1 = library.addBook('Book 1', 'Author 1') as string;
    const id2 = library.addBook('Book 2', 'Author 2') as string;

    
    expect(library.getBooksCount()).toBe(2);

   

    library.removeBook(id1);
    expect(library.getBooksCount()).toBe(1);

   

    const remainingBook = library.getBookInfo(id2);
    expect(remainingBook).toEqual({
      title: 'Book 2',
      author: 'Author 2',
    });

   

    const error = library.addBook('Book 2', 'Author 3');
    expect(error).toBeInstanceOf(Error);
  });
});
