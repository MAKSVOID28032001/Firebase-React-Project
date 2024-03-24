// App.js
import React, { useState } from 'react';
import { app } from './Firebase'; // Import the Firebase app instance
import { getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth'; // Import Firebase authentication methods

const auth = getAuth(app); // Initialize Firebase authentication

const App = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset email sent. Check your inbox.');
      } else {
        setMessage('No user is currently authenticated.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        setMessage('Email verification sent. Check your inbox.');
      } else {
        setMessage('No user is currently authenticated.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, 'NEW_PASSWORD');
        setMessage('Password reset successful.');
      } else {
        setMessage('No user is currently authenticated.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetPassword}>Send Password Reset Email</button>
        <hr />
        <h1>Verify Email</h1>
        <button onClick={handleVerifyEmail}>Send Email Verification</button>
        <hr />
        <h1>Reset Password</h1>
        <button onClick={handlePasswordReset}>Reset Password</button>
        <p>{message}</p>
      </div>
    </>
  );
}

export default App;