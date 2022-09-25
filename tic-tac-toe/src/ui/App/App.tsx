import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import HomePage from '../pages/HomePage/HomePage';
import { signUpImpl } from '../../model/accounts/signUp';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import { signIpImpl as signInImpl } from '../../model/accounts/signIn';
import MenuPage from '../pages/MenuPage/MenuPage';
import GamePage from '../pages/GamePage/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home.path} element={<HomePage />} />
        <Route path={routes.signUp.path} element={<SignUpPage operations={{ signUp: signUpImpl }} />} />
        <Route path={routes.signIn.path} element={<SignInPage operations={{ signIn: signInImpl }} />} />
        <Route path={routes.menu.path} element={<MenuPage />} />
        <Route path={routes.game.path} element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
