class VideoActions {
    static listLoader;
    static async initiateVideoActions() {
        VideoActions.listLoader = document.querySelector('#videos .list-loader-container');
        await this.loadVideos(null);
    }
    static async loadVideos(query=null) {                  
        VideoActions.listLoader.style.display = 'block';
        
        const videosList = document.querySelector('#videos-list');       
        videosList.innerHTML = "";
        const videos = await VideoService.getVideos(query)
        const items = videos.data.map((elem)=>{
            return `
                <div class="video-item">
                    <div class="video-src">
                        <video src="${elem.videoUrl}" autoplay controls>
                            <src/>
                        </video>
                    </div>
                    <h3>${elem.title}</h3>
                    <div class="video-actions">
                        <button class="pub-btn button
                            ${elem.isPublished ? "unpublish-button" : "publish-button"} button"
                         itemId="${elem._id}">
                        ${elem.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button class="edit-button button" itemId="${elem._id}">Edit</button>
                        <button class="delete-button button" itemId="${elem._id}">Delete</button>
                    </div>
                </div>
                `
            })
        VideoActions.listLoader.style.display = 'none';      
        videosList.innerHTML = items.join("");
        
        const videoPublishButtons = document.querySelectorAll('.video-item .pub-btn');
        videoPublishButtons.forEach(btn=>{
            btn.onclick = (event)=>{
                VideoActions.changeVisibility(event.target);
            }
        })

        const editVideoBtns = document.querySelectorAll('#videos .edit-button');
        const editVideoBox = document.getElementById('edit-video-box');
        [...editVideoBtns].forEach(btn=>{
            btn.onclick = async(event)=>{
                const id = event.target.getAttribute('itemId');
                await VideoActions.loadVideo(id);
                editVideoBox.style.visibility = 'visible';       
            }
        })
        
        const deleteVideoBtns = document.querySelectorAll('#videos .delete-button');
        [...deleteVideoBtns].forEach(btn=>{
            btn.onclick =  async(event)=>{
                const id = event.target.getAttribute('itemId');
                await VideoActions.deleteVideo(id);    
            }
        })

        const createCancelButton = document.querySelector('#create-video-box .cancel-button');
        createCancelButton.onclick = ()=>{
            const createVideoBox = document.getElementById("create-video-box");
            createVideoBox.style.visibility = 'collapse';
        }

        const createVideoPreview = document.getElementById('create-video-preview');
        const coverInput = document.querySelector('#create-video-form input[name="videoFile"]');
        const coverButton = document.getElementById('create-upload-video-button');
        coverButton.onclick = ()=>{
            coverInput.click();
        }
        coverInput.onchange = function() {
            const files = this.files;
            if (files && files[0]) {
                const file = files[0]
                const videoUrl = URL.createObjectURL(file);
                createVideoPreview.src = videoUrl;
                createVideoPreview.load();
                createVideoPreview.onloadeddata = function() {
                    // URL.revokeObjectURL(videoUrl)
                }
            }
        }

        const addTimeDescBtn = document.getElementById('create-add-time-desc')
        const timeDescBody = document.querySelector('#create-video-form table tbody')
        addTimeDescBtn.onclick = ()=>{
            timeDescBody.insertAdjacentHTML('beforeend', VideoActions.addTimeDescriptionField(timeDescBody.children.length, "", ""))
            VideoActions.setupRemoveButtons(timeDescBody)
            VideoActions.setupTimeFields(timeDescBody);
        }
        VideoActions.setupRemoveButtons(timeDescBody);
        VideoActions.setupTimeFields(timeDescBody);

        const createVideoForm = document.getElementById('create-video-form')
        createVideoForm.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(createVideoForm);
            try { 
                await VideoActions.createVideo(formData);
            } catch {}
        }

