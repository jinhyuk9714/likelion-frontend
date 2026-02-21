import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../../api/postApi';
import { AuthContext } from '../../contexts/AuthContext';
import CommentSection from '../../components/Comment/CommentSection';
import './Post.css';

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      const response = await postApi.getOne(id);
      setPost(response.data.data);
    } catch (err) {
      alert('게시글을 불러올 수 없습니다.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleLike = async () => {
    try {
      await postApi.like(id, user.id);
      fetchPost();
    } catch (err) {
      alert(err.response?.data?.message || '좋아요에 실패했습니다.');
    }
  };

  const handleUnlike = async () => {
    try {
      await postApi.unlike(id, user.id);
      fetchPost();
    } catch (err) {
      alert(err.response?.data?.message || '좋아요 취소에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
    try {
      await postApi.delete(id);
      navigate('/');
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) return <p className="loading-text">로딩 중...</p>;
  if (!post) return null;

  const isAuthor = user?.nickName === post.nickName;

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>&#8592; 뒤로</button>
        {isAuthor && (
          <div className="post-detail-actions">
            <button className="action-btn" onClick={() => navigate(`/post/${id}/edit`)}>수정</button>
            <button className="action-btn delete" onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>

      <div className="post-detail-body">
        <div className="post-meta">
          <span className="post-detail-author">{post.emoji} {post.nickName}</span>
          <span className="post-detail-date">{formatDate(post.createdAt)}</span>
        </div>
        {post.title && <h2 className="post-detail-title">{post.title}</h2>}
        <p className="post-detail-content">{post.content}</p>

        <div className="like-section">
          <button className="like-btn" onClick={handleLike}>&#x2764; 좋아요 {post.likeCount || 0}</button>
          <button className="unlike-btn" onClick={handleUnlike}>좋아요 취소</button>
        </div>
      </div>

      <CommentSection
        comments={post.commentList}
        postId={parseInt(id, 10)}
        onCommentAdded={fetchPost}
      />
    </div>
  );
}
