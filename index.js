class Book {
    constructor(title, author, ISBN, price, availability, type) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.price = price;
        this.availability = availability;
        this.type = type;
    }
} //class which presents formula of books

class User {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.cart = new Cart();
    }

    addToCart(book) {
        this.cart.addBook(book)
    }
} //class which presents formula of users

class Cart {
    constructor() {
        this.items = []
    }

    addBook(book) {
        this.items.push(book)
    }

    removeBook(isbn) {
        this.items = this.items.filter((book) => book.isbn !== isbn);
    }

    calculatePrice() {
        let totalPrice = 0;
        for (const book of this.items) {
            totalPrice += book.price;
        }
        return totalPrice;
    }

    clearCart() {
        this.items = [];
    }

    getitems() {
        return this.items;
    }
} //class of users carts, where all orders locate

class Order {
    constructor(userInfo, orderedBooks, userCart) {
        this.userInfo = userInfo.email; //here we can get info about user, whether it is name, id or email
        this.orderedBooks = orderedBooks; //there is array of orderedbooks
        this.cart = userCart; //here 
    }
//inheriting method calculatePrice() from Cart class
    calculatePrice() {
        return this.cart.calculatePrice()
    }

    displayDetails() {
        console.log('Order info:');
        console.log(`User: ${this.userInfo}`);
        console.log('Ordered books:');
        this.orderedBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} by ${book.author} - $${book.price.toFixed(2)}`);
        }); //and here we use cycle forEach to display info about every ordered book 
        console.log(`Total Price: $${this.calculatePrice().toFixed(2)}`); //getting totalPrice of books from user
    }
} //

//Instantiating Book and User objects
const book1 = new Book('The Murder of Roger Ackroyd', 'Agatha Christie', 1, 11, true, 'mystery');
const book2 = new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 2, 25, true, 'fiction');
const book3 = new Book('Animal Farm', 'George Orwell', 3, 9, true, 'political');
const book4 = new Book('Holly', 'Stephen King', 4, 8, true, 'fiction');

const user1 = new User('Anna', 'anna.fuhrmann@example.com', 11);
const user2 = new User('Tony', 'tony.williams@example.com', 22);
const user3 = new User('Alex', 'alex.garcia@example.com', 33);

user1.addToCart(book1);
user1.addToCart(book3);
user2.addToCart(book2);
user3.addToCart(book1);
user3.addToCart(book2);
user3.addToCart(book4);

//example of normal displaying carts
console.log(`${user1.name}'s Cart:`);
user1.cart.items.forEach((book, index) => {
    console.log(`${index + 1}. ${book.title} by ${book.author} - $${book.price.toFixed(2)}`);
});
console.log(`Total Price: $${user1.cart.calculatePrice().toFixed(2)}`);

console.log(`${user2.name}'s Cart:`);
user2.cart.items.forEach((book, index) => {
    console.log(`${index + 1}. ${book.title} by ${book.author} - $${book.price.toFixed(2)}`);
});
console.log(`Total Price: $${user2.cart.calculatePrice().toFixed(2)}`);

console.log(`${user3.name}'s Cart:`);
user3.cart.items.forEach((book, index) => {
    console.log(`${index + 1}. ${book.title} by ${book.author} - $${book.price.toFixed(2)}`);
});
console.log(`Total Price: $${user3.cart.calculatePrice().toFixed(2)}`);

//example of displaying carts with help of classes :)
const order1 = new Order(user1, [book1, book3], user1.cart);
const order2 = new Order(user2, [book2], user2.cart);
const order3 = new Order(user2, [book1, book2, book4], user3.cart);

order1.displayDetails();
order2.displayDetails();
order3.displayDetails();