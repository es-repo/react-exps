import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import Logo from '../Logo/Logo';
import styles from './styles.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  const signUpButtonClick = () => {
    navigate(routes.signUp.path);
  };

  const signInButtonClick = () => {
    navigate(routes.signIn.path);
  };

  return (
    <main>
      <div className='page-content'>
        <div className={styles.logoAndNavContainer}>
          <Logo />
          <nav className={styles.signInSingUpNav}>
            <button onClick={signInButtonClick}>Sign In</button>
            <button onClick={signUpButtonClick}>Sign Up</button>
          </nav>
        </div>
      </div>
    </main>
  );
}

