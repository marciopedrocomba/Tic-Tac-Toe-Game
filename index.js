class TicTacToe {
    constructor() {
        this._board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        this._EMPTY = ' ';
        this._X = 'X';
        this._O = 'O';
        this._TIE = 'T';
        this._NO_ONE = 'N';

        this._computerClick = new Event('computerMove');

        this.initEvents();

    }

    initEvents() {


        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('computerMove', e => {
                e.target.style.color = 'red';
                e.target.innerHTML = this.computer;
            });
        });

        this.human = this.requireMove();
        this.computer = this.opposite(this.human);

        this._TURN = this._X;

        if(this._TURN == this.human) {
            this.move();
        }else {
            this.computerMovePlay();
            this.move();
        }
        
    }

    move() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', e => {

                this.occupied = false;

                this.humanMovePlay(e);
                
                this.computerMovePlay();
                
                this.announceWinner();
  
            });
        });
    }

    humanMovePlay(e) {
        let move = ((e.target.classList[1]).replace('btn-', ''));
        if(this.isValid(move)) {
            this._board[move] = this.human;
            e.target.innerHTML = this.human;
        }else {
            alert("that position is already occupied, idiot!");
            this.occupied = true;
        } 
    }

    announceWinner() {
        if(this.winner() == this.human) {
            alert(`waw ${this.human}'s won.\nreload the window to start over`);
            //window.location.reload();
        }else if(this.winner() == this.computer) {
            alert(`waw ${this.computer} won.\nreload the window to start over`);
            //window.location.reload();
        }else if(this.winner() == this._TIE) {
            alert(`Nobody won, it's a tie.\nreload the window to start over`);
        }
    }

    computerMovePlay() {
        if (!this.occupied) {
            let move = this.computerMove(this.computer);

            if (move != undefined) {
                this._board[move] = this.computer;
                document.querySelector('.btn-' + move).dispatchEvent(this._computerClick);
            }
        }
    }

    computerMove(computer) {
        //1: 

        for (let row = 0; row < this._board.length; row++) {
            if(this.isValid(row)) {
                this._board[row] = computer;
                if(this.winner() == computer){
                    return row;
                }
                this._board[row] = this._EMPTY;
            }
        }

        //2:

        let human = this.opposite(computer);

        for (let row = 0; row < this._board.length; row++) {
            if(this.isValid(row)) {
                this._board[row] = human;
                if(this.winner() == human){
                    return row;
                }
                this._board[row] = this._EMPTY;
            }
        }

        //3:

        let BEST_MOVE = [4, 0, 2, 8, 1, 6, 7, 3, 5];

        for (let row = 0; row < BEST_MOVE.length; row++) {
            let value = BEST_MOVE[parseInt(Math.random() * (BEST_MOVE.length-0))];
            if(this.isValid(value)) {
                return value;
            }
        }

    }

    askYesNo(question) {
        let answer;
        do {
            answer = prompt(question + " (y/n)");
        }while(answer != 'y' && answer != 'n');

        return answer;
    }

    requireMove() {
        let yes_option = this.askYesNo("do you want to go first? ");
        
        if(yes_option == 'y') {
            return this._X;
        }else {
            return this._O;
        }
    }

    opposite(piece) {
        if(piece == this._X) {
            return this._O;
        }else {
            return this._X;
        }
    }

    isValid(move) {
        return (this._board[move] == this._EMPTY);
    }

    winner() {

        const WINNING_MOVE = 
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const WINNING_MOVE_LENGTH = WINNING_MOVE.length;

        for(let row = 0; row < WINNING_MOVE_LENGTH; row++) {
            if(this._board[WINNING_MOVE[row][0]] != this._EMPTY
                && this._board[WINNING_MOVE[row][0]] == this._board[WINNING_MOVE[row][1]]
                && this._board[WINNING_MOVE[row][1]] == this._board[WINNING_MOVE[row][2]]) {
                    return this._board[WINNING_MOVE[row][0]];
            }
        }

        if(this.isTie()) {
            return this._TIE;
        }

        return this._NO_ONE;
    }

    isTie() {
        
        for (let row = 0; row < this._board.length; row++) {
            if(this._board[row] == this._EMPTY) {
                return false;
            }
        }

        return true;
    }

}

new TicTacToe();