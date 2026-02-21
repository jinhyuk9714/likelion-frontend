import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../api/postApi';
import './Post.css';

export default function PostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await postApi.create({ title, content });
      const newPostId = response.data.data.id;
      navigate(`/post/${newPostId}`);
    } catch (err) {
      setError('게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-page">
      <div className="post-form-header">
        <button className="back-btn" onClick={() => navigate('/')}>&#8592; 뒤로</button>
        <h2 className="page-title">게시글 작성</h2>
      </div>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={10}
            required
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? '작성 중...' : '작성하기'}
        </button>
      </form>
    </div>
  );
}
