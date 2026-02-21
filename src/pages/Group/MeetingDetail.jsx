import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { meetingApi } from '../../api/meetingApi';
import './Group.css';

const WEEK_LABELS = {
  Mon: '월요일', Tue: '화요일', Wed: '수요일', Thu: '목요일',
  Fri: '금요일', Sat: '토요일', Sun: '일요일',
};

const CATEGORY_LABELS = {
  Health: '신체', Emotion: '감정', Social: '사회', Religion: '영적',
  Study: '학습', Environment: '환경', Economy: '경제', Occupation: '직업',
};

export default function MeetingDetail() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await meetingApi.getOne(meetingId);
        setMeeting(response.data.data);
      } catch (err) {
        alert('모임을 불러올 수 없습니다.');
        navigate('/group');
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [meetingId, navigate]);

  const handleJoin = async () => {
    setJoining(true);
    try {
      await meetingApi.join(meetingId);
      alert('모임에 참여했습니다!');
      const response = await meetingApi.getOne(meetingId);
      setMeeting(response.data.data);
    } catch (err) {
      alert(err.response?.data?.message || '모임 참여에 실패했습니다.');
    } finally {
      setJoining(false);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    return `${hour >= 12 ? '오후' : '오전'} ${hour > 12 ? hour - 12 : hour}시 ${m !== '00' ? m + '분' : ''}`.trim();
  };

  if (loading) return <p className="loading-text">로딩 중...</p>;
  if (!meeting) return null;

  return (
    <div className="meeting-detail">
      <div className="post-detail-header">
        <button className="back-btn" onClick={() => navigate('/group')}>&#8592; 뒤로</button>
      </div>

      <div className="meeting-detail-body">
        <span className="meeting-category-badge">
          {CATEGORY_LABELS[meeting.category] || meeting.category}
        </span>
        <h2 className="meeting-detail-title">{meeting.title}</h2>

        <div className="meeting-info-grid">
          <div className="info-item">
            <span className="info-label">일시</span>
            <span className="info-value">매주 {WEEK_LABELS[meeting.week] || meeting.week} {formatTime(meeting.time)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">인원</span>
            <span className="info-value">{meeting.numberOfParticipants} / {meeting.limitNumberOfPeople}명</span>
          </div>
        </div>

        {meeting.description && (
          <div className="meeting-description">
            <h4>설명</h4>
            <p>{meeting.description}</p>
          </div>
        )}

        <button
          className="join-btn"
          onClick={handleJoin}
          disabled={joining || meeting.numberOfParticipants >= meeting.limitNumberOfPeople}
        >
          {joining ? '참여 중...' : meeting.numberOfParticipants >= meeting.limitNumberOfPeople ? '인원 마감' : '참여하기'}
        </button>
      </div>
    </div>
  );
}
