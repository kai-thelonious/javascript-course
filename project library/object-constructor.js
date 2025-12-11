let myLibrary = []
const card = document.querySelector('#card')
const newBookBtn = document.querySelector('#new-book-btn')

const sampleTitles = [
    "The Great Gatsby", "1984", "Pride and Prejudice", "To Kill a Mockingbird",
    "The Catcher in the Rye", "Moby Dick", "War and Peace", "Ulysses",
    "The Odyssey", "Hamlet", "Don Quixote", "The Divine Comedy"
];
const sampleAuthors = [
    "F. Scott Fitzgerald", "George Orwell", "Jane Austen", "Harper Lee",
    "J.D. Salinger", "Herman Melville", "Leo Tolstoy", "James Joyce",
    "Homer", "William Shakespeare", "Miguel de Cervantes", "Dante Alighieri"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 5; i++) {
    const randomTitle = sampleTitles[getRandomInt(0, sampleTitles.length - 1)];
    const randomAuthor = sampleAuthors[getRandomInt(0, sampleAuthors.length - 1)];
    const randomPages = getRandomInt(100, 1000);
    const randomRead = Math.random() < 0.5;

    addBookToLibrary(randomTitle, randomAuthor, randomPages, randomRead);
}

displayEachBook(myLibrary)

newBookBtn.addEventListener("click", () => {
    const form = document.querySelector('.form-container')

    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden')
        form.classList.add('visible')
    } else {
        form.classList.remove('visible')
        form.classList.add('hidden')
    }
})

// check form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const elements = form.elements
        const title = elements[0].value
        const author = elements[1].value
        const pages = elements[2].value
        let read = elements[3].checked

        console.log(elements[3].checked)

        addBookToLibrary(title, author, pages, read)
        displayEachBook()
        form.reset()
        
        // Hide form after submission
        const formContainer = document.querySelector('.form-container')
        formContainer.classList.add('hidden')
        formContainer.classList.remove('visible')
    })

})

// Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.uniqueId = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
    const addBook = new Book(title, author, pages, read)
    myLibrary.push(addBook)
    return myLibrary

}

function displayEachBook() {
    // 1. CLEAR THE CONTAINER
    card.innerHTML = '';

    // Use a string to build all the HTML content efficiently
    let allCardsHTML = '';

    myLibrary.forEach(book => {
        // Use innerHTML structure (template literal) to build the card
        const cardHTML = `
            <div class="book-card" data-id="${book.uniqueId}">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p class="read-status">Status: <span>${book.read ? "Read" : "Not Read Yet"}</span></p>
                
                <div class="card-actions">
                    <button 
                        type="button" 
                        class="remove-btn" 
                        data-id="${book.uniqueId}" 
                    >
                        Remove Book
                    </button>
                    <button 
                        type="button" 
                        class="toggle-read-btn" 
                        data-id="${book.uniqueId}"
                    >
                        Mark as ${book.read ? "Unread" : "Read"}
                    </button>
                </div>
            </div>
        `;
        allCardsHTML += cardHTML;
    });

    card.innerHTML = allCardsHTML;
    attachBookEventListeners()

}

function attachBookEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-btn')
    const readButton = document.querySelectorAll('.toggle-read-btn')

    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const bookId = e.target.dataset.id
            console.log('Clicked remove for ID:', bookId)
            removeBookFromLibrary(bookId)

        })
    })

    readButton.forEach(button => {
        button.addEventListener("click", (e) => {
            const bookId = e.target.dataset.id
            toggleReadStatus(bookId)

        })
    })
}


function removeBookFromLibrary(bookId) {
    myLibrary = myLibrary.filter(book => book.uniqueId !== bookId)
    displayEachBook()
}

function toggleReadStatus(bookId) {
    myLibrary.forEach(book => {
        if (book.uniqueId === bookId) {
            book.changeRead()
        }
    })
    displayEachBook()
}

Book.prototype.changeRead = function() {
  this.read = !this.read
}
