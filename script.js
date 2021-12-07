let myLibrary = [];
let globalBookIndex=0;
const container=document.querySelector('#container');
const form=document.querySelector('#newBookForm');
const addBook=document.querySelector('#addBook');
const bookTitle=document.querySelector('#bookTitle');
const bookAuthor=document.querySelector('#bookAuthor');
const bookPages=document.querySelector('#bookPages');
const readBook=document.querySelector('#readBook');
const submit=document.querySelector('#submitForm');

function Book(title,author,pages,read){
    //constructor
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(name,author,pages,status){
    //do things in here     
    if(name==''|| author == '' || pages == '')
        return false;
    if(status==true){
        status="Read";
    }else
        status='Not Read';
    myLibrary[globalBookIndex]= new Book(name,author,pages,status);
    globalBookIndex++;       
    return true;     
}

function displayBooks(){
    container.innerHTML='';
    for(let bookIndex=0;bookIndex<myLibrary.length;bookIndex++){
    container.innerHTML +=  `<div class="bookData">
    <p>${myLibrary[bookIndex].title}</p>
    <p>${myLibrary[bookIndex].author}</p>
    <p>${myLibrary[bookIndex].pages}</p>
    <p>${myLibrary[bookIndex].read}</p>
    </div>`;
    }
}

submit.addEventListener('click',function(e) {
    e.preventDefault();
    if(!addBookToLibrary(bookTitle.value,bookAuthor.value,bookPages.value,readBook.checked)){ //if false is returned exit the function
        alert("all fields required");
        return;
    }
    displayBooks();
    document.getElementById("newBookForm").style.display = "none";
});

addBook.addEventListener('click',() =>{
    document.getElementById("newBookForm").style.display = "block";
    console.log("triggered");
});
