import React from 'react';
import { useNavigate } from 'react-router';
import routes from '../../routes';
import Menu from './Menu/Menu';

const sizes = [3, 5, 10];

export interface MenuPageProps {
  onGameSizeSelected: (size: number) => void;
}

export default function MenuPage(props: MenuPageProps) {
  const navigate = useNavigate();

  const onGameSizeSelected = (size: number) => {
    props.onGameSizeSelected(size);
    navigate(routes.game.path);
  };

  return (
    <main>
      <div className='page-content'>
        <Menu sizes={sizes} onGameSizeSelected={onGameSizeSelected} />
      </div>
    </main>
  );
}
