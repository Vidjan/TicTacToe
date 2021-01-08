$(() => {
    let player1 = "X";
    let player2 = "O";
    let currentPlayer = player1;

    let board = Array.from(Array(3), () => Array(3).fill(null))

    //add x or o to a specified position on the board
    let addToBoard = (player, x, y, board) => {
        board[x][y] = player;
    }
    //click on td
    $('td').click(function () {
        let x = this.cellIndex;
        let y = this.parentNode.rowIndex;

        if (!$(this).hasClass("clicked")) {
            if (currentPlayer === player1) {
                //$this.text("X");
                $(this).prepend($('<i />', {'class': 'fas fa-times fa-9x'}));
                currentPlayer = player2;
                $(this).addClass("clicked");
                addToBoard(player1, x, y, board);
            } else {
                //$this.text("O");
                $(this).prepend($('<i />', {'class': 'far fa-circle fa-7x'}));
                currentPlayer = player1;
                $(this).addClass("clicked");
                addToBoard(player2, x, y, board);
            }
        }

        $("h1").text(checkWinner(board));


    });

    function all3(a, b, c) {
        return ((a != null) && (a === b) && (b === c));
    }

    function checkWinner(board) {
        let winner = null;
        //horizontal check
        for (let i = 0; i < 3; i++) {
            if (all3(board[i][0], board[i][1], board[i][2])) {
                winner = board[i][0];
            }
            if ((winner != null)) {
                return winner;
            }
        }
        //vertical check
        for (let i = 0; i < 3; i++) {
            if (all3(board[0][i], board[1][i], board[2][i])) {
                winner = board[0][i];
            }
            if (winner != null) {
                return winner + " wins";
            }
        }
        //diagonal check
        if (all3(board[0][0], board[1][1], board[2][2])) {
            winner = board[0][0];
            return winner + " wins";
        }
        if (all3(board[2][0], board[1][1], board[0][2])) {
            winner = board[2][0];
            return winner + " wins";
        }
        console.log(board);
        //check if there is no winner, but also if there are no more available moves - a tie
        if ((winner == null) && (board.includes(null))) {
            return "tie";
        } else {
            return "";
        }
    }

    //minimax
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
                        move = {i, j};
                    }
                }
            }
        }
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
                    if (board[i][j] === '') {
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
                        board[i][j] = 'tie';
                        bestScore = min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
});



