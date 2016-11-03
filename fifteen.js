//This is for global variables used with the time and the move count

var moveCounter = 0;
var offset;
var clock;
var interval;

window.onload = function(p){
  //Initializing different elements used to modify documents
  var heading = document.getElementsByTagName("h1");
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzleBlocks = puzzleArea.getElementsByTagName("div");
  var buttonShuffle = document.getElementById("shufflebutton");
  
  var self = this;
  var areaSetup = false;
  //var timer = createTimer();
  var options = {};
  
  //This will calls the function to setup the puzzle area
  if (!areaSetup){
    var playingArea = self.areaSetup();
  }
  
  //This is the function used to start the timer may not get full implementation
  function startTimer(){
    if (!interval){
      offset = Date.now();
      interval = setInterval(update,options.delay);
      }
  }
  //To check if any pieces within the puzzle area has been clicked
    for (var count =0; count < puzzleBlocks.length; count++){
      puzzleBlocks[count].onclick = function(element){
        //This should check if pieces can be moved
        if (element.target.className == "puzzlepiece movablepiece"){
          moveCounter++;
          playingArea = self.moveElement(playingArea, element.target.innerHTML);
        }
      }
    }
  //This should shuffle the playing area when the shuffle button is pressed
  playingArea =shufflePlayingArea(playingArea);
  startTimer();
  //resetTimer();
  
    
  }



/*
This function is used to set up the original playing area.
*/

function areaSetup(){
  //Initializing the different elements for setup
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzleBlocks = puzzleArea.getElementsByTagName("div");
  console.log(puzzleBlocks);
  var backgroundCordinateY = 0;
  var backgroundCordinateX = 0;
  
  for(var count = 0; count < puzzleBlocks.length; count++){
    puzzleBlocks[count].setAttribute("class", "puzzlepiece");
    puzzleBlocks[count].style.position = "relative";
    puzzleBlocks[count].style.float = "left";
   
    /*Condition used to vary X & Y cordinates to properly display background picture
    if (backgroundCordinateX != -300){
      backgroundCordinateX -= 100;
    }else{
      backgroundCordinateX = 0;
      backgroundCordinateY -= 100;*/
    }
  }

  /*Initializes movable pieces of the puzzle
  puzzleBlocks[11].setAttribute("class", "puzzlepiece movablepiece");
  puzzleBlocks[14].setAttribute("class", "puzzlepiece movablepiece");
  
  //Should return initial layout of playing Area
  return [ [null,2,5,null], [null,3,6,1], [null,4,7,2], [null,null,8,3], [1,6,9,null], [2,7,10,5], [3,8,11,6], [4,null,12,7], [5,10,13,null], [6,11,14,9], [7,12,15,10], [8,null,16,11], [9,14,null,null], [10,15,null,13], [11,16,null,14], [12,null,null,15]];*/

/*
*This is the function used to move an element, accepts the current playing area layout
*returns the modified playing area
*/

function moveBlocks(playingArea, element) {

  //Initialization of elements that will be  used to move blocks
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzlePieces = puzzleArea.getElementsByTagName("div");

  //This checks the directions in which the puzzle pieces can be moved
  if(playingArea[element - 1][0] == 16){
      
   return moveBlockUp(playingArea, element, puzzleBlocks);
  }
  else if(playingArea[element - 1][1] == 16){
      
    return moveBlockRight(playingArea, element, puzzleBlocks);
  }
  else if(playingArea[element - 1][2] == 16){
      
    return moveBlockDown(playingArea, element, puzzleBlocks);
  }
  else if(playingArea[element - 1][3] == 16){

    return moveBlockLeft(playingArea, element, puzzleBlocks);
  }
}


