import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ErrorMessage from '../../controls/ErrorMessage/ErrorMessage';
import LoadingIndicator from '../../controls/LoadingIndicator/LoadingIndicator';
import { SignIn, SignInData } from '../../../model/accounts/signIn';
import SignInForm from './SignInForm/SignInForm';

export interface SignInPageProps {
  operations: {
    signIn: SignIn;
  };
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
          break;
        case 'err':
          setErrorMessageText(result.value);
          break;
      }
    }
    void asyncEffect();
  }, [navigate, props.operations, signInData]);

  const onFormSubmit = (signInData: SignInData) => {
    setSignInData(signInData);
  };

  return (
    <main>
      <div className='page-content'>
        <SignInForm onFormSubmit={onFormSubmit} />
        {isPending && <LoadingIndicator />}
        <div className='errorContainer'>
          <ErrorMessage text={errorMessageText} />
        </div>
      </div>
    </main>
  );
}
