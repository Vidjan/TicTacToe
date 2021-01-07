var board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'O']];
var players = ['X', 'O'];
var available = [];


function all3(a, b, c) {
    return ((a != '') && (a == b) && (b == c));
}

function checkWinner() {
    let winner = null;
    //horizontal check
    for (let i = 0; i < 3; i++) {
        if (all3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
        if (winner != null) {
            return winner;
        }
    }
    //vertical check
    for (let i = 0; i < 3; i++) {
        if (all3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
        if (winner != null) {
            return winner;
        }
    }
    //diagonal check
    if (all3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (all3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }
    //check if there is no winner, but also if there are no more available moves - a tie
    if ((winner == null) && (available.length == 0)) {
        return 'tie';
    } else {
        return winner;
    }
}

function showWinner() {
    let result = checkWinner();
    if (result != null) {
        let result2;
        if (result == 'tie') {
            result2.innerHTML('Tie!');
        } else {
            result2.innerHTML =${result} +" wins!";
        }
    } else {
        nextTurn();
    }
}

//function nextTurn(){}