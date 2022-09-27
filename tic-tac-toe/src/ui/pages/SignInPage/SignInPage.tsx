import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ErrorView from '../../controls/ErrorView/ErrorView';
import Spinner from '../../controls/Spinner/Spinner';
import { SignIn, SignInData } from '../../../model/accounts/signIn';
import SignInForm from './SignInForm/SignInForm';
import { Account } from '../../../model/accounts/account';

export interface SignInPageProps {
  operations: {
    signIn: SignIn;
  };

  onSignedIn: (account: Account) => void;
}

export default function SignInPage(props: SignInPageProps) {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [signInData, setSignInData] = useState<SignInData | null>(null);

  useEffect(() => {
    async function asyncEffect() {
      if (signInData == null) {
        return;
      }

      setErrorMessageText('');
      setIsPending(true);

      const result = await props.operations.signIn(signInData);
      setIsPending(false);

      switch (result.type) {
        case 'ok':
          navigate(routes.menu.path);
          props.onSignedIn(result.value);
          break;
        case 'err':
          setErrorMessageText(result.value);
          break;
      }
    }
    void asyncEffect();
  }, [navigate, props, props.operations, signInData]);

  const onFormSubmit = (signInData: SignInData) => {
    setSignInData(signInData);
  };

  return (
    <main>
      <div className='page-content'>
        <SignInForm onFormSubmit={onFormSubmit} />
        {isPending && <Spinner />}
        <div className='errorContainer'>
          <ErrorView text={errorMessageText} />
        </div>
      </div>
    </main>
  );
}
