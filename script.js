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
const exit=document.querySelector('#exit');
let readButtons= document.querySelectorAll(".readButton");
let delButtonVal=document.querySelectorAll(`.delButton`);

//parses the index value of the object from the string. necessary because you cannot start an id with a number
function parseId(idVal){
    let idIndex= idVal.slice(1);
    return Number(idIndex);
}
function clearFields(){ //clears all values in new book form
    bookTitle.value='';
    bookAuthor.value='';
    bookPages.value='';
    readBook.checked=false;
}
function Book(title,author,pages,read,bookIndex){
    //constructor
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.index=bookIndex;
}

function addBookToLibrary(name,author,pages,status){
    //do things in here     
    if(name==''|| author == '' || pages == '')
        return false;
    if(status==true){
        status="Read";
    }else
        status='Not Read';
    myLibrary[globalBookIndex]= new Book(name,author,pages,status,globalBookIndex);
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
    <button id='i${myLibrary[bookIndex].index}' class='readButton'>${myLibrary[bookIndex].read}</button>
    <button id='d${myLibrary[bookIndex].index}' class='delButton'>Delete</button>
    </div>`;
    }
}
//event listener for submit
submit.addEventListener('click',function(e) {
    e.preventDefault();
    if(!addBookToLibrary(bookTitle.value,bookAuthor.value,bookPages.value,readBook.checked)){ //if false is returned exit the function
        alert("all fields required");
        return;
    }
    displayBooks();
    clearFields();
    readButtons= document.querySelectorAll(".readButton"); //updates the node list
    delButtonVal=document.querySelectorAll(`.delButton`);
    eventListenerForButtons(); //add event listeners
    eventListenerForDelete();
});

addBook.addEventListener('click',() =>{
    document.getElementById("newBookForm").style.display = "inline-flex";
    
});

exit.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("newBookForm").style.display = "none";
    clearFields();
})
function eventListenerForButtons(){
readButtons.forEach(function(elem){
    elem.addEventListener("click",function(e){
        if(myLibrary[parseId(elem.id)].read == "Read"){ //toggle button status
            myLibrary[parseId(elem.id)].read = "Not Read";
        }else
            myLibrary[parseId(elem.id)].read = "Read"; 
        const readButtonVal=document.querySelector(`#i${myLibrary[parseId(elem.id)].index}`);
        readButtonVal.innerText=myLibrary[parseId(elem.id)].read;
    })
})
}

function eventListenerForDelete(){//!issue here
    delButtonVal.forEach(function(elem){
        elem.addEventListener("click",function(e){
            const delButtonVal=document.querySelector(`#d${myLibrary[parseId(elem.id)].index}`);
            console.log(elem.id);
            myLibrary.splice(parseId(elem.id),1);
            displayBooks();//update display;
        })
    })
    }
    
