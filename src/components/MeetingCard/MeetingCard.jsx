import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MeetingCard.css';

const WEEK_LABELS = {
  Mon: '월요일', Tue: '화요일', Wed: '수요일', Thu: '목요일',
  Fri: '금요일', Sat: '토요일', Sun: '일요일',
};

const CATEGORY_LABELS = {
  Health: '신체', Emotion: '감정', Social: '사회', Religion: '영적',
  Study: '학습', Environment: '환경', Economy: '경제', Occupation: '직업',
};

export default function MeetingCard({ id, title, category, week, time, limitNumberOfPeople, numberOfParticipants }) {
  const navigate = useNavigate();

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    return `${hour >= 12 ? '오후' : '오전'} ${hour > 12 ? hour - 12 : hour}시 ${m !== '00' ? m + '분' : ''}`.trim();
  };

  return (
    <div className="meeting-card" onClick={() => navigate(`/group/${id}`)}>
      <div className="meeting-card-top">
        <span className="meeting-category">{CATEGORY_LABELS[category] || category}</span>
        <span className="meeting-people">{numberOfParticipants}/{limitNumberOfPeople}명</span>
      </div>
      <h3 className="meeting-title">{title}</h3>
      <p className="meeting-schedule">
        매주 {WEEK_LABELS[week] || week} {formatTime(time)}
      </p>
    </div>
  );
}
