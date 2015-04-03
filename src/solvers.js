/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  for (var i = 0; i < n; i ++) {
    solution.togglePiece(i, i);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for (var i = n; i > 0; i --) {
    solutionCount = solutionCount * i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {

  var solution = new Board({n:n});

  function isSafe(board, i, col){
     //place piece at i, col
     board.togglePiece(i, col);
     var conflict = board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts();
     if(conflict){
      //toggle piece back
      board.togglePiece(i,col);
      return false;
     } else {
      board.togglePiece(i,col);
      return true;
     }
  }
  function solveNQ(board, col){
    //base case
    if(col >= n){
      return true;
    }
    for(var i=0; i<n; i++){
      //check if queen CAN be placed on i, col
      if(isSafe(board, i, col)){
        //place queen
        board.togglePiece(i,col);

        //recurse to place the rest of the queens
        if(solveNQ(board,(col+1)) === true){
          return true;
        }

        //if placing queen in [i][col] doesn't lead to solution, then 
        //remove queen from board at [i][col] and backtrack
        board.togglePiece(i, col);
      }
    }
    //if queens can't be placed in ANY row in this col
    //return false
    return false;
  }

  if(solveNQ(solution,0)=== false){
    //return empty board
    solution = new Board({n:n});
  } 
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();

// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// 

};

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n:n});
  var findSolution = function(rows) {

  //base case
  if (rows === n) {
    solutionCount ++;
    return;
  } 

  //iterate over row position and column position
  for (var column = 0; column < n; column ++) {
  //toggle piece in that column
  board.togglePiece(rows, column);
    
    //test to see if there are conflicts
    //if viable path, then
    if (!board.hasAnyQueensConflicts()) {
    //use recursion function
    findSolution(rows+1);
    }
    
  //untoggle piece in that column
  board.togglePiece(rows,column);
  }
};
    findSolution(0);
// -------
// var solution = new Board({n:n});

//   function isSafe(board,i, col){
//      //place piece at i, col
//      board.togglePiece(i, col);
//      var conflict = board.hasAnyQueensConflicts();
//      //toggle back
//      board.togglePiece(i,col);
//      return !conflict;
//   }
//   function solveNQ(board,col){
//     //base case
//     if(col === n){
//       solutionCount++;
//     }
//     for(var i=0; i<n; i++){
//       //check if queen CAN be placed on i, col
//       if(isSafe(board, i, col)){
//         //place queen
//         board.togglePiece(i,col);

//         //recurse to place the rest of the queens
//         solveNQ(board,(col+1));

//         //if placing queen in [i][col] doesn't lead to solution, then 
//         //remove queen from board at [i][col] and backtrack
//         board.togglePiece(i, col);
//       }
//     }
//   }
//   solveNQ(solution,0);


    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
  };

  