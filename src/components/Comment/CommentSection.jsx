import React, { useState } from 'react';
import { commentApi } from '../../api/commentApi';
import './CommentSection.css';

export default function CommentSection({ comments, postId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await commentApi.create(postId, 0, { content });
      setContent('');
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setLoading(true);
    try {
      await commentApi.create(postId, parentId, { content: replyContent });
      setReplyContent('');
      setReplyTo(null);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      alert('답글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await commentApi.delete(commentId);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="comment-section">
      <h4 className="comment-title">댓글</h4>

      {comments?.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-header">
            <span className="comment-author">{comment.nickName}</span>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="comment-content">{comment.content}</p>
          <div className="comment-actions">
            <button className="comment-action-btn" onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}>
              답글
            </button>
            <button className="comment-action-btn delete" onClick={() => handleDelete(comment.id)}>
              삭제
            </button>
          </div>

          {/* Replies */}
          {comment.children?.map((reply) => (
            <div key={reply.id} className="comment-reply">
              <div className="comment-header">
                <span className="comment-author">{reply.nickName}</span>
                <span className="comment-date">{formatDate(reply.createdAt)}</span>
              </div>
              <p className="comment-content">{reply.content}</p>
              <div className="comment-actions">
                <button className="comment-action-btn delete" onClick={() => handleDelete(reply.id)}>
                  삭제
                </button>
              </div>
            </div>
          ))}

          {/* Reply form */}
          {replyTo === comment.id && (
            <form onSubmit={(e) => handleReply(e, comment.id)} className="reply-form">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="답글을 입력하세요"
                className="comment-input"
              />
              <button type="submit" className="comment-submit" disabled={loading}>등록</button>
            </form>
          )}
        </div>
      ))}

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="comment-input"
        />
        <button type="submit" className="comment-submit" disabled={loading}>등록</button>
      </form>
    </div>
  );
}
