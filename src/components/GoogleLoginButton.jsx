// src/components/GoogleLoginButton.jsx
import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      saveAuth({
        token: await user.getIdToken(),
        user: {
          username: user.displayName,
          email: user.email,
          id: user.uid
        }
      });

      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <button className="google-btn" onClick={handleGoogleLogin}>
      <FcGoogle size={20} style={{ marginRight: '8px' }} />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
