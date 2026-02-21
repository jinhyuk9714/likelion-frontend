import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import listIcon from '../../assets/icons/list.svg';
import groupIcon from '../../assets/icons/group.svg';
import './Header.css';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: listIcon, label: '홈' },
    { path: '/group', icon: groupIcon, label: '모임' },
  ];

  return (
    <>
      <header className="top-header">
        <div className="header-content">
          <h1 className="header-title" onClick={() => navigate('/')}>우동</h1>
          <div className="header-user">
            {user && (
              <>
                <span className="user-emoji">{user.emoji}</span>
                <span className="user-name">{user.nickName}</span>
              </>
            )}
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </header>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <img src={item.icon} alt={item.label} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
