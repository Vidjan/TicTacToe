$(() => {
    let player1 = "X";
    let player2 = "O";

    let currentPlayer = player1;


    //click on td
    $('table td').click(function () {
        var $this = $(this);
        if ($($this).hasClass("clicked")) {
        } else {
            if (currentPlayer == player1) {
                //$this.text("X");
                $($this).prepend($('<i />', {'class': 'fas fa-times fa-9x'}));
                currentPlayer = player2;
                $($this).addClass("clicked");

            } else {
                //$this.text("O");
                $($this).prepend($('<i />', {'class': 'far fa-circle fa-7x'}));
                currentPlayer = player1;
                $($this).addClass("clicked");
            }
        }
    });

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
                result2.innerHTML =$(result) +" wins!";
            }
        } else {
            nextTurn();
        }
    }

    function bestMove() {
        // AI to make its turn
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = script(board, 0, false);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = { i, j };
                    }
                }
            }
        }
        board[move.i][move.j] = ai;
        currentPlayer = human;
    }

    let scores = {
        X: 10,
        O: -10,
        tie: 0
    };

    function script(board, depth, isMaximizing) {
        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Is the spot available?
                    if (board[i][j] == '') {
                        board[i][j] = ai;
                        let score = script(board, depth + 1, false);
                        board[i][j] = '';
                        bestScore = max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Is the spot available?
                    if (board[i][j] == '') {
                        board[i][j] = human;
                        let score = script(board, depth + 1, true);
                        board[i][j] = '';
                        bestScore = min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

});



