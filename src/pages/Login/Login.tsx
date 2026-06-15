import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import logo from '../../assets/logo.svg';
import loginIllustration from '../../assets/login.png';

const VALID_EMAIL = 'admin@lendsqr.com';
const VALID_PASSWORD = 'password123';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem('lendsqr_auth', 'true');
      navigate('/users');
    } else {
      setErrors({ general: 'Invalid email or password. Try admin@lendsqr.com / password123' });
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      {/* Left — illustration */}
      <div className={styles.login__left}>
        <div className={styles['login__left-logo']}>
          <img src={logo} alt="Lendsqr Logo" />
        </div>
        <div className={styles['login__left-illustration']}>
          <img src={loginIllustration} alt="Login Illustration" />
        </div>
      </div>

      {/* Right — form */}
      <div className={styles.login__right}>
        <form className={styles.login__form} onSubmit={handleSubmit} noValidate>
          <h1 className={styles.login__title}>Welcome!</h1>
          <p className={styles.login__subtitle}>Enter details to login.</p>

          {errors.general && (
            <div className={styles['login__error-msg']} role="alert">{errors.general}</div>
          )}

          <div className={styles.login__field}>
            <div className={`${styles['login__field-wrapper']} ${errors.email ? styles.error : ''}`}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
            </div>
            {errors.email && <span id="email-error" className={styles['login__field-error']}>{errors.email}</span>}
          </div>

          <div className={styles.login__field}>
            <div className={`${styles['login__field-wrapper']} ${errors.password ? styles.error : ''}`}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-label="Password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles['login__field-toggle']}
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span id="password-error" className={styles['login__field-error']}>{errors.password}</span>}
          </div>

          <a href="#" className={styles.login__forgot} onClick={e => e.preventDefault()}>
            Forgot Password?
          </a>

          <button
            type="submit"
            className={styles.login__submit}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};



export default Login;
