// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
// set of prototype methods like add the book to the ui
function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Show ALert
UI.prototype.showAlert = function(msg, className) {
    // Create div
    const div = document.createElement('div');
    // Add Class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(msg));

    // Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}

// Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        // Show message
    this.showAlert("Book Removed!", "success")
    }
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}


// Event Listeners
document.getElementById("book-form").addEventListener("submit", 
function(e){
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;
    
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiat UI
    const ui = new UI();

    // Validate
    if(!title || !author || !isbn ){
        // alert("failed")
        ui.showAlert('Please fill in all fields', 'error')
    }else{

    // Add book to list
    ui.addBookToList(book);
    
    // SHow success
    ui.showAlert("Book Added!", 'success')

    // CLear fields
    ui.clearFields();
    }
    e.preventDefault();
});

// Event listner for delete
document.getElementById("book-list").addEventListener('click', function(e){
    const ui = new UI();
    // Delete book
    ui.deleteBook(e.target);
    
    e.preventDefault();
});