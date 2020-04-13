let playing = null
const stats = {
  playerX: {
    win: 0,
    draw: 0,
    lost: 0,
  },
  playerO: {
    win: 0,
    draw: 0,
    lost: 0,
  }
}

const boardList = new Array(9).fill("")
const board = document.getElementsByClassName("board")[0]
const current = document.getElementsByClassName("current")[0]
const winner = document.getElementsByClassName("winner")[0]

const score = document.getElementsByClassName("score")
const winX = score[0]
const winO = score[3]
const drawX = score[1]
const drawO = score[4]
const lostX = score[2]
const lostO = score[5]

const whoStart = () => Math.round(Math.random()) === 1 ? "X" : "O"
const next = (curr) => curr === "X" ? "O" : "X"
const checkFull = () => boardList.every(square => square.length > 0)
const clearBoardList = () => boardList.fill("")
const clearBoard = () => {
  for (let i = 0; i < 9; i++) board.children[i].innerHTML = ""
}
const checkWinner = (icon) =>
  (boardList[0] === icon && boardList[1] === icon && boardList[2] === icon) ||
  (boardList[3] === icon && boardList[4] === icon && boardList[5] === icon) ||
  (boardList[6] === icon && boardList[7] === icon && boardList[8] === icon) ||
  (boardList[0] === icon && boardList[3] === icon && boardList[6] === icon) ||
  (boardList[1] === icon && boardList[4] === icon && boardList[7] === icon) ||
  (boardList[2] === icon && boardList[5] === icon && boardList[8] === icon) ||
  (boardList[0] === icon && boardList[4] === icon && boardList[8] === icon) ||
  (boardList[2] === icon && boardList[4] === icon && boardList[6] === icon)
const updateStats = (winner) => {
  switch (winner) {
    case "X":
      stats.playerX.win += 1
      stats.playerO.lost += 1
      winX.innerHTML = stats.playerX.win
      lostO.innerHTML = stats.playerO.lost
      break;
    case "O":
      stats.playerO.win += 1
      stats.playerX.lost += 1
      winO.innerHTML = stats.playerO.win
      lostX.innerHTML = stats.playerX.lost
      break
    default:
      stats.playerX.draw += 1
      stats.playerO.draw += 1
      drawO.innerHTML = stats.playerX.draw
      drawX.innerHTML = stats.playerO.draw
      break;
  }
}

const play = (event) => {

  winner.hidden = true

  const {
    id
  } = event.target
  const {
    tagName
  } = event.path[0]

  if (tagName === "BUTTON") {
    // Comprobamos que no esta marcada la casilla
    if (!boardList[id]) {
      event.target.innerHTML = playing

      boardList[id] = playing
      playing = next(playing)
      current.innerHTML = `Es el turno de <strong>${playing}</strong>`

      let xWins = checkWinner("X")
      let oWins = checkWinner("O")
      let isFull = checkFull()
      if (xWins || oWins || isFull) {
        clearBoardList()
        clearBoard()
        if (isFull) {
          winner.innerHTML = "El tablero esta lleno...empezando de vuelta"
          winner.hidden = false
          updateStats()
        } else {
          winner.innerHTML = `El ganador es el jugador <strong>${xWins?"X":"O"}</strong>`
          winner.hidden = false
          updateStats(xWins ? "X" : "O")
        }
      }
    }
  }
}

playing = whoStart()
current.innerHTML = `<strong>${playing}</strong> va a empezar`
board.addEventListener("click", play)