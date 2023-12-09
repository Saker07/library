class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  static addBookToLibrary(library) {
    let book;
    let title, author, pages, read;
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = document.querySelector("#read").checked;
    book = new Book(title, author, pages, read);
    library.push(book);
    localStorage.setItem("library", JSON.stringify(library));
    this.displayLibrary();
    this.resetBookForm();
  }

  static editBook(e) {
    let book = e.target.parentElement
      .closest("[data-key]")
      .getAttribute("data-key");
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
    read.checked = library[book].read;
    //remove all event listeners from node
    editB = removeAllEventListeners(editB);
    editB.textContent = "Edit";
    console.log(`Book index: ${book}`);
    editB.addEventListener("click", function (e) {
      Book.editBookToLibrary(book);
    });
  }
  static editBookToLibrary(i) {
    let book;
    let title, author, pages, read;
    let editB;
    editB = document.querySelector(".add");
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = document.querySelector("#read").checked;
    book = new Book(title, author, pages, read);
    library.splice(i, 1, book);
    localStorage.setItem("library", JSON.stringify(library));
    this.displayLibrary();
    this.resetBookForm();
  }
  static removeBook(bookIndex) {
    let removedBook = library.splice(bookIndex, 1)[0];
    this.displayLibrary();
    this.resetBookForm();
    return removedBook;
  }
  static resetBookForm() {
    let editButton = document.querySelector(".add");
    editButton = removeAllEventListeners(editButton);
    editButton.textContent = "Add";
    editButton.addEventListener("click", (e) => {
      this.addBookToLibrary(library);
    });
    let em = document.querySelectorAll("form input");
    em.forEach((elem) => (elem.value = ""));
  }
  static displayLibrary() {
    let cont, elem;
    cont = document.querySelector(".libraryContainer");
    cont.innerHTML = "";
    console.log(cont);
    for (let i = 0; i < library.length; i++) {
      elem = this.createBookElement(library[i], i);
      console.log(elem);
      cont.appendChild(elem);
    }
    let bookEditButtons = document.querySelectorAll(".bookEdit");
    bookEditButtons.forEach((elem) =>
      elem.addEventListener("click", this.editBook, { capture: true })
    );
    let bookDeleteButtons = document.querySelectorAll(".bookDelete");
    bookDeleteButtons.forEach((elem) =>
      elem.addEventListener(
        "click",
        (e) => {
          let bookIndex = e.target.parentElement
            .closest("[data-key]")
            .getAttribute("data-key");
          Book.removeBook(bookIndex);
        },
        { capture: true }
      )
    );
  }
  static createBookElement(book, i) {
    let el, el2;
    let buttonContainer;
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("book");
    containerDiv.setAttribute("data-key", i);
    el = document.createElement("h4");
    el.classList.add("bookTitle");
    el.textContent = book.title;
    containerDiv.appendChild(el);
    el = document.createElement("h5");
    el.classList.add("bookAuthor");
    el.textContent = book.author;
    containerDiv.appendChild(el);
    el = document.createElement("h5");
    el.classList.add("bookPages");
    el.textContent = `Pages: ${book.pages}`;
    containerDiv.appendChild(el);
    el = document.createElement("h5");
    el.classList.add("bookRead");
    el.textContent = book.read ? "Finished" : "Reading";
    containerDiv.appendChild(el);
    buttonContainer = document.createElement("div");
    buttonContainer.classList.add("bookButtonsContainer");
    el = document.createElement("button");
    el.classList.add("bookButton", "bookEdit");
    el.setAttribute("type", "button");
    el2 = document.createElement("h6");
    el2.textContent = "Edit";
    el.appendChild(el2);
    buttonContainer.appendChild(el);
    el = document.createElement("button");
    el.classList.add("bookButton", "bookDelete");
    el.setAttribute("type", "button");
    el2 = document.createElement("h6");
    el2.textContent = "Delete";
    el.appendChild(el2);
    buttonContainer.appendChild(el);
    containerDiv.appendChild(buttonContainer);
    return containerDiv;
  }
}

let library = JSON.parse(localStorage.getItem("library"));
let el;
el = document.querySelector(".add");
el.addEventListener("click", () => {
  Book.addBookToLibrary(library);
});

/*  */
if (!library) {
  library = [];
  let ex = new Book("title", "author", "5", true);
  library.push(ex);
}
Book.displayLibrary();
/*  */

function removeAllEventListeners(nodeElement) {
  let newNode = nodeElement.cloneNode({ deep: true });
  nodeElement.replaceWith(newNode);
  return newNode;
}
