import React, { useState } from 'react';
import { SignUpData } from '../../../../model/accounts/signUp';

export interface SignUpFormProps {
  onFormSubmit: (signUpData: SignUpData) => void;
}

export default function SignUpForm(props: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreementsAccepted, setAgreementsAccepted] = useState(false);

  const onEmailInputChange = (event: React.FormEvent<HTMLInputElement>) => setEmail(event.currentTarget.value);

  const onPasswordInputChange = (event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value);

  const onAgreementsAcceptedCheckboxChange = (event: React.FormEvent<HTMLInputElement>) =>
    setAgreementsAccepted(event.currentTarget.checked);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const signUpData: SignUpData = { email, password, agreementsAccepted };
    props.onFormSubmit(signUpData);
    event.preventDefault();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type='email' placeholder='your@email.com' required value={email} onChange={onEmailInputChange} />
      <input type='password' placeholder='password' required value={password} onChange={onPasswordInputChange} />
      <div>
        <input type='checkbox' checked={agreementsAccepted} onChange={onAgreementsAcceptedCheckboxChange} />
        Please agree with our agreements
      </div>
      <button type='submit'>Create account</button>
    </form>
  );
}
