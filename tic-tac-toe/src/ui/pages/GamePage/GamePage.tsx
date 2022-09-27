import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { createGame as createGameStateAndReducer, GameReducer, GameState, waitForOpponent } from '../../../model/game';
import Spinner from '../../controls/Spinner/Spinner';
import routes from '../../routes';
import GameBoard from './GameBoard/GameBoard';
import styles from './styles.module.css';

export interface GamePageProps {
  gameSize: number;
}

export default function GamePage(props: GamePageProps) {
  const navigate = useNavigate();

  const [gameStateAndReducer, setGameStateAndReducer] = useState<[GameState, GameReducer] | null>(null);

  useEffect(() => {
    const effect = async () => {
      const opponentId = await waitForOpponent();

      const player1Id = 'user1@email.com';
      const gameStateAndReducer = createGameStateAndReducer(props.gameSize, player1Id, opponentId);
      setGameStateAndReducer(gameStateAndReducer);
    };

    void effect();
  });

  const [isGameOver, setIsGameOver] = useState(false);

  const onGameOver = () => {
    setIsGameOver(true);
  };

  const onNewGameClick = () => {
    navigate(routes.menu.path);
  };

  return (
    <main>
      <div className='page-content'>
        {gameStateAndReducer == null ? (
          <div className={styles.waitingOpponentContainer}>
            <h1>Waiting for an opponent...</h1>
            <Spinner />
          </div>
        ) : (
          <>
            <GameBoard
              onGameOver={onGameOver}
              initialGameState={gameStateAndReducer[0]}
              gameReducer={gameStateAndReducer[1]}
            />
            {isGameOver && (
              <button className='button-inverse' onClick={onNewGameClick}>
                New game
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
