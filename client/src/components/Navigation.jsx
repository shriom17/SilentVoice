import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h2 style={styles.logo} onClick={() => navigate('/')}>SilentVoice</h2>
        <div style={styles.links}>
          <button
            onClick={() => navigate('/')}
            style={{
              ...styles.navButton,
              ...(isActive('/') ? styles.activeButton : {})
            }}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/create')}
            style={{
              ...styles.navButton,
              ...(isActive('/create') ? styles.activeButton : {})
            }}
          >
            Create Feedback
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              ...styles.navButton,
              ...(isActive('/dashboard') ? styles.activeButton : {})
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/feedback')}
            style={{
              ...styles.navButton,
              ...(isActive('/feedback') ? styles.activeButton : {})
            }}
          >
            Public Feedback
          </button>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #193a5c 0%, #007BFF 100%)',
    padding: '15px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    color: '#fff',
    margin: 0,
    cursor: 'pointer',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '8px 16px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
};

export default Navigation;
