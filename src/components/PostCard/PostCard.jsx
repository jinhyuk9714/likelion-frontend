import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostCard.css';

export default function PostCard({ id, title, nickName, content, createdAt, likeCount, commentCount }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="post-card" onClick={() => navigate(`/post/${id}`)}>
      <div className="post-card-header">
        <span className="post-author">{nickName}</span>
        <span className="post-date">{formatDate(createdAt)}</span>
      </div>
      {title && <h3 className="post-title">{title}</h3>}
      <p className="post-preview">{content?.slice(0, 100)}{content?.length > 100 ? '...' : ''}</p>
      <div className="post-card-footer">
        <span className="post-stat">&#x2764; {likeCount || 0}</span>
        <span className="post-stat">&#x1F4AC; {commentCount || 0}</span>
      </div>
    </div>
  );
}
