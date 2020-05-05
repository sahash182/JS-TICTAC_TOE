

const X_Class = 'x';
const Circle_Class = 'circle';
const WinComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn;

restartButton.addEventListener('click', startGame)

startGame()

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class);
        cell.classList.remove(Circle_Class);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
}


function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn? Circle_Class : X_Class
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
        swapsTurns()
        setBoardHoverClass()
    }    

}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapsTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(Circle_Class)
    if(circleTurn){
        board.classList.add(Circle_Class)
    }else{
        board.classList.add(X_Class)
    }

}

function checkWin(currentClass){
    return WinComb.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!';
    }else{
        winningMessageTextElement.innerHTML = `${circleTurn? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) ||cell.classList.contains(Circle_Class)

    })
}

