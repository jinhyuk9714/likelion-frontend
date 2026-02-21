import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../api/postApi';
import PostCard from '../../components/PostCard/PostCard';
import './Main.css';

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await postApi.getList(page);
        const data = response.data.data;
        setPosts(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error('게시글 목록 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <div className="main-page">
      <div className="page-header">
        <h2 className="page-title">게시글</h2>
      </div>

      {loading ? (
        <p className="loading-text">로딩 중...</p>
      ) : posts.length === 0 ? (
        <p className="empty-text">게시글이 없습니다.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            이전
          </button>
          <span className="page-info">{page + 1} / {totalPages}</span>
          <button
            className="page-btn"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
          >
            다음
          </button>
        </div>
      )}

      <button className="fab" onClick={() => navigate('/post/new')}>+</button>
    </div>
  );
}
