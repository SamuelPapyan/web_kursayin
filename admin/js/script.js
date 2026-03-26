const modalBgs = document.querySelectorAll('.modal-bg');

[...modalBgs].forEach(elem=>{
    elem.addEventListener('click', (event)=>{
        event.stopPropagation();
        if (event.target.classList.contains('modal-bg'))
            event.target.style.visibility = 'collapse';
    })
})

const createStudentBtn = document.getElementById('create-student-button');
const createStudentBox = document.getElementById('create-student-box')
createStudentBtn.addEventListener('click', ()=>{
    createStudentBox.style.visibility = 'visible';
});


const editStudentBtns = document.querySelectorAll('#students .edit-button');
const editStudentBox = document.getElementById('edit-student-box');
[...editStudentBtns].forEach(btn=>{
    btn.addEventListener('click', (event)=>{
        const id = event.target.getAttribute('itemId');
        console.log(id)
        editStudentBox.style.visibility = 'visible';
    })
})

const createAdminBtn = document.getElementById('create-admin-button');
const createAdminBox = document.getElementById('create-admin-box');
createAdminBtn.addEventListener('click', ()=>{
    createAdminBox.style.visibility = 'visible';
});

const editAdminBtns = document.querySelectorAll('#admins .edit-button');
const editAdminBox = document.getElementById('edit-admin-box');
[...editAdminBtns].forEach(btn=>{
    btn.addEventListener('click', (event)=>{
        const id = event.target.getAttribute('itemId');
        editAdminBox.style.visibility = 'visible';
    })
})

// TESTS
const createTestBtn = document.getElementById('create-test-button');
const createTestBox = document.getElementById('create-test-box');
createTestBtn.addEventListener('click', ()=>{
    createTestBox.style.visibility = 'visible';
});

// const editTestBtns = document.querySelectorAll('#tests .edit-button');
// const editTestBox = document.getElementById('edit-test-box');
// [...editTestBtns].forEach(btn=>{
//     btn.addEventListener('click', (event)=>{
//         const id = event.target.getAttribute('itemId');
//         editTestBox.style.visibility = 'visible';
//     })
// })

const createExampleBtn = document.getElementById('create-example-button');
const createExampleBox = document.getElementById('create-example-box');
createExampleBtn.addEventListener('click', ()=>{
    createExampleBox.style.visibility = 'visible';
});

const editExampleBtns = document.querySelectorAll('#examples .edit-button');
const editExampleBox = document.getElementById('edit-example-box');
[...editExampleBtns].forEach(btn=>{
    btn.addEventListener('click', (event)=>{
        const id = event.target.getAttribute('itemId');
        editExampleBox.style.visibility = 'visible';
    })
})

//BOOKS
const createBookBtn = document.getElementById('create-book-button');
const createBookBox = document.getElementById('create-book-box');
createBookBtn.addEventListener('click', ()=>{
    createBookBox.style.visibility = 'visible';
});

// const editBookBtns = document.querySelectorAll('#books .edit-button');
// const editBookBox = document.getElementById('edit-book-box');
// [...editBookBtns].forEach(btn=>{
//     btn.addEventListener('click', async(event)=>{
//         const id = event.target.getAttribute('itemId');
//         await BookActions.loadBook(id);
//         editBookBox.style.visibility = 'visible';       
//     })
// })

const createVideoBtn = document.getElementById('create-video-button');
const createVideoBox = document.getElementById('create-video-box');
createVideoBtn.addEventListener('click', ()=>{
    createVideoBox.style.visibility = 'visible';
});

const editVideoBtns = document.querySelectorAll('#videos .edit-button');
const editVideoBox = document.getElementById('edit-video-box');
[...editVideoBtns].forEach(btn=>{
    btn.addEventListener('click', (event)=>{
        const id = event.target.getAttribute('itemId');
        editVideoBox.style.visibility = 'visible';
    })
})

async function asyncMain() {
    try {
        await Promise.all([
            BookActions.initiateBookActions(),
            TestActions.initiateTestActions()
        ]);
    } catch (error) {
        console.error(error);
    }
    

}
asyncMain();
