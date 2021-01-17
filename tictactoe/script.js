//run on load
$(() => {

    //unbinds
    let unbind = () => {
        $("td").off("click");
    }

    //add position to beck end board
    let addToBoard = (row, cel, player, board) => {
        board[row][cel] = player;
    }

    //draws the appropriate symbol on front end board
    let draw = (row, cel, symbol) => {
        row++;
        cel++;
        if (symbol === "X") {
            $("table tr:nth-child(" + row + ") td:nth-child(" + cel + ")").addClass("clicked").prepend($('<i />', {'class': 'fas fa-times fa-9x'}));
        } else if (symbol === "O") {
            $("table tr:nth-child(" + row + ") td:nth-child(" + cel + ")").addClass("clicked").prepend($('<i />', {'class': 'far fa-circle fa-7x'}));
        }
    }

    //returns the smaller value of the two passed
    let min = (x, y) => {
        return (x < y) ? x : y;
    }

    //returns the higher value of the two passed
    let max = (x, y) => {
        return (x > y) ? x : y;
    }

    //win check
    function all3(a, b, c) {
        return ((a !== '') && (a === b) && (b === c));
    }

    function checkWinner() {
        let winner = null;
        let available = 0;

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

        //counts available spaces
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    available++;
                }
            }
        }

        //check if there is no winner, but also no more available moves: a tie
        if ((winner == null) && (available === 0)) {
            return 'tie';
        } else {
            return winner;
        }
    }

    function bestMove() {
        // AI to make its turn
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] === '') {
                    board[i][j] = computer;
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = {i, j};
                    }
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        let result = checkWinner(board);
        if (result !== null) {
            return weights[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            //Goes threw the hole board, check if the spot is available and if it is calls minimax on it
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = computer;
                        let score = minimax(board, depth + 1, false);
                        board[i][j] = '';
                        bestScore = max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            //Goes threw the hole board, check if the spot is available and if it is calls minimax on it
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = human;
                        let score = minimax(board, depth + 1, true);
                        board[i][j] = '';
                        bestScore = min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    //computer decides the move
    let computersMove = () => {
        let bm = bestMove(board, human, computer);
        draw(bm.i, bm.j, computer);
        addToBoard(bm.i, bm.j, computer, board);

        let winner = checkWinner();
        if (winner === null)
            humanMove();
        else if (winner === "tie")
            $("#winnerText").text("Its a tie!");
        else
            $("#winnerText").text(winner + " wins!");
    }

    //human plays a move
    let humanMove = () => {
        $("td").click(function () {
            if (!$(this).hasClass("clicked")) {
                let x = this.cellIndex;
                let y = this.parentNode.rowIndex;
                $(this).addClass("clicked");
                draw(y, x, human);
                addToBoard(y, x, human, board);
                unbind();

                let winner = checkWinner();
                if (winner === null)
                    computersMove();
                else if (winner === "tie")
                    $("#winnerText").text("Its a tie!");
                else
                    $("#winnerText").text(winner + " wins!");
            }
        });
    }

    //choose symbol logic
    let timesClicked = 0;
    $('#togBtn').click( () => {
        timesClicked++;
    });

    //game start
    let startGame = () => {
        //sets the js, html board to blank and clears the winner text
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        $("td").html("").removeClass("clicked");
        $("#winnerText").text("");

        //sets appropriate symbols as the player decided with the toggle button
        if (timesClicked % 2 === 0) {
            human = "X";
            computer = "O";
        } else {
            human = "O";
            computer = "X";
        }
        console.log("human"  )
        if (computer === "X"){
            weights.X = 1;
            weights.O = -1;
            computersMove();
        } else {
            weights.X = -1;
            weights.O = 1;
            humanMove();
        }
    }

    //weights for the minimax algorithm
    let weights = {
        X: 1,
        O: -1,
        tie: 0
    };

    //js board to keep track of the symbol locations
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let computer = "O";
    let human = "X";

    $("#startButton").click(() => startGame());
});