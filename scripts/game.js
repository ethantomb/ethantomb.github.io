//Tik Tac Toe Minimax
//TODO:
//Organize and comment code
class Board {
    constructor() {
        this.board = [];

        this.humanPlayingX = document.querySelector('input[name="player"]:checked').value == "X";
        this.playerTurn = this.humanPlayingX;
        this.board.push(new Array(3).fill(0));
        this.board.push(new Array(3).fill(0));
        this.board.push(new Array(3).fill(0));
        if (!this.humanPlayingX) {
            let aiMove = this.getAIMove(true);
            this.board[aiMove[0]][aiMove[1]] = 1;
            this.playerTurn = true;
        }
        this.draw();

    }
    draw() {
        this.width = Math.min(window.innerWidth, 700);
        this.height = this.width;
        document.getElementById("tttBoard").width = this.width;
        document.getElementById("tttBoard").height = this.height;
        var c = document.getElementById("tttBoard");
        var ctx = c.getContext("2d");
        ctx.fillStlye = "black";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fillRect((this.width / 3) - 20, 0, 20, this.height);
        ctx.fillRect((2 * this.width / 3) - 20, 0, 20, this.height);
        ctx.fillRect(0, (this.height / 3) - 20, this.width, 20);
        ctx.fillRect(0, (2 * this.height / 3) - 20, this.width, 20);
        ctx.font = this.width / 3 - 40 + 'px sans-serif';
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 1) {
                    ctx.fillStyle = "red";
                    ctx.fillText("X", (i) * this.width / 3 + 40, (j + 1) * this.height / 3 - 40);
                }
                else if (this.board[i][j] == -1) {
                    ctx.fillStyle = "blue";
                    ctx.fillText("O", (i) * this.width / 3 + 40, (j + 1) * this.height / 3 - 40);
                }
            }
        }
    }
    /**
     * Returns [bool,eval]=[game is over, static eval]
     */
    gameState() {
        let spaceLeft = false;
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].includes(0)) {
                spaceLeft = true;
            }
            if (this.board[i][0] + this.board[i][1] + this.board[i][2] == 3) {
                return [true, 1000];
            }
            else if (this.board[i][0] + this.board[i][1] + this.board[i][2] == -3) {
                return [true, -1000];
            }
            else if (this.board[0][i] + this.board[1][i] + this.board[2][i] == 3) {
                return [true, 1000];
            }
            else if (this.board[0][i] + this.board[1][i] + this.board[2][i] == -3) {
                return [true, -1000];
            }
        }
        if (this.board[0][0] + this.board[1][1] + this.board[2][2] == 3 || this.board[0][2] + this.board[1][1] + this.board[2][0] == 3) {
            return [true, 1000];
        }
        else if (this.board[0][0] + this.board[1][1] + this.board[2][2] == -3 || this.board[0][2] + this.board[1][1] + this.board[2][0] == -3) {
            return [true, -1000];
        }
        return [!spaceLeft, 0];
    }
    minimax(maximizing, alpha = -1000, beta = 1000) {
        let state = this.gameState();
        if (state[0]) {
            return state[1];
        }
        if (maximizing) {
            let bestEval = -10000;
            let thisEval = -10000;
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] == 0) {
                        this.board[i][j] = 1;
                        thisEval = this.minimax(false, alpha, beta);

                        this.board[i][j] = 0;
                        bestEval = Math.max(thisEval, bestEval);
                        alpha = Math.max(alpha, thisEval);
                    }
                    if (beta <= alpha) {
                        return bestEval;
                    }
                }
            }
            return bestEval;
        }
        else {
            let bestEval = 10000;
            let thisEval = 10000;
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] == 0) {
                        this.board[i][j] = -1;
                        thisEval = this.minimax(true, alpha, beta);
                        this.board[i][j] = 0;
                        bestEval = Math.min(thisEval, bestEval);
                        beta = Math.min(beta, thisEval);
                    }
                    if (beta <= alpha) {
                        return bestEval;
                    }
                }
            }
            return bestEval;
        }

    }
    getAIMove(playingX) {
        let state = this.gameState();
        let bestMove = [-1, -1]
        if (state[0]) {
            return bestMove;
        }
        let bestEval;
        if (playingX) {
            bestEval = -10000;
        } else {
            bestEval = 10000;
        }
        let thisEval = 0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 0) {
                    if (playingX) {
                        this.board[i][j] = 1;
                        thisEval = this.minimax(false);
                        this.board[i][j] = 0;
                        if (thisEval > bestEval) {
                            bestEval = thisEval;
                            bestMove = [i, j];
                        }
                    } else {
                        this.board[i][j] = -1;
                        thisEval = this.minimax(true);
                        this.board[i][j] = 0;
                        if (thisEval < bestEval) {
                            bestEval = thisEval;
                            bestMove = [i, j];
                        }
                    }
                }
            }
        }
        return bestMove;
    }
    processClick(event) {
        if (this.playerTurn) {
            var canvas = document.getElementById("tttBoard");
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            let clickI = Math.min(Math.floor((x / this.width) * 3), 2);
            let clickJ = Math.min(Math.floor((y / this.height) * 3), 2);
            //console.log(`Clicked ${clickI},${clickJ}`);
            if (this.board[clickI][clickJ] == 0) {
                if (this.humanPlayingX) {
                    this.board[clickI][clickJ] = 1;
                } else {
                    this.board[clickI][clickJ] = -1;
                }

                this.draw();
                this.playerTurn = false;

                let ai = this.getAIMove(!this.humanPlayingX);



                if (ai[0] != -1) {
                    this.board[ai[0]][ai[1]] = (this.humanPlayingX ? -1 : 1);
                }

                let state = this.gameState();
                if (state[0]) {
                    if (state[1] == 1000) {
                        document.getElementById("game_status").innerHTML = "X Wins!";
                    } else if (state[1] == -1000) {
                        document.getElementById("game_status").innerHTML = "O Wins!";
                    } else {
                        document.getElementById("game_status").innerHTML = "Its a draw!";
                    }

                } else {
                    this.playerTurn = true;
                }

                this.draw();
            }
        }
    }

}
function reset() {

    document.getElementById("game_status").innerHTML = "";
    var gBoard = new Board();
    gBoard.playerTurn = true;
    document.getElementById("tttBoard").addEventListener('click', function (e) {
        gBoard.processClick(e);
    });

}
$(document).ready(function () {

});