        const searchForm = document.getElementById('video-search-form');
        const searchInput = document.getElementById('video-search');
        searchForm.onsubmit = async (event) => {
            event.preventDefault();
            const query = {
                search: searchInput.value
            }
            await this.loadVideos(query);
        }
    }

    static async deleteVideo(itemId) {
        const confirmDeletion = confirm("Are you sure you want to delete the video?")
        if (confirmDeletion) {
            await VideoService.deleteVideo(itemId);
            await this.loadVideos(null);
        }
    }

    static async loadVideo(id) {
        const { data } = await VideoService.getVideoById(id);
        const editVideoPreview = document.getElementById('edit-video-preview');
        const form = document.getElementById('edit-video-form')
        const titleField = document.querySelector('#edit-video-form input[name="title"]')
        titleField.value = data.title;
        
        editVideoPreview.src = data.videoUrl;
        editVideoPreview.load()
        
        const timeDescTableContent = document.querySelector('#edit-video-form table tbody');
        timeDescTableContent.innerHTML = ""
        data.details.forEach((detail, index)=>{
            const {time, content} = detail
            timeDescTableContent.innerHTML += VideoActions.addTimeDescriptionField(index, time, content)
        })

        const timeDescBody = document.querySelector('#edit-video-form table tbody')
        const addTimeDescBtn = document.getElementById('edit-add-time-desc')
        addTimeDescBtn.onclick = ()=>{
            timeDescBody.insertAdjacentHTML('beforeend', VideoActions.addTimeDescriptionField(timeDescBody.children.length, "", ""))
            VideoActions.setupRemoveButtons(timeDescBody)
            VideoActions.setupTimeFields(timeDescBody);
        }
        VideoActions.setupRemoveButtons(timeDescBody);
        VideoActions.setupTimeFields(timeDescBody);

        const validationErrorBoxes = document.querySelectorAll('#edit-video-box .validation-error');
        [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
        
        const coverInput = document.querySelector('#edit-video-form input[name="videoFile"]');
        const coverButton = document.getElementById('edit-upload-video-button');
        const cancelButton = document.querySelector('#edit-video-form .cancel-button');
        coverButton.onclick = ()=>{
            coverInput.click();
        }
        coverInput.onchange = function(){
            const files = this.files;
            if (files && files[0]) {
                const file = files[0]
                const videoUrl = URL.createObjectURL(file);
                editVideoPreview.src = videoUrl;
                editVideoPreview.load();
                editVideoPreview.onloadeddata = function() {
                    // URL.revokeObjectURL(videoUrl)
                }
            }
        }

        cancelButton.onclick = ()=>{
            const editVideoBox = document.getElementById("edit-video-box");
            editVideoBox.style.visibility = 'collapse';
        }

        form.onsubmit = async(event)=>{
            event.preventDefault();
            const formData = new FormData(form);
            await VideoActions.updateVideo(id, formData)
        };
    }

    static async createVideo(body) {
        const createVideoBox = document.getElementById('create-video-box');
        const form = document.getElementById('create-video-form');
        const videoPreview = document.getElementById("create-video-preview");
        const loader = document.querySelector('#create-video-box .loader-container');
        const tableBody = document.querySelector('#create-video-form table tbody');
        try {
            const validationErrorBoxes = form.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await VideoService.createVideo(body);
            if (res.success) {
                await this.loadVideos();
                createVideoBox.style.visibility = 'collapse';
                form.reset();
                videoPreview.src = "";
                tableBody.innerHTML = "";
                for (let i = 0; i < 3; i++)
                    tableBody.insertAdjacentHTML('beforeend', VideoActions.addTimeDescriptionField(i, "", ""))
                VideoActions.setupRemoveButtons(tableBody);
                VideoActions.setupTimeFields(tableBody);
            } else {
                this.outputValidationErrors(res.validationErrors, createVideoBox);
            }
            loader.style.visibility = 'collapse';
        } catch (error) {
            loader.style.visibility = 'collapse';
            console.error(error);
        }
    }

    static async updateVideo(id, body) {
        const editVideoBox = document.getElementById('edit-video-box');
        const loader = document.querySelector('#edit-video-box .loader-container');
        try {
            const validationErrorBoxes = editVideoBox.querySelectorAll('.validation-error');
            [...validationErrorBoxes].forEach(elem=>elem.innerText = "");
            loader.style.visibility = 'visible';
            const res = await VideoService.updateVideo(body, id);
            if (res.success) {
                await this.loadVideos();
                editVideoBox.style.visibility = 'collapse';
            } else {
                this.outputValidationErrors(res.validationErrors, editVideoBox);
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
        await VideoService.changeVisibility(id, isPublished);
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

    static setupRemoveButtons(tableBody) {
        const removeButtons = tableBody.querySelectorAll('.remove-button')
        removeButtons.forEach(elem=>{
            elem.onclick = (e)=>{
                const rowId = e.target.getAttribute("rowId");
                const row  = tableBody.querySelector(`tr[rowId="${rowId}"]`)
                tableBody.removeChild(row)
                VideoActions.refreshRowIds(tableBody)
            }
        })
    }

    static setupTimeFields(tableBody) {
        const timeFields = tableBody.querySelectorAll('.time-field');
        [...timeFields].forEach(field=>{
            field.oninput = (e)=>{
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';

                if (value.length > 0) {
                    if (value.length <= 4) {
                        if (value.length > 2) {
                            formattedValue = value.slice(0, 2) + ':' + value.slice(2);
                        } else {
                            formattedValue = value;
                        }
                    } 
                    else {
                        formattedValue = value.slice(0, 2) + ':' + value.slice(2, 4) + ':' + value.slice(4, 6);
                    }
                }
                e.target.value = formattedValue;
            }
        })
    }

    static refreshRowIds(tableBody) {
        const rows = tableBody.querySelectorAll('tr');
        const removeButtons = [...tableBody.querySelectorAll('.remove-button')];
        const timeFields = [...tableBody.querySelectorAll('.time-field')];
        const descriptionFields = [...tableBody.querySelectorAll('.description-field')];
        const timeValidationErrors = [...tableBody.querySelectorAll('.validation-error')]
            .filter(x=>{
                return x.getAttribute('field').includes(".time")
            });
        const descriptionValidationErrors = [...tableBody.querySelectorAll('.validation-error')].filter(x=>x.getAttribute('field').includes(".content"));
        [...rows].forEach((row, index)=>{
            row.setAttribute('rowId', index);
            removeButtons[index].setAttribute('rowId', index);
            timeFields[index].setAttribute('name', `details[${index}][time]`)
            descriptionFields[index].setAttribute('name', `details[${index}][content]`)
            timeValidationErrors[index].setAttribute('field', `details[${index}].time`)
            descriptionValidationErrors[index].setAttribute('field', `details[${index}].content`)
        })
        VideoActions.setupRemoveButtons(tableBody);
        VideoActions.setupTimeFields(tableBody);
    }

    static addTimeDescriptionField(id, time, content) {
        return `
            <tr rowId="${id}">
                <td class="time-input">
                    <input type="text" placeholder="00:00:00" maxlength="8" class="time-field" name="details[${id}][time]" value="${time}"/>
                    <div class="validation-error" field="details[${id}].time"></div>
                </td>
                <td class="description-input">
                    <textarea class="description-field" name="details[${id}][content]">${content}</textarea>
                    <div class="validation-error" field="details[${id}].content"></div>
                </td>
                <td>
                    <button type="button" class="remove-button" rowId="${id}">-</button>
                </td>
            </tr>
        `
    }
}