function allowMoving(blankCell){
  //Makes pieces movable
var puzzleArea = document.getElementById("puzzlearea");
var puzzleBlocks = puzzleArea.getElementsByTagName("div");

//Helps with moving puzzle pieces
for (var count = 0; count < puzzleBlocks.length; count++){
  puzzleBlocks[count].setAttribute("class", "puzzlepiece")
}
  //For moving puzzle pieces
  for (var count = 0; count < blankCell.length; count++){
    if(blankCell[count] != null){
      puzzleBlocks[blankCell[count]-1].setAttribute("class", "puzzlepiece movablepiece");
    }
  }
}

/*
*Function for adjusting the puzzle pieces that are movable.
*Adds class that makes them highlight on hover.
*/
function addMoving(blankCell){
  
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzleBlocks = puzzleArea.getElementsByTagName("div");
  
  //Makes puzzle pieces regular pieces
  for(var count = 0; count < puzzleBlocks.length; count++){
    puzzleBlocks[count].setAttribute("class", "puzzlepiece");
    }
  //Makes movable puzzle piece movable
  for (var count = 0; count < blankCell.length; count++){
    if (blankCell[count] != null){
      puzzleBlocks[blankCell[count]-1].setAttribute("class", "puzzlepiece movablepiece");
    }
  }
}

/*
Functions for moving puzzle blocks in varying directions
*/
function moveBlockDown(playingArea, element, puzzleBlocks){
  //Gets offset value of piece from the top margin
  var valAbove = parseInt(puzzleBlocks[element - 1].style.top, 10);
  //increases distance from margin by 100px
  puzzleBlocks[element - 1].style.top = (valAbove + 100) + "px";
  
  //This section will modify layout of tiles in Play Area
  if (playingArea[element - 1][0] != null){ playingArea[playingArea[element - 1][0] -1][2] = 16}
  if (playingArea[element - 1][1] != null){playingArea[playingArea[element -1][1] -1][3] =16}
  if (playingArea[element -1][3] != null){playingArea[playingArea[element -1][3] -1][1] =16}
  
  if (playingArea[16 - 1][1] != null){playingArea[playingArea[16 - 1][1] -1][3] = playingArea[16 - 1][0]}
  if (playingArea[16 - 1][2] != null){playingArea[playingArea[16 - 1][2] - 1][0] = playingArea[16 - 1][0]}
  if (playingArea[16 -1][3] != null){playingArea[playingArea[16 - 1][0]]}
  
  var swap = playingArea[element - 1];
  playingArea[element - 1]  = playingArea[15];
  playingArea[15] = swap;
  playingArea[15][2] = parseInt(element, 10);
  
  addMoving(playingArea[15]);
  
  return playingArea;
  
}

/*
 * Function used to move a piece Up.
*/
function moveBlockUp(playingArea, element, puzzlePieces){

  // Retrives the offset value of piece from the top margin
  var blockBelow = parseInt(puzzleBlocks[element - 1].style.top, 10);
  
  //Decreases the distance from margin by 100px
  puzzleBlocks[element - 1].style.top = (blockBelow - 100) + "px"; 

  //Modifies layout of tiles in the Playing Area
  if ( playingArea[element - 1][2] != null){ playingArea[playingArea[element - 1][2] -1][0] = 16 }

  if ( playingArea[element - 1][1] != null){ playingArea[playingArea[element - 1][1] -1][3] = 16 }

  if ( playingArea[element - 1][3] != null){ playingArea[playingArea[element - 1][3] -1][1] = 16 }

      
  if ( playingArea[16 - 1][1] != null){ playingArea[playingArea[16 - 1][1] -1][3] = playingArea[16 - 1][2] }

  if ( playingArea[16 - 1][0] != null){ playingArea[playingArea[16 - 1][0] -1][2] = playingArea[16 - 1][2] }

  if ( playingArea[16 - 1][3] != null){ playingArea[playingArea[16 - 1][3] -1][1] = playingArea[16 - 1][2] }  


  var swap = playingArea[element -1];

  playingArea[element - 1] = playingArea[15];

  playingArea[element - 1][2] = 16;

  playingArea[15] = swap; 

  playingArea[15][0] = parseInt(element, 10);

  addMoving(playingArea[15]);

  return playingArea;
}

