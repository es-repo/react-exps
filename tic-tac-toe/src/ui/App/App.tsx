import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import HomePage from '../pages/HomePage/HomePage';
import { signUpImpl } from '../../model/accounts/signUp';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import { signIpImpl as signInImpl } from '../../model/accounts/signIn';
import MenuPage from '../pages/MenuPage/MenuPage';
import GamePage from '../pages/GamePage/GamePage';

export default function App() {
  const [gameSize, setGameSize] = useState<number>(3);

  const onGameSizeSelected = (size: number) => {
    setGameSize(size);
  };

  return (
    <Router>
      <Routes>
        <Route path={routes.home.path} element={<HomePage />} />
        <Route path={routes.signUp.path} element={<SignUpPage operations={{ signUp: signUpImpl }} />} />
        <Route path={routes.signIn.path} element={<SignInPage operations={{ signIn: signInImpl }} />} />
        <Route path={routes.menu.path} element={<MenuPage onGameSizeSelected={onGameSizeSelected} />} />
        <Route path={routes.game.path} element={<GamePage gameSize={gameSize} />} />
      </Routes>
    </Router>
  );
}
