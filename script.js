let library = [];
let el;
el = document.querySelector(".add");
el.addEventListener("click", addBookToLibrary);
el.addEventListener("click", displayLibrary);

/*  */
let ex = new Book("title", "author", "5", true);
library.push(ex);
/*  */
let a = document.querySelectorAll(".bookEdit");
a.forEach(elem => elem.addEventListener("click", editBook, {capture:true}));


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
    el.addEventListener("click", resetForm);
}

function editBook(e){
    let book = e.target.parentElement.id;
    let title, author, pages, read, editB;
    title = document.querySelector("#title");
    author = document.querySelector("#author");
    pages = document.querySelector("#pages");
    read = document.querySelector("#read");
    editB = document.querySelector(".add");
    console.log(book);
    title.value = library[book].title;
    author.value = library[book].author;
    pages.value = library[book].pages;
    read.value = library[book].read;
    editB.textContent = "Edit";
    editB.removeEventListener("click", addBookToLibrary);
    editB.addEventListener("click", editBookToLibrary);
}
function editBookToLibrary(i){
    let book;
    let title, author, pages, read;
    let editB;
    editB = document.querySelector(".add");
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = document.querySelector("#read").value;
    book = new Book(title, author, pages, read);
    library.splice(i, 1, book);
    editB.textContent = "Add";
    editB.removeEventListener("click", editBookToLibrary)
    el.addEventListener("click", resetForm);
}
function resetForm(){
    let em= document.querySelectorAll("form input");
    em.forEach(elem => elem.value="")
}

function displayLibrary(){
    let cont, elem;
    cont = document.querySelector(".libraryContainer");
    cont.innerHTML = "";
    console.log(cont);
    for(let i = 0; i<library.length; i++){
        elem = createBookElement(library[i], i);
        console.log(elem);
        cont.appendChild(elem);
    }
    let a = document.querySelectorAll(".bookEdit");
    a.forEach(elem => elem.addEventListener("click", editBook, {capture:true}));
}

function createBookElement(book, i){
    let el, el2;
    let item = document.createElement("div");
    item.classList.add("book");
    item.id = i;
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
    el2 = document.createElement("h6")
    el2.textContent = "Edit";
    el.appendChild(el2);
    item.appendChild(el);
    el = document.createElement("button");
    el.classList.add("bookButton", "bookDelete");
    el.setAttribute("type", "button");
    el2 = document.createElement("h6")
    el2.textContent = "Delete";
    el.appendChild(el2);
    item.appendChild(el);
    return item;
}