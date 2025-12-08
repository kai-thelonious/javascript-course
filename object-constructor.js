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

        bookCard.appendChild(title)
        bookCard.appendChild(author)
        bookCard.appendChild(pages)
        bookCard.appendChild(read)

        card.appendChild(bookCard)
    })
}
