const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')


const colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED']

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGmae)
$game.addEventListener('click', handBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el){
    $el.classList.remove('hide')

}
function hide($el){
    $el.classList.add('hide')
}


function startGmae(){
score = 0;
setGameTime()

$gameTime.setAttribute('disabled', 'true')
 

    isGameStarted = true;
$game.style.backgroundColor = '#fff'; 
hide($start)

let internal = setInterval(function(){
    let time = parseFloat($time.textContent)

if(time <= 0){
    clearInterval(internal)
endGame()
} else {
    $time.textContent = (time - 0.1).toFixed(1)
}
},100)

renderBox()
}

function setGameScore(){
    $result.textContent = score.toString()
}

function setGameTime(){
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1) 
    show($timeHeader)
    hide($resultHeader)
}

function endGame(){
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')

show($start)
$game.innerHTML = ''
$game.style.backgroundColor = '#ccc'
hide($timeHeader)
show($resultHeader)

}



function handBoxClick(event){
if(!isGameStarted){
return
}

if(event.target.dataset.box){
    score++
    renderBox()
 
}
}


function renderBox() {
    $game.innerHTML = ''
const box = document.createElement('div')
let boxSize = getRandom(30, 100)

const gameSize = $game.getBoundingClientRect()
let maxTop = gameSize.height - boxSize
let maxLeft = gameSize.width - boxSize

let randomColorIndex = getRandom(0, colors.length)

box.style.height = box.style.width = boxSize + 'px'
box.style.position = 'absolute'
box.style.backgroundColor = colors[randomColorIndex]
box.style.top = getRandom(0, maxTop) + 'px'
box.style.left = getRandom(0, maxLeft) + 'px'
box.style.cursor = 'pointer'
box.setAttribute('data-box', 'true')


$game.insertAdjacentElement('afterbegin', box)

}



function getRandom(min, max){

    return Math.floor(Math.random() * (max - min) + min)
}