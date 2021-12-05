let myLibrary = [];
let globalBookIndex=0;
const container=document.querySelector('#container');

function Book(title,author,pages,read){
    //constructor
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(name,author,pages,status){
    //do things in here     
    myLibrary[globalBookIndex]= new Book(name,author,pages,status);
    globalBookIndex++;            
}

function displayBooks(){
    for(let bookIndex=0;bookIndex<myLibrary.length;bookIndex++){
    container.innerHTML +=  `<div class="bookData">
    <p>${myLibrary[bookIndex].title}</p>
    <p>${myLibrary[bookIndex].author}</p>
    <p>${myLibrary[bookIndex].pages}</p>
    <p>${myLibrary[bookIndex].read}</p>
    </div>`;
    }
}

displayBooks();