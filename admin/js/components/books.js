class BookActions {
    static async initiateBookActions() {
        await this.loadBooks(null);
    }
    static async loadBooks(query=null) {
        const listLoader = document.querySelector('#books .list-loader-container');
        listLoader.style.display = 'block';

        const booksList = document.querySelector('#books-list');
        booksList.innerHTML = "";
        const books = await BookService.getBooks(query)
        const items = books.data.map((elem)=>{
            return `
                <div class="book-item">
                    <div class="book-image">
                        <img src="${elem.cover}" alt="book_cover"/>
                    </div>
                    <h3>${elem.title}</h3>
                    <div class="book-actions">
                        <button class="pub-btn 
                            ${elem.isPublished ? "unpublish-button" : "publish-button"} button" itemId="${elem._id}">
                            ${elem.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button class="edit-button button" itemId="${elem._id}">Edit</button>
                        <button class="delete-button button" itemId="${elem._id}">Delete</button>
                    </div>
                </div>
            `
        })
        listLoader.style.display = 'none';
        booksList.innerHTML = items.join("");
        const bookPublishButtons = document.querySelectorAll('.book-item .pub-btn');
        bookPublishButtons.forEach(btn=>{
            btn.onclick = (event)=>{
                BookActions.changeVisibility(event.target);
            }
        })

        const editBookBtns = document.querySelectorAll('#books .edit-button');
        const editBookBox = document.getElementById('edit-book-box');
        [...editBookBtns].forEach(btn=>{
            btn.onclick = async(event)=>{
                const id = event.target.getAttribute('itemId');
                await BookActions.loadBook(id);
                editBookBox.style.visibility = 'visible';       
            }
        })
        
        const deleteBookBtns = document.querySelectorAll('#books .delete-button');
        [...deleteBookBtns].forEach(btn=>{
            btn.onclick =  async(event)=>{
                const id = event.target.getAttribute('itemId');
                await BookActions.deleteBook(id);    
            }
        })

        const createCancelButton = document.querySelector('#create-book-box .cancel-button');
        createCancelButton.onclick = ()=>{
            const createBookBox = document.getElementById("create-book-box");
            createBookBox.style.visibility = 'collapse';
        }

        const createBookCover = document.getElementById('create-book-cover');
        const coverInput = document.querySelector('#create-book-form input[name="cover"]');
        const coverButton = document.getElementById('create-upload-cover-button');
        const cancelButton = document.querySelector('#create-book-form .cancel-button');
        coverButton.onclick = ()=>{
            coverInput.click();
        }
        coverInput.onchange = function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    createBookCover.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        cancelButton.onclick = ()=>{
            const createBookBox = document.getElementById("create-book-box");
            createBookBox.style.visibility = 'collapse';
        }

        const createBookForm = document.getElementById('create-book-form')
        createBookForm.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(createBookForm);
            try { 
                await BookActions.createBook(formData);
            } catch {}
        }

        const searchForm = document.getElementById('book-search-form');
        const searchInput = document.getElementById('book-search');
        searchForm.onsubmit = async (event) => {
            event.preventDefault();
            const query = {
                search: searchInput.value
            }
            await this.loadBooks(query);
        }
    }

    static async deleteBook(itemId) {
        const confirmDeletion = confirm("Are you sure you want to delete the book?")
        if (confirmDeletion) {
            await BookService.deleteBook(itemId);
            await this.loadBooks(null);
        }
    }

    static async loadBook(id) {
        const { data } = await BookService.getBookById(id);
        const editBookCover = document.getElementById('edit-book-cover');
        const form = document.getElementById('edit-book-form')
        const titleField = document.querySelector('#edit-book-form input[name="title"]');
        const linkField = document.querySelector('#edit-book-form input[name="link"]');

        const validationErrorBoxes = document.querySelectorAll('#edit-book-box .validation-error');
        [...validationErrorBoxes].forEach(elem=>elem.innerText = "");

        titleField.value = data.title;
        linkField.value = data.link;
        editBookCover.src = data.cover;
        const coverInput = document.querySelector('#edit-book-form input[name="cover"]');
        const coverButton = document.getElementById('edit-upload-cover-button');
        const cancelButton = document.querySelector('#edit-book-form .cancel-button');
        coverButton.onclick = ()=>{
            coverInput.click();
        }
        coverInput.onchange = function(){
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    editBookCover.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        cancelButton.onclick = ()=>{
            const editBookBox = document.getElementById("edit-book-box");
            editBookBox.style.visibility = 'collapse';
        }
        form.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(form);
            await BookActions.updateBook(id, formData)
        };
    }

    static async createBook(body) {
        const createBookBox = document.getElementById('create-book-box');
        const form = document.getElementById('create-book-form');
        const coverOutput = document.getElementById("create-book-cover");
        const loader = document.querySelector('#create-book-box .loader-container');
        try {
            const validationErrorBoxes = form.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await BookService.createBook(body);
            if (res.success) {
                await this.loadBooks();
                createBookBox.style.visibility = 'collapse';
                form.reset();
                coverOutput.src = "images/upload_image.svg";
            } else {
                this.outputValidationErrors(res.validationErrors, createBookBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'collapse';
            console.error(error);
        }
    }

    static async updateBook(id, body) {
        const editBookBox = document.getElementById('edit-book-box');
        const loader = document.querySelector('#edit-book-box .loader-container');
        try {
            const validationErrorBoxes = editBookBox.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await BookService.updateBook(body, id);
            if (res.success) {
                await this.loadBooks();
                editBookBox.style.visibility = 'collapse';
            } else {
                this.outputValidationErrors(res.validationErrors, editBookBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'visible';
            console.error(error);
        }
    }

    static async changeVisibility(elem) {
        const id = elem.getAttribute('itemId');
        const isPublished = !elem.classList.contains('publish-button');
        await BookService.changeVisibility(id, isPublished);
        if (isPublished)
            elem.classList.replace('unpublish-button', 'publish-button')
        else    
            elem.classList.replace('publish-button', 'unpublish-button')
        elem.innerText = isPublished ? "Publish" : "Unpublish"
    }

    static async outputValidationErrors(errors, formElement) {
        errors.forEach(err=>{
            const {property, message} = err;
            const box = formElement.querySelector(`.${property}-validation-error`)
            box.innerHTML += `<span>${message}<span><br/>` 
        })
    }
}