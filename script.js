let $board = document.querySelector('#board');
let $startButton = document.querySelector('#start');
let $gameSize = document.querySelector('#game-size');
let $title = document.querySelector('.title');
let $block = document.querySelectorAll('.block');

for(let i = 0; i < 9; i++){
    $board.innerHTML += '<div class ="block"></div>';
    
}

const arrBlock = [];
let block;
let step = 0;

//Events

$board.addEventListener('click', stepGameFunc);
$startButton.addEventListener('click', gameSizeFunc);


// Functions

function gameSizeFunc(event){
  $board.innerHTML = '';
  let size = $board.getBoundingClientRect();
  $board.style.width = $gameSize.value * 100 + 'px';
  $board.style.height = $gameSize.value * 100 + 'px';
  
 for(let i = 0; i < $gameSize.value; i++){
   arrBlock[i] = [];
   for (let j = 0; j < $gameSize.value; j++) {
      arrBlock[i].push('');
      block = document.createElement('div');
      block.innerText = '';
      block.setAttribute('data-block', `${i}- ${j}`)
      $board.appendChild(block).className = "block";
   }
       
  
 }

 console.log(arrBlock);
}



function stepGameFunc(event){
    if(event.target.innerHTML != ''){
        return;
    }
    if(event.target.className === 'block'){
        if(step % 2 === 0){
            event.target.innerHTML = "X";
            let strIndex = event.target.getAttribute('data-block');
            let arrIndex = strIndex.split('-');
            let a = +arrIndex[0];
            let b = +arrIndex[1];
            arrBlock[a][b] = 'X';
           event.target.style.backgroundColor = 'rgb(224, 168, 201)';
           $title.innerHTML = 'O';
        } else{
            event.target.innerHTML = 'O';
            let strIndex = event.target.getAttribute('data-block');
            let arrIndex = strIndex.split('-');
            let a = +arrIndex[0];
            let b = +arrIndex[1];
            arrBlock[a][b] = 'O';
            event.target.style.backgroundColor = 'rgb(182, 145, 167)';
            $title.innerHTML = 'X';
        }
        step ++;
        checkWinner();
    }
}


function checkWinner(){
    let steps = 0;
    for(let i = 0; i < $gameSize.value; i++){
     if(getWinner(arrBlock[i]))
       return true;
     for(let j = 0; j < $gameSize.value; j++){
       if(arrBlock[i][j] === '')
         steps++;
         let result = getColumn(arrBlock, j);
         if(getWinner(result))
           return true;
      }
    }
    let diagonal1 = firstGetDiagonal(arrBlock);
    let diagonal2 = secondGetDiagonal(arrBlock);
    if(getWinner(diagonal1))
     return true;
    if(getWinner(diagonal2))
     return true;
     if(steps === 0){
      $title.innerHTML = 'The Game is Draw';
      setInterval(function(){$title.innerHTML += '.'}, 1000);
      setTimeout(function(){location.reload(2)}, 4000);
       return true;
     }
    

}

function firstGetDiagonal(arr){
    let arrDiagonal= [];
    for(let i = 0; i < arr.length; i++){
       for(let j = 0; j < arr[i].length; j++){
          if(i === j){
            arrDiagonal.push(arr[i][j]);
          }
       }
    }
    return arrDiagonal;
  }

  function secondGetDiagonal(arr){
    let arrDiagonal= [];
    for(let i = 0; i < arr.length; i++){
       for(let j = 0; j < arr[i].length; j++){
          if(i === j){
            arrDiagonal.push(arr[i][arr.length - 1 - i]);
          }
       }
    }
    return arrDiagonal;
  }

function getWinner(resArr) {
    if(resArr.every(elem => elem === 'X')) {
        $title.innerHTML = 'Winner X';
        setInterval(function(){$title.innerHTML += '.'}, 1000);
        setTimeout(function(){location.reload(2)}, 4000);
        return true;
    }
    else  if(resArr.every(elem => elem === 'O')){
        $title.innerHTML = 'Winner O';
        setInterval(function(){$title.innerHTML += '.'}, 1000);
        setTimeout(function(){location.reload(2)}, 4000);
        return true;
    }
   
  }
 
  function getColumn(array, col){
    let column = [];
    for(let i = 0; i < array.length; i++){
       column.push(array[i][col]);
    }
    return column;
  }


  gameSizeFunc();









