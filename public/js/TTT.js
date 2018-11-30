let TTT = function () {
    let huPlayer,
    aiPlayer,
    testBoard,
    bLoc,
    bVals,
    fc,
    turn,
    miniOpen = 0,
    bestSpot;

    //starts game and initializes variables and event listeners 
    start = function(){
        bLoc = getBoardLoc();
        bVals = getBoardVals(); 
        turn = "P"; 
        huPlayer = "O";
        aiPlayer = "X";
        initInput();
        
    },

    //resets all box values to empty strings 
    reset = function(){
        console.log("inside restart");
        if(bLoc != undefined){
            for(let i=0; i < bLoc.length; i++){
                $(bLoc[i]).html("");
                $(bVals[i])
            }
            start();
        }
        
        
        console.log("MiniMax instances: " + miniOpen)
    },
    //initialized event listeners 
    initInput = function(){
        for(let i=0; i < bLoc.length; i++){
            $(bLoc[i]).click(function() {
                if(turn === "P"){
                    updateBox(i);
                }
            });
        }
    },

    //turns off event listeners and prevents futher input.  
    endGame = function(){
        for(let i =0; i < bLoc.length; i++){
            $(bLoc[i]).off('click');
        }
    }

    //checks turn and allows input if it is currently players turn. 
    updateBox = function(loc){
        if(turn === "P"){
            $(bLoc[loc]).html(huPlayer);
            bVals = getBoardVals();
            winCheck();
            updateTurn();
        }
        else if(turn === "A"){
            $(bLoc[loc]).html(aiPlayer);
            bVals = getBoardVals();
            winCheck();//checking for win condition
            updateTurn();
        }
        else{
            console.log("Incorrect turn ID: " + trn);
        }
    },

    //flips turns 
    updateTurn = function(){
        switch(turn){
            case "A": 
                turn = "P"; 
                break; 
            case "P": 
                turn = "A";
                aiTurn();
                break;
            default:
                console.log("Incorrect turn ID: " + trn);
                break;  
        }
    },

    aiTurn = function(){
        setTimeout(updateBox(findBest(bVals)),22000);

    },

    //returns list of box ID's formatted as strings (ex: ["item0","item1"...])
    getBoardLoc = function(){
        const b = []; 

        for(let i = 0; i < 9; i++){
            b.push("#item" + i.toString());
        }

        return b; 
    },

    //returns a list of box values (ex: ["0","1","X"])
    //if no value has been entered ("O" or "X") the index will be entered instead.
    getBoardVals = function(){
        const vals = []; 

        for(let i = 0; i< bLoc.length; i++){
            let val = $(bLoc[i]).html(); 
            if(val != ""){
                vals.push(val);
            }
            else{
                vals.push(i);
            }
            
            console.log(vals[i]);
        }

        return vals; 
    },

    //checks for winning conditions 
    winCheck = function(){
        if(winning(bVals,huPlayer)){
            console.log("i should be writting a message");
            $("#winBanner").html("You won!")
            endGame();
        }
        else if(winning(bVals,aiPlayer)){
            console.log("i should be writting a message");
            $("#winBanner").html("You lose!");
            endGame();
        }
        else if(emptyIndexies(bVals).length <= 0){
            $("#winBanner").html("No one wins!");
            endGame();
        }
    },

    //returns the best move based on the current board state
    findBest = function (board) {
        
        //testBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        //testBoard = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"];
        console.log(board);
        fc = 0;
        bestSpot = minimax(board, aiPlayer);

        console.log("index: " + bestSpot.index);
        console.log("function calls: " + fc);

        return bestSpot.index;
    },
    
    //minimax function curtesy of Ahmad Abdolsaheb of FreeCodeCamp.org
    //https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
    //recursive function that checks each potential move and returns a score. Moves with the highest score are returned. 
    minimax = function (newBoard, player) {
        fc++
        miniOpen += 1
        let availSpots = emptyIndexies(newBoard);

        if (winning(newBoard, huPlayer)) {
            return {
                score: -10
            };
        } else if (winning(newBoard, aiPlayer)) {
            return {
                score: 10
            };
        } else if (availSpots.length === 0) {
            return {
                score: 0
            };
        }

        let moves = [];

        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            move.index = newBoard[availSpots[i]];

            newBoard[availSpots[i]] = player;

            if (player == aiPlayer) {
                let result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                let result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }
        let bestMove;
        if (player === aiPlayer) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    },

    emptyIndexies = function(board) {
        return board.filter(s => s != "O" && s != "X");
    },

    winning = function(board, player) {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
    };

    return{
        start: start,
        reset: reset
    };
} ();