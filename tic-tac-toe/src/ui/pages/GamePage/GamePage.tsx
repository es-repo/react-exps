import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Account } from '../../../model/accounts/account';
import createGameStateAndReducer from '../../../model/game/createGameStateAndReducer';
import { waitForOpponent } from '../../../model/game/waitForOpponent';
import { GameReducer } from '../../../model/game/gameReducer';
import { GameState } from '../../../model/game/gameState';
import Spinner from '../../controls/Spinner/Spinner';
import routes from '../../routes';
import GameBoard from './GameBoard/GameBoard';
import styles from './styles.module.css';

export interface GamePageProps {
  gameSize: number;
  account: Account | null;
}

export default function GamePage(props: GamePageProps) {
  const navigate = useNavigate();

  const [gameStateAndReducer, setGameStateAndReducer] = useState<[GameState, GameReducer] | null>(null);

  useEffect(() => {
    const effect = async () => {
      const opponentId = await waitForOpponent();

      const gameStateAndReducer = createGameStateAndReducer(props.gameSize, props.account!.email, opponentId);
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

  if (props.account == null) {
    return null;
  }

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
