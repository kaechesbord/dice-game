import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
const Main = () => {
  const [num1, setNum] = useState(2);
  const [num2, setNum2] = useState(2);
  const current = num1 + num2;
  const [player1, setPlayer1] = useState({
    isActive: true,
    currentScore: 0,
    totalScore: 0,
  });
  const [player2, setPlayer2] = useState({
    isActive: false,
    currentScore: 0,
    totalScore: 0,
  });
  function switchActive() {
    if (player1.isActive) {
      setPlayer1({...player1, isActive: false})
      setPlayer2({...player2, isActive: true})
    }
    if (player2.isActive) {
      setPlayer2({...player2, isActive: false})
      setPlayer1({...player1, isActive: true})
    }
  }
  function diceDecider() {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    const randomNum2 = Math.floor(Math.random() * 6) + 1;
    setNum(randomNum);
    setNum2(randomNum2);
  }
  function increaseScore() {
    if (player1.isActive) {
      player1.totalScore += current;
      setPlayer2({...player2, currentScore: 0})
      setPlayer1({...player1, currentScore: current})
    }
    if (player2.isActive) {
      player2.totalScore += current;
      setPlayer2({...player2, currentScore: current })
      setPlayer1({...player1, currentScore: 0})
    }
  }
  function rollDie() {
    diceDecider()
    increaseScore()
  }
  useEffect(() => {
    diceDecider()
  },[])
  useEffect(() => {
Swal.fire({
  icon: 'info',
  title: 'RULES',
  text: 'First to get to 100 wins, get 1 on either die and the player switches.',
  background: '#fff ',
  backdrop: `
  #964000
  `
})
  }, []);
  function newGame() {
    window.location.reload(false);
  }
  function ruleEnforce() {
    if(num1 === 1 || num2 === 1) {
      setTimeout(() => {
        switchActive();
        diceDecider();
      },400)
    }
  }
  ruleEnforce()
  function prize() {
    Swal.fire({
      title: 'You Won!',
      text: "Up for another round?",
      icon: 'success',
      backdrop: `
        #00FF7F`,
      showConfirmButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sure!'
    }).then((result) => {
      if (result.isConfirmed) {
       newGame();
      }
    })
  }
  function winnerDecider() {
    if((player1.isActive && player1.totalScore >= 100) || (player2.isActive && player2.totalScore >= 100)) {
      prize();
    }
  }
  winnerDecider()
  return (
    <div>
      <div className="wrapper clearfix">
        <div className={player1.isActive ? "player-0-panel active" : "player-1-panel" }>
          <div className="player-name" id="name-0">
            Player 1
          </div>
          <div className="player-score" id="score-0">
            {player1.totalScore}
          </div>
          <div className="player-current-box">
            <div className="player-current-label">Current</div>
            <div className="player-current-score" id="current-0">
              {player1.currentScore}
            </div>
          </div>
        </div>
        <div className={player2.isActive ? "player-0-panel active" : "player-1-panel" }>
          <div className="player-name" id="name-1">
            Player 2
          </div>
          <div className="player-score" id="score-1">
            {player2.totalScore}
          </div>
          <div className="player-current-box">
            <div className="player-current-label">Current</div>
            <div className="player-current-score" id="current-1">
              {player2.currentScore}
            </div>
          </div>
        </div>
        <button className="btn-new" onClick={newGame}>
          <i className="ion-ios-plus-outline"></i>New game
        </button>
        <button className="btn-roll" onClick={rollDie}>
          <i className="ion-ios-loop"></i>Roll dice
        </button>
        <button className="btn-hold" onClick={switchActive}>
          <i className="ion-ios-download-outline"></i>Hold
        </button>
        <input type="text" id="winningScore" placeholder="Final score" />
        <img
          src={require(`../components/images/dice-${num1}.png`)}
          alt="Dice"
          className="dice"
          id="dice1"
        />
        <img
          src={require(`../components/images/dice-${num2}.png`)}
          alt="Dice"
          className="dice"
          id="dice2"
        />
      </div>
    </div>
  );
};
export default Main;