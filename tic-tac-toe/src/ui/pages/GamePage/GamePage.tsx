import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createGame } from '../../../model/game';
import routes from '../../routes';
import GameBoard from './GameBoard/GameBoard';

export interface GamePageProps {
  gameSize: number;
}

export default function GamePage(props: GamePageProps) {
  const navigate = useNavigate();

  const player1Id = 'user1@email.com';
  const player2Id = 'user2@email.com';
  const game = createGame(props.gameSize, player1Id, player2Id);

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
        <GameBoard onGameOver={onGameOver} game={game} />
        {isGameOver && (
          <button className='button-inverse' onClick={onNewGameClick}>
            New game
          </button>
        )}
      </div>
    </main>
  );
}
