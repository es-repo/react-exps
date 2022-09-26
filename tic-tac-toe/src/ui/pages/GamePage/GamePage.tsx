import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createGame, Game, Move, nextMove } from '../../../model/game';
import routes from '../../routes';
import GameResult from './GameResult/gameResult';
import GridView from './GridView/GridView';
import PlayerView from './PlayerView/PlayerView';
import styles from './styles.module.css';

const sameInRowCounts: Record<number, number> = {
  [3]: 3,
  [5]: 4,
  [10]: 5,
  [20]: 5
};

export default function GamePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const size = getSize(searchParams);

  const player1Id = 'user1@email.com';
  const player2Id = 'user2@email.com';

  const [game, setGame] = useState<Game>(createGame(size, sameInRowCounts[size], player1Id, player2Id));

  const onGridViewClick = (x: number, y: number) => {
    const move: Move = { x, y };
    const nextGame = nextMove(game, move);
    setGame(nextGame);
  };

  const onNewGameButtonClick = () => {
    navigate(routes.menu.path);
  };

  return (
    <main>
      <div className='page-content'>
        <div className={styles.playersPanel}>
          <PlayerView player={game.player1} isNext={game.nextPlayer == game.player1} />
          <GameResult isGameOver={game.isGameOver} wonPlayer={game.wonPlayer} />
          <PlayerView player={game.player2} isNext={game.nextPlayer == game.player2} />
        </div>
        <GridView grid={game.grid} onClick={onGridViewClick} />
        {game.isGameOver && (
          <button className='button-inverse' onClick={onNewGameButtonClick}>
            New game
          </button>
        )}
      </div>
    </main>
  );
}

function getSize(searchParams: URLSearchParams): number {
  const size: number = parseInt(searchParams.get('size') ?? '3');
  return isNaN(size) || size < 3 ? 3 : size;
}
