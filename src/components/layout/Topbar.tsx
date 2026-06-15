import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Topbar.module.scss';
import profilePic from '../../assets/profile.png';
import logo from '../../assets/logo.svg';

interface TopbarProps {
  onMenuToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lendsqr_auth');
    navigate('/login');
  };

  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.topbar__left}>
        <button
          className={styles.topbar__hamburger}
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className={styles.topbar__logo}>
          <img src={logo} alt="Lendsqr Logo" />
        </div>

        <div className={styles.topbar__search} role="search">
          <input
            type="search"
            placeholder="Search for anything"
            aria-label="Search"
          />
          <button type="submit" aria-label="Submit search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.topbar__right}>
        <button className={styles.topbar__docs}>Docs</button>

        <div className={styles.topbar__bell} aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className={styles['topbar__bell-dot']} aria-hidden="true" />
        </div>

        <div className={styles.topbar__user} ref={dropdownRef}>
          <div 
            className={styles['topbar__user-trigger']} 
            onClick={() => setDropdownOpen(prev => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <img src={profilePic} alt="Adedeji" className={styles['topbar__user-avatar']} />
            <span className={styles['topbar__user-name']}>Adedeji</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles['topbar__user-chevron']}>
              <polygon points="5,9 19,9 12,17" />
            </svg>
          </div>
          
          {dropdownOpen && (
            <div className={styles['topbar__user-dropdown']} role="menu">
              <button role="menuitem" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
