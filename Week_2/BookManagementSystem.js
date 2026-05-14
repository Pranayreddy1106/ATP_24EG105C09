class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAvailable = true;
  }
  borrow() {
    //Marks the book as not available
    this.isAvailable = false;
  }
  returnBook() {
    //Marks the book as available
    this.isAvailable = true;
  }
  getInfo() {
    //Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
    return `${this.title} by ${this.author} (${this.pages} pages)`;
  }
  isLongBook() {
    //Returns true if pages > 300, false otherwise
    return this.pages > 300;
  }
}

const book1 = new Book("Harry Potter", "J.K. Rowling", 350);
const book2 = new Book("1984", "George Orwell", 328);
const book3 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
const book4 = new Book("The Alchemist", "Paulo Coelho", 208);
const book5 = new Book("Atomic Habits", "James Clear", 320);

const library = [book1, book2, book3, book4, book5];

//Display info of all books
console.log("All Books:");
library.forEach(book => {
  console.log(book.getInfo());
});

// Borrow 2 books
book1.borrow();
book3.borrow();
console.log("Borrowed Books Status:");
console.log(book1.title, "Available:", book1.isAvailable);
console.log(book3.title, "Available:", book3.isAvailable);

// Return 1 book
book1.returnBook();
console.log("After Returning:");
console.log(book1.title, "Available:", book1.isAvailable);
//Count how many books are "long books" (more than 300 pages)
let longBooks = library.filter(book => book.isLongBook())
console.log("\nNumber of long books:", longBooks.length);