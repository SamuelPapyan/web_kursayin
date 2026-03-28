class TestActions {
    static listLoader;
    static async initiateTestActions() {
        TestActions.listLoader = document.querySelector('#tests .list-loader-container');
        await this.loadTests(null);
    }
    static async loadTests(query=null) {                  
        TestActions.listLoader.style.display = 'block';
        
        const testsList = document.querySelector('#tests-list');       
        testsList.innerHTML = "";
        const tests = await TestService.getTests(query)
        const items = tests.data.map((elem)=>{
            return `
                <div class="test-item">
                    <div class="test-left-box">
                        <img src="${elem.image || "/admin/images/no_image.png"}" alt="test_image" class="test-image"/>
                        <div>
                            <h3>${elem.title}</h3>
                            <p class="answer ${elem.answer === 0 ? "correct-answer" : ""}">${elem.variants[0]}</p>
                            <p class="answer ${elem.answer === 1 ? "correct-answer" : ""}">${elem.variants[1]}</p>
                            <p class="answer ${elem.answer === 2 ? "correct-answer" : ""}">${elem.variants[2]}</p>
                        </div>
                    </div>
                    <div class="test-right-box">
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
        TestActions.listLoader.style.display = 'none';      
        testsList.innerHTML = items.join("");
        
        const testPublishButtons = document.querySelectorAll('.test-item .pub-btn');
        testPublishButtons.forEach(btn=>{
            btn.onclick = (event)=>{
                TestActions.changeVisibility(event.target);
            }
        })

        const editTestBtns = document.querySelectorAll('#tests .edit-button');
        const editTestBox = document.getElementById('edit-test-box');
        [...editTestBtns].forEach(btn=>{
            btn.onclick = async(event)=>{
                const id = event.target.getAttribute('itemId');
                await TestActions.loadTest(id);
                editTestBox.style.visibility = 'visible';       
            }
        })
        
        const deleteTestBtns = document.querySelectorAll('#tests .delete-button');
        [...deleteTestBtns].forEach(btn=>{
            btn.onclick =  async(event)=>{
                const id = event.target.getAttribute('itemId');
                await TestActions.deleteTest(id);    
            }
        })

        const createCancelButton = document.querySelector('#create-test-box .cancel-button');
        createCancelButton.onclick = ()=>{
            const createTestBox = document.getElementById("create-test-box");
            createTestBox.style.visibility = 'collapse';
        }

        const createTestCover = document.getElementById('create-test-image');
        const coverInput = document.querySelector('#create-test-form input[name="image"]');
        const coverButton = document.getElementById('create-upload-image-button');
        coverButton.onclick = ()=>{
            coverInput.click();
        }
        coverInput.onchange = function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    createTestCover.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        const createTestForm = document.getElementById('create-test-form')
        createTestForm.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(createTestForm);
            try { 
                await TestActions.createTest(formData);
            } catch {}
        }

        const searchForm = document.getElementById('test-search-form');
        const searchInput = document.getElementById('test-search');
        searchForm.onsubmit = async (event) => {
            event.preventDefault();
            const query = {
                search: searchInput.value
            }
            await this.loadTests(query);
        }
    }

    static async deleteTest(itemId) {
        const confirmDeletion = confirm("Are you sure you want to delete the test?")
        if (confirmDeletion) {
            await TestService.deleteTest(itemId);
            await this.loadTests(null);
        }
    }

    static async loadTest(id) {
        const { data } = await TestService.getTestById(id);
        const editTestCover = document.getElementById('edit-test-image');
        const form = document.getElementById('edit-test-form')
        const titleField = document.querySelector('#edit-test-form input[name="title"]')
        const themeLinkField = document.querySelector('#edit-test-form input[name="themeLink"]')
        const variantFields = document.querySelectorAll('#edit-test-form textarea[name="variants"]')
        const answerRadio = document.querySelector(`#edit-test-form input[name="answer"][value="${data.answer}"]`)

        const validationErrorBoxes = document.querySelectorAll('#edit-test-box .validation-error');
        [...validationErrorBoxes].forEach(elem=>elem.innerText = "");

        titleField.value = data.title;
        themeLinkField.value = data.themeLink;
        editTestCover.src = data.image || "/admin/images/no_image.png";
        answerRadio.checked = true;
        [...variantFields].forEach((elem, index)=>{
            elem.value = data.variants[index];
        })
        const coverInput = document.querySelector('#edit-test-form input[name="image"]');
        const coverButton = document.getElementById('edit-upload-image-button');
        const cancelButton = document.querySelector('#edit-test-form .cancel-button');
        coverButton.onclick = ()=>{
            coverInput.click();
        }
        coverInput.onchange = function(){
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    editTestCover.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        cancelButton.onclick = ()=>{
            const editTestBox = document.getElementById("edit-test-box");
            editTestBox.style.visibility = 'collapse';
        }
        form.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(form);
            await TestActions.updateTest(id, formData)
        };
    }

    static async createTest(body) {
        const createTestBox = document.getElementById('create-test-box');
        const form = document.getElementById('create-test-form');
        const coverOutput = document.getElementById("create-test-image");
        const loader = document.querySelector('#create-test-box .loader-container');
        try {
            const validationErrorBoxes = form.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await TestService.createTest(body);
            if (res.success) {
                await this.loadTests();
                createTestBox.style.visibility = 'collapse';
                form.reset();
                coverOutput.src = "images/upload_image.svg";
            } else {
                this.outputValidationErrors(res.validationErrors, createTestBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'collapse';
            console.error(error);
        }
    }

    static async updateTest(id, body) {
        const editTestBox = document.getElementById('edit-test-box');
        const loader = document.querySelector('#edit-test-box .loader-container');
        try {
            const validationErrorBoxes = editTestBox.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await TestService.updateTest(body, id);
            if (res.success) {
                await this.loadTests();
                editTestBox.style.visibility = 'collapse';
            } else {
                this.outputValidationErrors(res.validationErrors, editTestBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'collapse';
            console.error(error);
        }
    }

    static async changeVisibility(elem) {
        const id = elem.getAttribute('itemId');
        const isPublished = !elem.classList.contains('publish-button');
        await TestService.changeVisibility(id, isPublished);
        if (isPublished)
            elem.classList.replace('unpublish-button', 'publish-button')
        else    
            elem.classList.replace('publish-button', 'unpublish-button')
        elem.innerText = isPublished ? "Publish" : "Unpublish"
    }

    static async outputValidationErrors(errors, formElement) {
        errors.forEach(err=>{
            const {property, message} = err;
            const box = formElement.querySelector(`.validation-error[field="${property}"]`)
            box.innerHTML += `<span>${message}<span><br/>` 
        })
    }
}