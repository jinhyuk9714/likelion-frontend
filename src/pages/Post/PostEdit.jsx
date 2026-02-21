import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../../api/postApi';
import './Post.css';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postApi.getOne(id);
        const post = response.data.data;
        setTitle(post.title || '');
        setContent(post.content || '');
      } catch (err) {
        alert('게시글을 불러올 수 없습니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await postApi.update(id, { title, content });
      navigate(`/post/${id}`);
    } catch (err) {
      const message = err.response?.data?.message || '게시글 수정에 실패했습니다.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="loading-text">로딩 중...</p>;

  return (
    <div className="post-form-page">
      <div className="post-form-header">
        <button className="back-btn" onClick={() => navigate(`/post/${id}`)}>&#8592; 뒤로</button>
        <h2 className="page-title">게시글 수정</h2>
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
        <button type="submit" className="auth-button" disabled={saving}>
          {saving ? '수정 중...' : '수정하기'}
        </button>
      </form>
    </div>
  );
}
