let board = [];

document.getElementById('submitButton').addEventListener('click', function(event) {    
    console.log("hola");
    event.preventDefault(); // Prevent form submission for this example

    const formData = new FormData(this);

    // Iterate through the form data to construct the puzzle string
    board = getInputBoard(formData);    

    printSudoku(board);

    solve(board);

    printSudoku(board);
});
/*
board = [
    [7,0,0,8,6,0,0,0,0],
    [0,0,0,0,0,0,0,0,3],
    [0,0,0,5,0,0,0,8,0],
    [8,3,0,4,0,0,0,6,0],
    [6,0,0,0,7,0,0,2,0],
    [0,0,0,0,0,0,1,5,0],
    [0,6,0,0,1,5,0,3,0],
    [0,0,4,3,0,0,0,0,2],
    [0,5,2,0,0,0,0,0,0]
];
*/

function getInputBoard(formData){
    let board = [];

    for (let i = 0; i < 9; i++) {
        let puzzleRow = [];
        for (let j = 0; j < 9; j++) {
            const cellValue = formData.get(`cell-${i}${j}`);
            puzzleRow.push(cellValue === '' ? 0 : cellValue);
        }
        board.push(puzzleRow);
    }

    return board;
}

function solve(board){

    let nextCell = findFirstEmpty(board);
    if(!nextCell){
        return true;
    }
    for(let i = 1; i<10; i++){
        if(isValid(board, i, nextCell)){
            board[nextCell.x][nextCell.y] = i;

            if(solve(board))
                return true;
            
            board[nextCell.x][nextCell.y] = 0;
        }
    }
    return false;
}

function printSudoku(sudokuBoard){

    for(let i = 0; i<sudokuBoard.length; i++){

        let output = '';
        if(i%3 == 0 && i != 0)
            console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _');

        for(let j = 0; j<sudokuBoard[0].length; j++){
                        
            if(j%3 == 0 && j != 0){
                output += '|';
            }
            if(j == 8){
                output += sudokuBoard[i][j];
            }else{
                output += sudokuBoard[i][j];
                output += ' ';
            }
        }
        console.log(output);
    }
}

function findFirstEmpty(board){
    for(let i = 0; i<board.length; i++){

        for(let j=0; j<board[0].length; j++){

            if(board[i][j] == 0 || board[i][j] == '')
                return {x:i, y:j};
        }
    }
    return null;
}

function isValid(board, num, pos){

    //Check row
    for(let i = 0; i<board[0].length; i++){
        if(board[pos.x][i] == num && pos.y != i)
            return false;
    }

    //Check column
    for(let i = 0; i<board.length; i++){
        if(board[i][pos.y] == num && pos.x != i)
            return false;
    }

    //Check square
    let squareX = Math.floor(pos.x/3);
    let squareY = Math.floor(pos.y/3);

    for(let i = squareX * 3; i < squareX*3+3; i++){
        for(let j = squareY * 3; j < squareY*3+3; j++){
            if(board[i][j] == num && pos.x != i && pos.y != j)
                return false;
        }
    }

    return true;
}