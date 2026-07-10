import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { verifyGoogleToken, saveUserToken, saveUserData } from '../utils/googleAuth';
import './GoogleLoginButton.css';

const GoogleLoginButton = ({ onLoginSuccess, onLoginError }) => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await verifyGoogleToken(credentialResponse.credential);
      saveUserToken(response.token);
      saveUserData(response.user);
      onLoginSuccess(response.user);
    } catch (error) {
      console.error('Login error:', error);
      onLoginError?.(error);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    onLoginError?.('Login failed');
  };

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="google-login-button">
        <button className="login-btn-fallback" disabled>
          Configure Google OAuth
        </button>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="google-login-button">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          text="signin_with"
          width="300"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
