import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import routes from '../../routes';
import Menu from './Menu/Menu';

const sizes = [3, 5, 10, 20];

export default function MenuPage() {
  const navigate = useNavigate();

  const onSizeSelected = (size: number) => {
    navigate({
      pathname: routes.game.path,
      search: createSearchParams({
        size: size.toString()
      }).toString()
    });
  };

  return (
    <main>
      <div className='page-content'>
        <Menu sizes={sizes} onSizeSelected={onSizeSelected} />
      </div>
    </main>
  );
}
