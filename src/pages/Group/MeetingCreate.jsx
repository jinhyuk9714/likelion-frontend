import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingApi } from '../../api/meetingApi';
import './Group.css';

const CATEGORIES = [
  { value: 'Health', label: '신체' },
  { value: 'Emotion', label: '감정' },
  { value: 'Social', label: '사회' },
  { value: 'Religion', label: '영적' },
  { value: 'Study', label: '학습' },
  { value: 'Environment', label: '환경' },
  { value: 'Economy', label: '경제' },
  { value: 'Occupation', label: '직업' },
];

const WEEKS = [
  { value: 'Mon', label: '월요일' },
  { value: 'Tue', label: '화요일' },
  { value: 'Wed', label: '수요일' },
  { value: 'Thu', label: '목요일' },
  { value: 'Fri', label: '금요일' },
  { value: 'Sat', label: '토요일' },
  { value: 'Sun', label: '일요일' },
];

export default function MeetingCreate() {
  const [form, setForm] = useState({
    title: '',
    category: 'Health',
    week: 'Mon',
    time: '18:00',
    limitNumberOfPeople: 6,
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'limitNumberOfPeople' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('모임 이름을 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        time: form.time + ':00', // HH:mm -> HH:mm:ss for Java LocalTime
      };
      await meetingApi.create(payload);
      navigate('/group');
    } catch (err) {
      setError(err.response?.data?.message || '모임 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-page">
      <div className="post-form-header">
        <button className="back-btn" onClick={() => navigate('/group')}>&#8592; 뒤로</button>
        <h2 className="page-title">모임 만들기</h2>
      </div>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">모임 이름</label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="모임 이름을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="week">요일</label>
          <select id="week" name="week" value={form.week} onChange={handleChange}>
            {WEEKS.map((w) => (
              <option key={w.value} value={w.value}>{w.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">시간</label>
          <input
            id="time"
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="limitNumberOfPeople">최대 인원</label>
          <input
            id="limitNumberOfPeople"
            type="number"
            name="limitNumberOfPeople"
            value={form.limitNumberOfPeople}
            onChange={handleChange}
            min={2}
            max={100}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="모임에 대해 설명해주세요"
            rows={5}
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? '생성 중...' : '모임 만들기'}
        </button>
      </form>
    </div>
  );
}
