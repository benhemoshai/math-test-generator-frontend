// src/pages/ActivateAccount.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const ActivateAccount = () => {
  const { userId } = useParams();
  const { activate } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const activateNow = async () => {
      try {
        await activate(userId);
        alert('🎉 Your account is now activated!');
        navigate('/');
      } catch (err) {
        alert('❌ Activation failed. Please try again later.');
      }
    };

    activateNow();
  }, [userId, activate, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center text-gray-800">
      <p className="text-lg font-medium">Activating your account...</p>
    </div>
  );
};

export default ActivateAccount;
