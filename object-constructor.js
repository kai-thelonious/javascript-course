/*function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    // this.info = `${this.title} by ${this.author}, ${this.pages}, ${this.read ? "read" : "not read yet"}`
    // return this.info
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? "read" : "not read yet"}`
    }
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)

console.log(theHobbit.info())*/

// Assignment
let myLibrary = []
const card = document.querySelector('#card')
const button = document.querySelector('button')


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false)
addBookToLibrary('yjyj', 'yjyj', 200, false)
addBookToLibrary('Basdasd', 'yjyjdf', 105, true)



displayEachBook(myLibrary)

button.addEventListener("click", () => {
    const form = document.querySelector('.form-container')

    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden')
        form.classList.add('visible')
    } else {
        form.classList.remove('visible')
        form.classList.add('hidden')
    }
})

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
        //console.log(myLibrary)

        displayEachBook()
        form.reset()
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

/*function displayEachBook() {
    card.innerHTML = ''
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div')
        bookCard.classList.add('book-card')

        const title = document.createElement('h3')
        title.textContent = book.title

        const author = document.createElement('p')
        author.textContent = `Author: ${book.author}`

        const pages = document.createElement('p')
        pages.textContent = `Pages: ${book.pages}`

        const read = document.createElement('p')
        read.textContent = `Status: ${book.read ? 'Read' : 'Not read yet'}`

        const button = document.createElement('button')
        button.textContent =

        bookCard.appendChild(title)
        bookCard.appendChild(author)
        bookCard.appendChild(pages)
        bookCard.appendChild(read)

        card.appendChild(bookCard)
    })
}*/


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
        // Append the new card HTML to the accumulating string
        allCardsHTML += cardHTML;
    });

    // 2. INSERT ALL HTML AT ONCE (efficient)
    card.innerHTML = allCardsHTML;

    // 3. ATTACH LISTENERS TO THE NEW BUTTONS
    attachBookEventListeners()

}

// NOTE: You must have these listener functions defined and working elsewhere:
function attachBookEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-btn')

    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const bookId = e.target.dataset.id
            console.log('Clicked remove for ID:', bookId)

            // Find the card in the DOM using the data-id attribute
            const cardToRemove = document.querySelector(`.book-card[data-id="${bookId}"]`)

            if (cardToRemove) {
                console.log('Found card to remove', cardToRemove)
                // Option 1: Remove from DOM directly
                cardToRemove.remove()
                
                // Option 2 (Better): Remove from array and re-render
                // removeBookFromLibrary(bookId)
                // displayEachBook()
            }
        })
    })
    const readButton = document.querySelectorAll('.toggle-read-btn')

    readButton.forEach(button => {
        button.addEventListener("click", (e) => {
            const bookId = e.target.dataset.id
            toggleReadStatus(bookId)

            /*
            console.log(cardToChange)
            Book.changeRead()*/
        })
    })


   /* readButton.forEach(button => {
        button.addEventListener("click", (e) => {
            //const bookId = e.target.dataset.id
            //const cardToChange = document.querySelector(`.book-card[data-id="${bookId}"]`)

            console.log('click')
            //console.log(Book.changeRead())

        })
    })*/
}


function removeBookFromLibrary(bookId) {

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
