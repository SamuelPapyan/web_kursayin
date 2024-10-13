const questionsList = {
    1: [
        {question: "Հատկություններից որո՞նք են ավելորդ", answer1:"animation-duration", answer2:"animation-interval", answer3:"animation-delay", correct:2}
    ],
    2: [
        {question: "Ո՞ր պնդումներից է սխալ", answer1:"CSS Անիմացիաները դարձնում եմ կայքի էլեմենտները դինամիկ և շարժունակ", answer2:"CSS անիմացիաները նվազեցնում են JavaScript-ի օգատգործումը", answer3:"Ի տարբերություն CSS անցումների անիմացիաները փոխում են էլեմենտի ոճի վիճակը մի անցումից մյուսը", correct:3}
    ],
    3: [
        {question: "Ի՞նչ է անում animation-direction հատկությունը", answer1:"Հաստատում է կադրերի անցումների ուղղությունը", answer2:"Խառնում է կադրերի հաջորդականությունը", answer3:"Փոխում է կադրերի հեռթականությունը", correct:1}
    ],
}

function getRandomNum(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min
}

const questions = document.querySelectorAll('.test')
console.log(questions);
[...questions].forEach((elem, index)=>{
    const slot = questionsList[index+1];

    console.log(getRandomNum(slot.length - 1));
    const quest = slot[getRandomNum(slot.length)];
    console.log(slot, quest);
    elem.querySelector('.question').textContent = quest.question;
    
    [...elem.querySelectorAll('label')].forEach((answ, index)=>{
        answ.textContent = quest["answer" + (index+1)];
    });
    [...elem.querySelectorAll('input[type="radio"]')].forEach(answ=>{
        answ.addEventListener('change', function(event){
            const questionI = event.target.id.split('-')[1]
            const answerI = event.target.id.split('-')[2]
            
            console.log(event.target.value, questionI, answerI);
        })
    })
})