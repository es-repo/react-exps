import React, { useEffect, useState } from 'react';
import { SignUp, SignUpData } from '../../../model/accounts/signUp';
import SignUpForm from './SignUpForm/SignUpForm';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ErrorView from '../../controls/ErrorView/ErrorView';
import Spinner from '../../controls/Spinner/Spinner';

export interface SignUpPageProps {
  operations: {
    signUp: SignUp;
  };
}

export default function SignUpPage(props: SignUpPageProps) {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null);

  useEffect(() => {
    async function asyncEffect() {
      if (signUpData == null) {
        return;
      }

      setErrorMessageText('');
      setIsPending(true);

      const result = await props.operations.signUp(signUpData);
      setIsPending(false);

      switch (result.type) {
        case 'ok':
          navigate(routes.home.path);
          break;
        case 'err':
          setErrorMessageText(result.value);
          break;
      }
    }
    void asyncEffect();
  }, [navigate, props.operations, signUpData]);

  const onFormSubmit = (signUpData: SignUpData) => {
    setSignUpData(signUpData);
  };

  return (
    <main>
      <div className='page-content'>
        <SignUpForm onFormSubmit={onFormSubmit} />
        {isPending && <Spinner />}
        <div className='errorContainer'>
          <ErrorView text={errorMessageText} />
        </div>
      </div>
    </main>
  );
}
