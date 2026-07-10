import { useGoogleLogin } from '@react-oauth/google'
import './LoginScreen.css'

const LoginScreen = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onError: () => console.error('Login Failed'),
  })

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo">
          <h1>JELLY</h1>
          <h1>BLOCK</h1>
        </div>

        <div className="login-description">
          <p>Welcome to JellyBlock</p>
          <p>The Ultimate Multiplayer Puzzle Game</p>
        </div>

        <button className="google-login-btn" onClick={() => login()}>
          <span className="google-icon">🔐</span>
          Sign in with Google
        </button>

        <div className="login-features">
          <div className="feature">
            <span className="icon">🎮</span>
            <span>Play Multiplayer</span>
          </div>
          <div className="feature">
            <span className="icon">🤖</span>
            <span>Practice Mode</span>
          </div>
          <div className="feature">
            <span className="icon">🏆</span>
            <span>Track Stats</span>
          </div>
        </div>

        <div className="login-footer">
          <p>Safe • Fast • Fun</p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
