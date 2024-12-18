import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'active', 'tooEarly', 'ended'
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [round, setRound] = useState(1);
  const [results, setResults] = useState([]);

  const maxRounds = 5;

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);

    const randomDelay = Math.random() * 3000 + 1000; // 1-4 seconds
    setTimeout(() => {
      setGameState("active");
      setStartTime(Date.now());
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      setGameState("tooEarly");
      setReactionTime(null);
    } else if (gameState === "active") {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setGameState("ended");

      // Save results
      setResults([...results, timeTaken]);

      // Update best time
      if (!bestTime || timeTaken < bestTime) {
        setBestTime(timeTaken);
      }
    }
  };

  const nextRound = () => {
    if (round < maxRounds) {
      setRound(round + 1);
      setGameState("waiting");
      startGame();
    } else {
      alert("Game Over! Check your scores!");
    }
  };

  const resetGame = () => {
    setGameState("waiting");
    setStartTime(null);
    setReactionTime(null);
    setBestTime(null);
    setRound(1);
    setResults([]);
  };

  return (
    <div className="app">
      <h1>Reaction Timer Game</h1>
      <p>Round: {round}/{maxRounds}</p>
      <p>Reaction Time: {reactionTime ? `${reactionTime} ms` : "--"}</p>
      <p>Best Time: {bestTime ? `${bestTime} ms` : "--"}</p>

      {gameState === "tooEarly" && <p className="error">Too Early! Wait for the box to activate!</p>}

      {gameState === "waiting" && (
        <button className="start-btn" onClick={startGame}>
          Start
        </button>
      )}

      {gameState === "active" && (
        <div className="reaction-box active" onClick={handleClick}>
          CLICK ME!
        </div>
      )}

      {gameState === "ended" && (
        <>
          <p className="success">Your Time: {reactionTime} ms</p>
          {round < maxRounds ? (
            <button className="next-btn" onClick={nextRound}>
              Next Round
            </button>
          ) : (
            <button className="reset-btn" onClick={resetGame}>
              Reset Game
            </button>
          )}
        </>
      )}

      {results.length > 0 && (
        <div className="results">
          <h2>Results:</h2>
          <ul>
            {results.map((time, index) => (
              <li key={index}>Round {index + 1}: {time} ms</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
