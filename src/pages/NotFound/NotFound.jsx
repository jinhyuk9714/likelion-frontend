import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-message">페이지를 찾을 수 없습니다.</p>
      <button className="not-found-btn" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
