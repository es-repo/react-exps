import React, { useState } from 'react';
import { SignInData } from '../../../../model/accounts/signIn';

export interface SignInFormProps {
  onFormSubmit: (signInData: SignInData) => void;
}

export default function SignInForm(props: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailInputChange = (event: React.FormEvent<HTMLInputElement>) => setEmail(event.currentTarget.value);

  const onPasswordInputChange = (event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const signInData: SignInData = { email, password };
    props.onFormSubmit(signInData);
    event.preventDefault();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type='email' placeholder='your@email.com' required value={email} onChange={onEmailInputChange} />
      <input type='password' placeholder='password' required value={password} onChange={onPasswordInputChange} />
      <button type='submit'>Sign In</button>
    </form>
  );
}
