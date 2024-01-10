function Player (number) {
    const playerId = number;
    let chosenArray = [];
    const makeSelection = function(gridNumber){
        console.log(chosenArray);
        chosenArray.push(gridNumber);
    }
    let turn;
    if (number == 1) {
        turn = true
    } else {
        turn = false
    }
    return {playerId, makeSelection,chosenArray,turn};
}

function GameBoard() {
    const gridSize = 9;
    const game = new Array(gridSize);
    const addCross =  (idx) => game[idx] = "X";
    const addCircle = (idx) => game[idx] = "O";
    return {game, addCross, addCircle}
}

function GameController () {
    let playerOne = Player(1);
    let playerTwo = Player(2);
    const board = GameBoard().game;
    mainGrid = document.querySelector(".playing-grid");
    const checkTurn = function() {
        if (playerOne.turn == true) {
            return 1;
        } else {
             return 2;
         }}
    const checkWinner = function() {
        firstArr = playerOne.chosenArray;
        console.log(firstArr);
        secondArr = playerTwo.chosenArray;
        console.log(secondArr);
        if (firstArr.includes(0) && firstArr.includes(1) && firstArr.includes(2)) {
            return 1
        } else if (firstArr.includes(3) && firstArr.includes(4) && firstArr.includes(5)) {
            return 1
        } else if (firstArr.includes(6) && firstArr.includes(7) && firstArr.includes(8)) {
            return 1
        } else if (firstArr.includes(0) && firstArr.includes(3) && firstArr.includes(6)) {
            return 1
        } else if (firstArr.includes(1) && firstArr.includes(4) && firstArr.includes(7)) {
            return 1
        } else if (firstArr.includes(2) && firstArr.includes(5) && firstArr.includes(8)) {
            return 1
        } else if (firstArr.includes(0) && firstArr.includes(4) && firstArr.includes(8)) {
            return 1
        } else if (firstArr.includes(6) && firstArr.includes(4) && firstArr.includes(2)) {
            return 1
        } else if (secondArr.includes(0) && secondArr.includes(1) && secondArr.includes(2)) {
            return 2
        } else if (secondArr.includes(3) && secondArr.includes(4) && secondArr.includes(5)) {
            return 2
        } else if (secondArr.includes(6) && secondArr.includes(7) && secondArr.includes(8)) {
            return 2
        } else if (secondArr.includes(0) && secondArr.includes(3) && secondArr.includes(6)) {
            return 2
        } else if (secondArr.includes(1) && secondArr.includes(4) && secondArr.includes(7)) {
            return 2
        } else if (secondArr.includes(2) && secondArr.includes(5) && secondArr.includes(8)) {
            return 2
        } else if (secondArr.includes(0) && secondArr.includes(4) && secondArr.includes(8)) {
            return 2
        } else if (secondArr.includes(6) && secondArr.includes(4) && secondArr.includes(2)) {
            return 2
        } else {
            return 0
        } 
    }

    const displayBoard = function () {
        for (let i = 0; i < 9; i++) {
            div = document.createElement("div");
            div.classList.add("unselected");
            div.setAttribute("id",`grid${i}`);
            mainGrid.appendChild(div);
        }
    }

    const player1Move = function (id) {
        let gridDiv = document.querySelector(`#${id}`);
        let gridNumber = id.replace('grid', '');
        gridNumber = parseInt(gridNumber, 10);
        console.log(gridNumber);
        playerOne.makeSelection(gridNumber);
        gridDiv.classList.remove("unselected");
        gridDiv.classList.add("selected");
        gridDiv.textContent = "X";
        playerOne.turn = false;
        playerTwo.turn = true;
    }

    const player2Move = function (id) {
        let gridDiv = document.querySelector(`#${id}`);
        let gridNumber = id.replace('grid', '');
        gridNumber = parseInt(gridNumber, 10);
        console.log(gridNumber);
        playerTwo.makeSelection(gridNumber);
        gridDiv.classList.remove("unselected");
        gridDiv.classList.add("selected");
        gridDiv.textContent = "O";
        playerOne.turn = true;
        playerTwo.turn = false;
    }

    const restartGame = function() {
        playerOne = Player(1);
        playerTwo = Player(2);
        for (let i = 0; i < 9; i ++) {
            let currentDiv = document.querySelector(`#grid${i}`);
            currentDiv.classList.remove("selected");
            currentDiv.classList.add("unselected");
            currentDiv.textContent= "";
        }
    }

    const cantSelectAny = function () {
        for (let i = 0; i < 9; i ++) {
            let currentDiv = document.querySelector(`#grid${i}`);
            currentDiv.classList.remove("unselected");
            currentDiv.classList.add("selected");
        }
    }

    return {checkTurn, checkWinner, displayBoard, player1Move, player2Move, restartGame, cantSelectAny};
}

const controller = GameController();
controller.displayBoard()
let notice = document.querySelector(".notice");
let grid = document.querySelector(".playing-grid");
let restart = document.querySelector(".restart") 

restart.addEventListener("click", () => {
    controller.restartGame();
    notice.textContent = "Player X turn";
})

grid.addEventListener("click",  (event) => {
    if (event.target.classList.contains("unselected")) {
        console.log("beast");
        if (controller.checkTurn() == 1) {
            controller.player1Move(event.target.id);
            if (controller.checkWinner() == 0) {
                notice.textContent = "Player O turn"
            } else {
                notice.textContent = "Player X wins"
                controller.cantSelectAny();
            }
        } else if (controller.checkTurn() == 2) {
            controller.player2Move(event.target.id);
            if (controller.checkWinner() == 0) {
                notice.textContent = "Player X turn"
            } else {
                notice.textContent = "Player O wins"
                controller.cantSelectAny();
            }
        }
    } 
});
