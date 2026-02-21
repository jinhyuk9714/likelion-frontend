import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingApi } from '../../api/meetingApi';
import Category from '../../components/Category/category';
import MeetingCard from '../../components/MeetingCard/MeetingCard';
import './Group.css';

export default function Total() {
  const [meetings, setMeetings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const response = await meetingApi.getList(page, selectedCategory);
        const data = response.data;
        setMeetings(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error('모임 목록 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, [page, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <div className="group-page">
      <div className="page-header">
        <h2 className="page-title">모임</h2>
      </div>

      <Category onSelect={handleCategorySelect} selected={selectedCategory} />

      {loading ? (
        <p className="loading-text">로딩 중...</p>
      ) : meetings.length === 0 ? (
        <p className="empty-text">모임이 없습니다.</p>
      ) : (
        <div className="meeting-list">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} {...meeting} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
          >
            이전
          </button>
          <span className="page-info">{page} / {totalPages}</span>
          <button
            className="page-btn"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            다음
          </button>
        </div>
      )}

      <button className="fab" onClick={() => navigate('/group/new')}>+</button>
    </div>
  );
}
