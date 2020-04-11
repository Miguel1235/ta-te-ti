let playing=null
const boardList=new Array(9).fill("")
const stats={
  player1:{
    win:0,
    draw:0,
    lost:0,
  },
  player2:{
    win:0,
    draw:0,
    lost:0,
  }
}

// DOM
const board=document.getElementsByClassName('board')[0]
const current=document.getElementsByClassName('current')[0]
const winner=document.getElementsByClassName("winner")[0]

// Aca descubri que puedo sacar los selectores con el inspect
const winA= document.querySelector("body > div.stat > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)")
const winB= document.querySelector("body > div.stat > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)")
const drawA=document.querySelector("body > div.stat > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)")
const drawB=document.querySelector("body > div.stat > div:nth-child(2) > div:nth-child(2) > p:nth-child(2)")
const lostA=document.querySelector("body > div.stat > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)")
const lostB=document.querySelector("body > div.stat > div:nth-child(2) > div:nth-child(2) > p:nth-child(3)")

const whoStart=()=>Math.round(Math.random())===1?"X":"O"
const next=(curr)=>curr==="X"?"O":"X"
const checkFull=(board)=>board.every(square=>square.length>0)
const clearBoardList=()=>boardList.fill("")
const clearBoard=()=>{
  for(let i=0;i<9;i++) board.children[i].innerHTML=""
}
const checkWinner=(board,icon)=>
    (board[0]===icon&&board[1]===icon&&board[2]===icon) ||
    (board[3]===icon&&board[4]===icon&&board[5]===icon) ||
    (board[6]===icon&&board[7]===icon&&board[8]===icon) ||
    (board[0]===icon&&board[3]===icon&&board[6]===icon) ||
    (board[1]===icon&&board[4]===icon&&board[7]===icon) ||
    (board[2]===icon&&board[5]===icon&&board[8]===icon) ||
    (board[0]===icon&&board[4]===icon&&board[8]===icon) ||
    (board[2]===icon&&board[4]===icon&&board[6]===icon)
const updateStats=(winner="Draw")=>{
  if(winner==="X"){
    stats.player1.win+=1
    winA.innerHTML=`Victorias ${stats.player1.win}`
    stats.player2.lost+=1
    lostB.innerHTML=`Perdidas ${stats.player2.lost}`
  }
  else if(winner==="O"){
    stats.player2.win+=1
    winB.innerHTML=`Victorias ${stats.player2.win}`
    stats.player1.lost+=1
    lostA.innerHTML=`Perdidas ${stats.player1.lost}`
  }
  else{
    stats.player1.draw+=1
    drawB.innerHTML=`Empates ${stats.player1.draw}`
    stats.player2.draw+=1
    drawA.innerHTML=`Empates ${stats.player2.draw}`
  }
}

const play=(event)=>{

  // Ocultamos a quien gano en la pasada anterior
  winner.hidden=true

  const {id}=event.target
  const {tagName}=event.path[0]

  if(tagName==="BUTTON"){
    // Comprobamos que no esta marcada la casilla
    if(!boardList[id]){
      event.target.innerHTML=playing

      boardList[id]=playing
      playing=next(playing)
      current.innerHTML=`Es el turno de ${playing}`

      // checkWinner
      let xWins=checkWinner(boardList,"X")
      let oWins=checkWinner(boardList,"O")
      if(xWins||oWins){
        winner.innerHTML=`El ganador es el jugador ${xWins?"X":"O"}`
        winner.hidden=false
        clearBoardList()
        clearBoard()
        updateStats(xWins?"X":"O")
      }
      if(checkFull(boardList)===true){
        winner.innerHTML="El tablero esta lleno...empezando de vuelta"
        winner.hidden=false
        clearBoardList()
        clearBoard()
        updateStats()
      }
    }
  }
}

playing=whoStart()
current.innerHTML=`${playing} va a empezar`

board.addEventListener("click",play)
