const questionsList = {
    1: {
        question: "Նշել ավելորդ հատկությունը։",
        answer1:"animation-duration",
        answer2:"animation-interval",
        answer3:"animation-delay",
        correct:2
    },
    2: {
        question: "Ո՞ր պնդումներից է սխալ",
        answer1:"CSS Անիմացիաները դարձնում եմ կայքի էլեմենտները դինամիկ և շարժունակ",
        answer2:"CSS անիմացիաները նվազեցնում են JavaScript-ի օգատգործումը",
        answer3:"Ի տարբերություն CSS անցումների անիմացիաները փոխում են էլեմենտի ոճի վիճակը մի անցումից մյուսը",
        correct:3
    },
    3: {
        question: "Ի՞նչ է անում animation-direction հատկությունը",
        answer1:"Հաստատում է կադրերի անցումների ուղղությունը",
        answer2:"Խառնում է կադրերի հաջորդականությունը",
        answer3:"Փոխում է կադրերի հեռթականությունը",
        correct:1
    },
}

const messageList = {
    1: {
        message1: "Սխալ է",
        message2: "Ճիշտ է",
        message3: "Սխալ է"
    },
    2: {
        message1: "Սխալ է",
        message2: "Սխալ է",
        message3: "Ճիշտ է"
    },
    3: {
        message1: "Ճիշտ է",
        message2: "Սխալ է",
        message3: "Սխալ է"
    }
}

const propertyToggles = [...document.querySelectorAll('.prop-detail-toggle')];
// console.log(propertyToggles);
function getRandomNum(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min
}

const closeButtons = [...document.querySelectorAll('.close-button')];
const tryButtons = [...document.querySelectorAll('.try-box a')]
const trialBlur = document.getElementById('trial-blur');


const questions = document.querySelectorAll('.test');
// console.log(questions);
[...questions].forEach((elem, index)=>{
    const slot = questionsList[index+1];
    elem.querySelector('.question').textContent = slot.question;
    [...elem.querySelectorAll('label')].forEach((answ, index)=>{
        answ.textContent = slot["answer" + (index+1)];
    });
    [...elem.querySelectorAll('input[type="radio"]')].forEach(answ=>{
        answ.addEventListener('change', function(event){
            const questionI = event.target.id.split('-')[1]
            const userAnswer = event.target.value;
            const correct = questionsList[questionI]["correct"]
            const message = document.getElementById("message-" + questionI);
            message.innerText = messageList[questionI]["message" + userAnswer];
            if (userAnswer == correct) {
                message.style.backgroundColor = "green";
            } else {
                message.style.backgroundColor = "red";
            }
            message.style.display = "block";
            // console.log(questionsList[questionI]["answer" + event.target.value], questionsList[questionI]["correct"])
            document.querySelectorAll(`#test-${questionI} input`).forEach(elem => elem.disabled = "disabled");
        })
    })
})

// console.log(propertyToggles);
propertyToggles.forEach(elem=>{
    elem.addEventListener('click', function(event){
        event.preventDefault();
        const parent = event.target.parentNode.parentNode;
        // console.log(parent);
        const info = parent.querySelector('.prop-info');
        const example = parent.querySelector('.prop-example');
        const details = parent.querySelector('.prop-details');
        const trybox = parent.querySelector('.try-box');
        if (details.style.display == 'none') {
            info.style.display = 'none';
            example.style.display = 'none';
            trybox.style.display = 'none';
            details.style.display = 'block';
        } else {
            info.style.display = 'block';
            example.style.display = 'block';
            trybox.style.display = 'block';
            details.style.display = 'none';
        }
    })
})

function openTrialModal(event) {
    event.preventDefault();
    const parent = event.target.parentNode.parentNode;
    const trialModal = parent.querySelector('.trial-box');
    trialModal.style.display = 'block';
    trialBlur.style.display = 'block';
}

tryButtons.forEach(elem=>elem.addEventListener('click', openTrialModal))

function closeTrialModal(event) {
    const target = event.target;
    if (target.className == 'close-button') {
        const parent = target.parentNode.parentNode;
        parent.style.display = 'none';
        
    } else {
        const modal = [...document.querySelectorAll('.trial-box')]
        .filter(elem => elem.style.display == 'block')[0];
        modal.style.display = 'none';
    }
    trialBlur.style.display = 'none';
}

closeButtons.forEach(elem=>{
    elem.addEventListener('click', closeTrialModal);
})

trialBlur.addEventListener('click', closeTrialModal);

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);