import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Account } from '../../../model/accounts/account';
import createGameStateAndReducer from '../../../model/game/createGameStateAndReducer';
import { GameReducer } from '../../../model/game/gameReducer';
import { GameState } from '../../../model/game/gameState';
import { InitiateOrJoinGame } from '../../../model/game/initiateGameOrJoin';
import { WaitForOpponent } from '../../../model/game/waitForOpponent';
import Spinner from '../../controls/Spinner/Spinner';
import routes from '../../routes';
import GameBoard from './GameBoard/GameBoard';
import styles from './styles.module.css';

export interface GamePageProps {
  operations: {
    initiateOrJoinGame: InitiateOrJoinGame;
    waitForOpponent: WaitForOpponent;
  };
  gameSize: number;
  account: Account | null;
}

export default function GamePage(props: GamePageProps) {
  const navigate = useNavigate();

  const [gameStateAndReducer, setGameStateAndReducer] = useState<[GameState, GameReducer] | null>(null);

  useEffect(() => {
    const effect = async () => {
      let gameReport = await props.operations.initiateOrJoinGame(props.account!, props.gameSize);

      gameReport = await props.operations.waitForOpponent(gameReport);

      if (gameReport.player2 != null) {
        const gameStateAndReducer = createGameStateAndReducer(props.gameSize, gameReport.player1, gameReport.player2);
        setGameStateAndReducer(gameStateAndReducer);
      }
    };

    void effect();
  }, [props.account, props.gameSize, props.operations]);

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
