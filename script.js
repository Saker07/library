let library = [];
let el;
el = document.querySelector(".add");
el.addEventListener("click", addBookToLibrary)

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e){
    let book;
    let title, author, pages, read;
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = document.querySelector("#read").value;
    book = new Book(title, author, pages, read);
    library.push(book);
}

function displatLibrary(){
    
}

function createBookElement(book){
    let el;
    let item = document.createElement("div");
    item.classList.add("book");
    el = document.createElement("h4");
    el.classList.add("bookTitle");
    el.textContent = book.title;
    item.appendChild(el);
    el = document.createElement("h5");
    el.classList.add("bookAuthor");
    el.textContent = book.author;
    item.appendChild(el);
    el = document.createElement("h5");
    el.classList.add("bookPages");
    el.textContent = `Pages: ${book.pages}`;
    item.appendChild(el);
    el = document.createElement("h5");
    el.classList.add("bookRead");
    el.textContent = pages.read ? "Finished" : "Reading";
    item.appendChild(el);
    el = document.createElement("button");
    el.classList.add("bookButton", "bookEdit");
    el.setAttribute("type", "button");
    el.textContent = "Edit";
    item.appendChild(el);
    el = document.createElement("button");
    el.classList.add("bookButton", "bookDelete");
    el.setAttribute("type", "button");
    el.textContent = "Delete";
    item.appendChild(el);
    return item;
}