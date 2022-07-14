// Book Construtor
function Book(title, author ,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){

}

// Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // 建立 tr 元素
    const row = document.createElement('tr');
    
    // 插入 欄位
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book-isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    ` ;
    list.appendChild(row);
}
// show alert
UI.prototype.showAlert = function(message, className){
    // 建立div
    const div = document.createElement('div');
    // 建立classes
    div.className = `alert ${className}`;
    // 建立 text
    div.appendChild(document.createTextNode(message));
    
    // Get parent 找到container
    const container = document.querySelector('.container');
    // Get form  找到div
    const form = document.querySelector('#book-form');
    // 插入 alert (放在container裡面 的form 之前)
    container.insertBefore(div, form);
    // 3秒後訊息消失
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}
// Delete books
UI.prototype.deleteBook = function(target) {
    if(target.className === `delete`){
        target.parentElement.parentElement.remove();
    }
}


// clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';    
}


// Event Listners for add book
document.getElementById('book-form').addEventListener('submit',
    function(e){
        // 取得欄位的值
        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value;                 
        
        const book = new Book(title, author ,isbn);
        
        // 設定UI
        const ui = new UI();

        // 檢驗欄位是否有輸入
        if(title ==='' || author ==='' || isbn === ''){
        
        // ERROR ALERT
        ui.showAlert('每個欄位請都需填入','error');
        } else {
        // 新增書本到清單
        ui.addBookToList(book);

        // UI Show success
        ui.showAlert('書本新增成功', 'success');
        // 清除已輸入的欄位
        ui.clearFields();
        }


        e.preventDefault();
});


// event listner for delete
document.getElementById('book-list').addEventListener('click',function(e){

    // 設定UI
    const ui = new UI();

    // 刪除book
    ui.deleteBook(e.target);

    // show message
    ui.showAlert(`此書刪除成功`, 'success');

    e.preventDefault();
});
