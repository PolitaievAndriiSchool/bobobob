let question_field= document.querySelector('.question')
let answer_buttons= document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let signs = ["+","-","*",'/']
function getRandomSign() {
    return signs[randint(0, signs.length)];
}

function shuffle(array){
    let currentIndex = array.length, randomindex;
    while (currentIndex != 0) {
        randomindex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomindex]] = [array[randomindex],array[currentIndex]];
    }
    return array;
}

class Question{
  constructor(){
  let a = randint(1, 50)
    let b = randint(1, 50)
      let sign = getRandomSign()
      this.question = `${a} ${sign} ${b}`
      if (sign == '+') {
        this.correct = a + b
      } else if (sign == '-') {
        this.correct = a - b
      } else if (sign == '*') {
        this.correct = a * b
      } else if (sign == '/') {
        this.correct = (a / b).toFixed(2)
      }
      this.answers = [
        +(randint(this.correct - 15, this.correct - 1).toFixed(2)),
        +(randint(this.correct - 15, this.correct - 1).toFixed(2)),
        this.correct,
        +(randint(this.correct + 1, this.correct + 15).toFixed(2)),
        +(randint(this.correct + 1, this.correct + 15).toFixed(2)),
      ]
      shuffle(this.answers)
}
display(){
question_field.innerHTML = this.question
for (let i = 0; i < this.answers.length; i += 1) {
answer_buttons[i].innerHTML = this.answers[i]
}
}
}
let correct_answers_given = 0
let total_answers_given = 0
let current_question = new Question()
current_question.display()

function updateCounter(){
   container_h3.innerHTML = `Відповідай на запитання ${total_answers_given}`
}
updateCounter();

function updateScore(){
   document.querySelector(".score_h4").innerHTML = `Правильних відповідей: ${correct_answers_given} з ${total_answers_given}`
}
updateScore()

for (let i = 0; i < answer_buttons.length; i += 1){
    answer_buttons[i].addEventListener('click', function(){
        if (answer_buttons[i].innerHTML == current_question.correct) {
        correct_answers_given += 1
        answer_buttons[i].style = "background-color: green;"
        anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            answer_buttons[i].style = "background-color: red;"
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })

        }
        total_answers_given += 1
        updateCounter();
        updateScore()
        current_question = new Question()
        current_question.display()
        
    })
}