/*
 * Function used to move a piece to the Right.
*/
function moveBlockRight(playingArea, element, puzzlePieces){

  //Retrives the offset value of piece from the left margin
  var leftBlock = parseInt(puzzleBlocks[element - 1].style.left, 10);
  
  //Increases the distance from margin by 100px
  puzzleBlocks[element - 1].style.left = (leftBlock + 100) + "px"; 

  
  //Modifies layout of tiles in the Playing Area
  if ( playingArea[element - 1][0] != null){ playingArea[playingArea[element - 1][0] -1][2] = 16 }

  if ( playingArea[element - 1][2] != null){ playingArea[playingArea[element - 1][2] -1][0] = 16 }

  if ( playingArea[element - 1][3] != null){ playingArea[playingArea[element - 1][3] -1][1] = 16 }
      
  if ( playingArea[16 - 1][0] != null){ playingArea[playingArea[16 - 1][0] -1][2] = playingArea[16 - 1][3] }

  if ( playingArea[16 - 1][1] != null){ playingArea[playingArea[16 - 1][1] -1][3] = playingArea[16 - 1][3] }

  if ( playingArea[16 - 1][2] != null){ playingArea[playingArea[16 - 1][2] -1][0] = playingArea[16 - 1][3] } 
  

  var swap = playingArea[element - 1];
  
  playingArea[element - 1] = playingArea[15];

  playingArea[element - 1][3] = 16;

  playingArea[15] = swap; 

  playingArea[15][1] = parseInt(element, 10);

  self.addMoving(playingArea[15]);

  return playingArea;
}

/*
 * Function used to move piece to the Left. 
*/
function moveBlockLeft(playingArea, element, puzzlePieces){

  //Retrives the offset value of piece from the left margin
  var leftBlock = parseInt(puzzleBlocks[element - 1].style.left, 10);
  
  //Increases the distance from margin by 100px
  puzzleBlocks[element - 1].style.left = (leftBlock - 100) + "px"; 

  //Modifies layout of tiles in the Playing Area
  if ( playingArea[element - 1][0] != null){ playingArea[playingArea[element - 1][0] -1][2] = 16 }

  if ( playingArea[element - 1][1] != null){ playingArea[playingArea[element - 1][1] -1][3] = 16 }

  if ( playingArea[element - 1][2] != null){ playingArea[playingArea[element - 1][2] -1][0] = 16 }

      
  if ( playingArea[16 - 1][0] != null){ playingArea[playingArea[16 - 1][0] -1][2] = playingArea[16 - 1][1] }

  if ( playingArea[16 - 1][2] != null){ playingArea[playingArea[16 - 1][2] -1][0] = playingArea[16 - 1][1] }

  if ( playingArea[16 - 1][3] != null){ playingArea[playingArea[16 - 1][3] -1][1] = playingArea[16 - 1][1] } 
  
  var swap = playingArea[element - 1];
  
  playingArea[element - 1] = playingArea[15];

  playingArea[element - 1][1] = 16;

  playingArea[15] = swap; 

  playingArea[15][3] = parseInt(element, 10);

  addMoving(playingArea[15]);

  return playingArea;
}

/*
 *  Function used to suffle the Playing Area. Basically accepts a playing area and then shuffles it.
 */
function shufflePlayingArea(playingArea){

  //Generates random integer
  var randomInt = Math.floor((Math.random() * 4));

  //Uses Fifty moves to shuffle the board
  for ( var count = 0; count < 50; count++){

    /*
     *  Loops until a movable piece is selected
    */
    while(playingArea[15][randomInt] == null){ randomInt = Math.floor((Math.random() * 4))}

    playingArea = moveElement(playingArea, playingArea[15][randomInt]);

    randomInt = Math.floor((Math.random() * 4));

  }

  //Resets move counter
  moveCounter = 0;

  return playingArea;
}

/*
 *  Sets up area for counter and timer
 Not fully implemented
 */
function createTimer() {
  return document.createElement("span");
}








