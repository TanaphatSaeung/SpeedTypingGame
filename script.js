const wordEl = document.getElementById('word')
const textEl = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const btnLevelEl = document.getElementById('level-btn')
const settingsEl = document.getElementById('settings')
const levelFormEl = document.getElementById('level-form')
const levelEl = document.getElementById('level')
const gameoverEl = document.getElementById('gameover-container')

const words = ['Elegant','Curiosity','Divergent','Split','a dog', 'a cat','Library','Poetry']

let randomWord
let score=0
const saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium' 

scoreEl.innerHTML = `Score ${score}`
const getRandomWord = () =>{
    return words[Math.floor(Math.random()*words.length)]
}

const displayWordToUI = () => {
    randomWord = getRandomWord()
    timeEl.innerHTML = `the time: ${time}s`
    wordEl.innerHTML = randomWord
}
textEl.addEventListener('input', e =>{
    const inputText = e.target.value
    
    if (inputText === randomWord) {    
        if (saveMode == 'easy') {
            time += 5
        }else if(saveMode == 'medium'){
            time += 3
        }else{
            time += 2
        }
        updateScore()
        displayWordToUI()
        timeEl.innerHTML = `the time: ${time}s`
        e.target.value = ''
    }
})

const updateScore = () => {
    score+=10
    scoreEl.innerHTML = `Score ${score}`
}

const updateTime = () => {
    time--
    timeEl.innerHTML = `the time: ${time}s`
    if(time === 0){
        clearInterval(timeInterval)
        gameover()
    }
}

const gameover = () => {
    gameoverEl.innerHTML = `<h1>Game Over</h1>
    <p>Your score ${score}</p>
    <button onclick='location.reload()'>Play Again</button>`
    gameoverEl.style.display = 'flex'
}

btnLevelEl.addEventListener('click',()=>{
    settingsEl.classList.toggle('hide')
})

levelEl.addEventListener('change',e=>{
    level = e.target.value
    localStorage.setItem('mode',level)
})

const startGame = () =>{
    
    
    levelEl.value = saveMode
    if (saveMode == 'easy') {
        time = 15
    }else if(saveMode == 'medium'){
        time = 10
    }else{
        time = 5
    }

    displayWordToUI()
}

startGame()
const timeInterval = setInterval(updateTime,1000)
textEl.focus()

