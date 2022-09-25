import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { createGame } from '../../../model/game';
import GridView from './GridView/GridView';

const sameInRowCounts: Record<number, number> = {
  [3]: 3,
  [5]: 4,
  [10]: 5,
  [20]: 5
};

export default function GamePage() {
  const [searchParams] = useSearchParams();

  const size = getSize(searchParams);

  const player1Id = '1';
  const player2Id = '2';
  const game = createGame(size, sameInRowCounts[size], player1Id, player2Id);

  return (
    <main>
      <div className='page-content'>
        <GridView grid={game.grid} />
      </div>
    </main>
  );
}

function getSize(searchParams: URLSearchParams): number {
  const size: number = parseInt(searchParams.get('size') ?? '3');
  return isNaN(size) || size < 3 ? 3 : size;
}
