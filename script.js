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

function findIdIndex(elemId){
    for(let i=0;i<myLibrary.length;i++){
        if(myLibrary[i].index==parseId(elemId)){
            console.log(i);
            return i;
        }
    }
    return -1;
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
    this.index=bookIndex; //this represents its id value
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
    readButtons= document.querySelectorAll(".readButton"); //updates node list
    delButtonVal=document.querySelectorAll(`.delButton`);
    eventListenerForDelete();
    eventListenerForButtons();
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
        if(myLibrary[findIdIndex(elem.id)].read == "Read"){ //toggle button status
            myLibrary[findIdIndex(elem.id)].read = "Not Read";
        }else
            myLibrary[findIdIndex(elem.id)].read = "Read"; 
        const readButtonVal=document.querySelector(`#i${myLibrary[findIdIndex(elem.id)].index}`);
        readButtonVal.innerText=myLibrary[findIdIndex(elem.id)].read;
    })
})
}

function eventListenerForDelete(){
    delButtonVal.forEach(function(elem){
        elem.addEventListener("click",function(e){
            myLibrary.splice(findIdIndex(elem.id),1);
            delButtonVal=document.querySelectorAll(`.delButton`);
            displayBooks();//update display
            globalBookIndex--;//decrement index
                }
           )
        }
    )
}
    
