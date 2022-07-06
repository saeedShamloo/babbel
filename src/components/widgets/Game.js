import React, { useEffect, useReducer } from "react";
import { Api, generateRandomNumber } from "../../util";
import { Alert, Button, Typography } from "../lib";
import { PlayerCard } from "./PlayerCard";

const actions = {
  INIT_GAME: "init_game",
  ROLL: "roll",
  RESET: "reset",
};

const initialState = {
  turn: 0,
  gameInfo: null,
  scores: null,
  winner: null,
};

const gameReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.INIT_GAME:
      return { ...initialState, ...payload };
    case actions.ROLL:
      return {
        ...state,
        scores: payload.scores,
        turn: (state.turn + 1) % state.gameInfo.players.length,
        winner: Object.keys(payload.scores).find(
          (playerId) => payload.scores[playerId] >= state.gameInfo.scoreToWin
        ),
      };
    case actions.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleRoll = (playerId) => {
    const scores = state.scores || {};
    const score = generateRandomNumber(6);

    scores[playerId] = (scores[playerId] || 0) + score;
    dispatch({ type: actions.ROLL, payload: { scores } });
  };

  const handleReset = () => {
    dispatch({ type: actions.RESET });
    handleInitializeGame();
  };

  const handleInitializeGame = async () => {
    const gameInfo = await Api.get("/game");
    dispatch({ type: actions.INIT_GAME, payload: { gameInfo } });
  };

  const handlePostWinner = () => {
    Api.post("/game", {
      winnerId: state.winner,
      gameId: state.gameInfo.matchId,
    });
  };

  useEffect(() => {
    handleInitializeGame();
  }, []);

  useEffect(() => {
    if (state.winner) handlePostWinner();
  }, [state.winner]);

  if (!state.gameInfo)
    return (
      <div role="alert" aria-busy="true">
        Loading...
      </div>
    );

  return (
    <main className="game">
      <Typography variant="label">
        Match ID: {state.gameInfo.matchId}
      </Typography>
      <Typography variant="title">Random Dice Game!</Typography>
      <Typography variant="subtitle">
        Score to win: {state.gameInfo.scoreToWin}
      </Typography>
      {state.winner && (
        <Alert variant="success" aria-label="game-result">
          The Game has finished, Winner:{" "}
          {state.gameInfo.players.find(({ id }) => id === state.winner).name}
          <Button onClick={handleReset} varinat="success">
            Reset The Game
          </Button>
        </Alert>
      )}
      <div className="players">
        {state.gameInfo.players.map((player, index) => (
          <PlayerCard
            key={player.id}
            player={player}
            score={state.scores?.[player.id]}
            disabledRoll={state.winner || state.turn !== index}
            onRoll={() => handleRoll(player.id)}
          />
        ))}
      </div>
    </main>
  );
};
