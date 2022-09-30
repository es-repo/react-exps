import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Account } from '../../../model/accounts/account';
import createGameStateAndReducer from '../../../model/game/createGameStateAndReducer';
import { GameReducer } from '../../../model/game/gameReducer';
import { GameReport } from '../../../model/game/gameReport';
import { GameState, Move } from '../../../model/game/gameState';
import { InitiateOrJoinGame } from '../../../model/game/initiateGameOrJoin';
import { Player } from '../../../model/game/player';
import { ReceiveMoves } from '../../../model/game/receiveMoves';
import { SendMove } from '../../../model/game/sendMove';
import { WaitForOpponent } from '../../../model/game/waitForOpponent';
import Spinner from '../../controls/Spinner/Spinner';
import routes from '../../routes';
import GameBoard from './GameBoard/GameBoard';
import styles from './styles.module.css';

export interface GamePageProps {
  operations: {
    initiateOrJoinGame: InitiateOrJoinGame;
    waitForOpponent: WaitForOpponent;
    sendMove: SendMove;
    receiveMoves: ReceiveMoves;
  };
  gameSize: number;
  account: Account | null;
}

export default function GamePage(props: GamePageProps) {
  const navigate = useNavigate();

  const [gameStateAndReducer, setGameStateAndReducer] = useState<[GameState, GameReducer] | null>(null);

  const [gameReport, setGameReport] = useState<GameReport | null>(null);

  const [player, setPlayer] = useState<Player>({
    accountId: '',
    accountEmail: '',
    piece: 'X'
  });

  const [receivedMoves, setReceivedMoves] = useState<Move[]>([]);

  useEffect(() => {
    const effect = async () => {
      let gameReport = await props.operations.initiateOrJoinGame(props.account!, props.gameSize);

      gameReport = await props.operations.waitForOpponent(gameReport);

      if (gameReport.player2 != null) {
        const gameStateAndReducer = createGameStateAndReducer(props.gameSize, gameReport.player1, gameReport.player2);

        const player = gameReport.player1.accountId == props.account?.id ? gameReport.player1 : gameReport.player2;
        setPlayer(player);

        setGameStateAndReducer(gameStateAndReducer);

        setGameReport(gameReport);
      }
    };

    void effect();
  }, [props.account, props.gameSize, props.operations]);

  useEffect(() => {
    if (gameReport != null) void props.operations.receiveMoves(gameReport, moves => setReceivedMoves(moves));
  }, [gameReport, props.operations]);

  const [isGameOver, setIsGameOver] = useState(false);

  const onNextMove = (gameState: GameState, move: Move) => {
    if (gameReport != null) {
      void props.operations.sendMove(gameReport, move, gameState.result);
    }
  };

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
              receivedMoves={receivedMoves}
              player={player}
              gameReducer={gameStateAndReducer[1]}
              onNextMove={onNextMove}
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
