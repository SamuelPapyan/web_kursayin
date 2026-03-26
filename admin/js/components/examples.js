class ExampleActions {
    static listLoader;
    static async initiateExampleActions() {
        ExampleActions.listLoader = document.querySelector('#examples .list-loader-container');
        await this.loadExamples(null);
    }
    static async loadExamples(query=null) {                  
        ExampleActions.listLoader.style.display = 'block';
        
        const examplesList = document.querySelector('#examples-list');       
        examplesList.innerHTML = "";
        const examples = await ExampleService.getExamples(query)
        const items = examples.data.map((elem)=>{
            return `
                <div class="example-item">
                    <div class="example-iframe">
                        <iframe></iframe>
                    </div>
                    <h3>${elem.name}</h3>
                    <div class="example-actions">
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
        ExampleActions.listLoader.style.display = 'none';      
        examplesList.innerHTML = items.join("");

        const iframes = document.querySelectorAll('.example-item iframe');
        [...iframes].forEach((iframe, index)=>{
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const fullCode = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            ${examples.data[index].cssCode}
                        </style>
                    </head>
                    <body>${examples.data[index].htmlCode}</body>
                </html>
            `;
            doc.open();
            doc.write(fullCode);
            doc.close();
            const originalWidth = 589;
            const targetWidth = 436;
            const scaleFactor = targetWidth / originalWidth;
            doc.body.style.transform = `scale(${scaleFactor}) translate(1, 1)`
        })
        
        const examplePublishButtons = document.querySelectorAll('.example-item .pub-btn');
        examplePublishButtons.forEach(btn=>{
            btn.onclick = (event)=>{
                ExampleActions.changeVisibility(event.target);
            }
        })

        const editExampleBtns = document.querySelectorAll('#examples .edit-button');
        const editExampleBox = document.getElementById('edit-example-box');
        [...editExampleBtns].forEach(btn=>{
            btn.onclick = async(event)=>{
                const id = event.target.getAttribute('itemId');
                await ExampleActions.loadExample(id);
                editExampleBox.style.visibility = 'visible';       
            }
        })
        
        const deleteExampleBtns = document.querySelectorAll('#examples .delete-button');
        [...deleteExampleBtns].forEach(btn=>{
            btn.onclick =  async(event)=>{
                const id = event.target.getAttribute('itemId');
                await ExampleActions.deleteExample(id);    
            }
        })

        const createCancelButton = document.querySelector('#create-example-box .cancel-button');
        createCancelButton.onclick = ()=>{
            const createExampleBox = document.getElementById("create-example-box");
            createExampleBox.style.visibility = 'collapse';
        }

        const resultIframe = document.querySelector('#create-example-form iframe')
        const doc = resultIframe.contentDocument || resultIframe.contentWindow.document;

        const htmlCodeArea = document.querySelector('#create-example-form textarea[name="htmlCode"]')
        const cssCodeArea = document.querySelector('#create-example-form textarea[name="cssCode"]')

        htmlCodeArea.oninput = ()=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.updateIframe(doc, html, css)
        }
        
        htmlCodeArea.onkeydown = (event)=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.handleTab(event, doc, html, css)
        }

        cssCodeArea.oninput = ()=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.updateIframe(doc, html, css)
        }

        cssCodeArea.onkeydown = (event)=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.handleTab(event, doc, html, css)
        }

        const createExampleForm = document.getElementById('create-example-form')
        createExampleForm.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(createExampleForm);
            try { 
                await ExampleActions.createExample(formData);
            } catch {}
        }

        const searchForm = document.getElementById('example-search-form');
        const searchInput = document.getElementById('example-search');
        searchForm.onsubmit = async (event) => {
            event.preventDefault();
            const query = {
                search: searchInput.value
            }
            await this.loadExamples(query);
        }
    }

    static async updateIframe(doc, html, css) {
        const fullCode = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        ${css}
                    </style>
                </head>
                <body>${html}</body>
            </html>
        `
        doc.open();
        doc.write(fullCode);
        doc.close();
    }

    static async deleteExample(itemId) {
        const confirmDeletion = confirm("Are you sure you want to delete the example?")
        if (confirmDeletion) {
            await ExampleService.deleteExample(itemId);
            await this.loadExamples(null);
        }
    }

    static async loadExample(id) {
        const { data } = await ExampleService.getExampleById(id);
        const resultIframe = document.querySelector('#edit-example-form iframe');
        const doc = resultIframe.contentDocument || resultIframe.contentWindow.document;
        const cancelButton = document.querySelector('#edit-example-form .cancel-button')
        const form = document.getElementById('edit-example-form')
        const nameField = document.querySelector('#edit-example-form input[name="name"]')
        const htmlCodeArea = document.querySelector('#edit-example-form textarea[name="htmlCode"]')
        const cssCodeArea = document.querySelector('#edit-example-form textarea[name="cssCode"]')

        const validationErrorBoxes = document.querySelectorAll('#edit-example-box .validation-error');
        [...validationErrorBoxes].forEach(elem=>elem.innerText = "");

        nameField.value = data.name;
        htmlCodeArea.value = data.htmlCode;
        cssCodeArea.value = data.cssCode;
        ExampleActions.updateIframe(doc, data.htmlCode, data.cssCode)

        htmlCodeArea.oninput = ()=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.updateIframe(doc, html, css)
        }

        htmlCodeArea.onkeydown = (event)=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.handleTab(event, doc, html, css)
        }
        
        cssCodeArea.oninput = ()=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.updateIframe(doc, html, css)
        }

        cssCodeArea.onkeydown = (event)=>{
            const html = htmlCodeArea.value;
            const css = cssCodeArea.value;
            ExampleActions.handleTab(event, doc, html, css)
        }

        cancelButton.onclick = ()=>{
            const editExampleBox = document.getElementById("edit-example-box");
            editExampleBox.style.visibility = 'collapse';
        }
        form.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(form);
            await ExampleActions.updateExample(id, formData)
        };
    }

    static async createExample(body) {
        const createExampleBox = document.getElementById('create-example-box');
        const form = document.getElementById('create-example-form');
        const iframe = form.querySelector('iframe');
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const loader = document.querySelector('#create-example-box .loader-container');
        try {
            const validationErrorBoxes = form.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await ExampleService.createExample(body);
            if (res.success) {
                await this.loadExamples();
                createExampleBox.style.visibility = 'collapse';
                form.reset();
                doc.open();
                doc.write("");
                doc.close();
            } else {
                this.outputValidationErrors(res.validationErrors, createExampleBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'collapse';
            console.error(error);
        }
    }

    static async updateExample(id, body) {
        const editExampleBox = document.getElementById('edit-example-box');
        const loader = document.querySelector('#edit-example-box .loader-container');
        try {
            const validationErrorBoxes = editExampleBox.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await ExampleService.updateExample(body, id);
            if (res.success) {
                await this.loadExamples();
                editExampleBox.style.visibility = 'collapse';
            } else {
                this.outputValidationErrors(res.validationErrors, editExampleBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'collapse';
            console.error(error);
        }
    }

    static async changeVisibility(elem) {
        const id = elem.getAttribute('itemId');
        console.log(id);
        const isPublished = !elem.classList.contains('publish-button');
        await ExampleService.changeVisibility(id, isPublished);
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

    static handleTab(e, doc, html, css) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;

        e.target.value = e.target.value.substring(0, start) + "    " + e.target.value.substring(end);

        e.target.selectionStart = e.target.selectionEnd = start + 4;
        ExampleActions.updateIframe(doc, html, css);
    }
}
}