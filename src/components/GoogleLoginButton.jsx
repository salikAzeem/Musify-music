// src/components/GoogleLoginButton.jsx
import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Send Google user to backend
      const res = await axios.post('https://musify-backend-hz9d.onrender.com/api/auth/google', {
        username: user.displayName,
        email: user.email,
      });

      // ✅ Save backend token and user in context
      saveAuth(res.data);
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
