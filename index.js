var moves = {
  rock: {
    label: 'Rock',
    svg: 'far fa-hand-rock',
  },
  paper: {
    label: 'Paper',
    svg: 'far fa-hand-paper'
  },
  scissors: {
    label: 'Scissors',
    svg: 'far fa-hand-scissors'
  }
};

var possibleMoves = ['rock', 'paper', 'scissors'];

class Game {
  constructor() {
    var gameActive = true;
    var playerScore = 0;
    var computerScore = 0;
    var maxWins = 5;

    this.getGameActive = () => gameActive;
    this.setGameActive = (state) => gameActive = state;

    this.incrementScore = (winner) => {
      winner === 'player' ? playerScore += 1 : computerScore += 1;
    };

    this.getScore = () => [playerScore, computerScore];

    this.checkWinner = function() {
      if (playerScore === maxWins || computerScore === maxWins) {
        return Math.max(playerScore, computerScore);
      }

      return null;
    }

  }

};

var updateMessage = function(playerMove, computerMove, winner) {
  var message = document.getElementById('messages');

  if (winner === 'tie') {
    messages.innerHTML = `Both you and the computer played ${playerMove}! It's a tie...`;
    return;
  }

  messages.innerHTML = `
    You played ${playerMove} and
    the computer played ${computerMove}...`;

  setTimeout(function() { messages.innerHTML = `${winner} wins!`; }, 3000);

};

var updateScoreboard = function(winner) {
  var scoreboard = document.getElementById('scoreboard');
  if (winner === 'tie') { return; }

  setTimeout(function() {
    scoreboard.innerHTML = `
      Player: ${game.getScore()[0]} |
      Computer: ${game.getScore()[1]}
      `;
  }, 3000);

}

var updateDisplay = function(playerMove, computerMove, winner) {
  updateMessage(playerMove, computerMove, winner);
  updateScoreboard(winner);
};

var randomNumber = function(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
};

var handleClick = function(move) {
  if (!game.getGameActive()) { return; }

  var playerMove = move;
  var computerMove = possibleMoves[randomNumber(0, 2)];
  var winner;

  if (playerMove === computerMove) winner = 'tie';

  if (playerMove === 'rock') {
    if (computerMove === 'scissors') winner = 'player';
    if (computerMove === 'paper') winner = 'computer';
  }

  if (playerMove === 'paper') {
    if (computerMove === 'rock') winner = 'player';
    if (computerMove === 'scissors') winner = 'computer';
  }

  if (playerMove === 'scissors') {
    if (computerMove === 'paper') winner = 'player';
    if (computerMove === 'rock') winner = 'computer';
  }

  game.incrementScore(winner);
  updateDisplay(playerMove, computerMove, winner);
};

var addListeners = function() {
  var gameboard = document.getElementById('gameboard');
  gameboard.addEventListener('click', function(e) {
    if (e.target.id !== '') handleClick(e.target.id);
  })
};

var populateBoard = function() {
  var gameboard = document.getElementById('gameboard');

  for (move in moves) {
    var moveContainer = document.createElement('div');
    moveContainer.setAttribute('class', 'moveContainer')
    moveContainer.setAttribute('id', move)

    var moveImg = document.createElement('i');
    moveImg.setAttribute('class', moves[move].svg)

    var moveLabel = document.createElement('p');
    moveLabel.innerHTML = moves[move].label;

    moveContainer.appendChild(moveImg);
    moveContainer.appendChild(moveLabel);
    gameboard.appendChild(moveContainer);

  }
};

(function() {
  populateBoard();
  addListeners();
})();

var game = new Game();