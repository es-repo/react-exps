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
import { Account } from '../../model/accounts/account';
import AccessDeniedPage from '../pages/AccessDeniedPage/AccessDeniedPage';
import { initiateOrJoinGameImpl } from '../../model/game/initiateGameOrJoin';
import { waitForOpponentImpl } from '../../model/game/waitForOpponent';

export default function App() {
  const [account, setAccount] = useState<Account | null>(null);
  const [gameSize, setGameSize] = useState<number>(3);

  const onSignedIn = (account: Account) => {
    setAccount(account);
  };

  const onGameSizeSelected = (size: number) => {
    setGameSize(size);
  };

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path={routes.home.path} element={<HomePage />} />
          <Route path={routes.signUp.path} element={<SignUpPage operations={{ signUp: signUpImpl }} />} />
          <Route
            path={routes.signIn.path}
            element={<SignInPage operations={{ signIn: signInImpl }} onSignedIn={onSignedIn} />}
          />
          <Route
            path={routes.menu.path}
            element={withPermissions(account, <MenuPage onGameSizeSelected={onGameSizeSelected} />)}
          />
          <Route
            path={routes.game.path}
            element={withPermissions(
              account,
              <GamePage
                operations={{ initiateOrJoinGame: initiateOrJoinGameImpl, waitForOpponent: waitForOpponentImpl }}
                gameSize={gameSize}
                account={account}
              />
            )}
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

function withPermissions(account: Account | null, page: React.ReactNode): React.ReactNode {
  return account == null ? <AccessDeniedPage /> : page;
}
