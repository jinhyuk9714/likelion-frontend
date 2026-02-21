import React from "react";
import emotion from "../../assets/icons/감정.svg";
import economy from "../../assets/icons/경제.svg";
import social from "../../assets/icons/사회.svg";
import health from "../../assets/icons/신체.svg";
import spiritual from "../../assets/icons/영적.svg";
import job from "../../assets/icons/직업.svg";
import study from "../../assets/icons/학습.svg";
import environment from "../../assets/icons/환경.svg";
import "./Category.css";

const CATEGORIES = [
  { key: 'Health', label: '신체', icon: health },
  { key: 'Emotion', label: '감정', icon: emotion },
  { key: 'Social', label: '사회', icon: social },
  { key: 'Religion', label: '영적', icon: spiritual },
  { key: 'Study', label: '학습', icon: study },
  { key: 'Environment', label: '환경', icon: environment },
  { key: 'Economy', label: '경제', icon: economy },
  { key: 'Occupation', label: '직업', icon: job },
];

export default function Category({ onSelect, selected }) {
  const handleClick = (key) => {
    if (onSelect) {
      onSelect(selected === key ? null : key);
    }
  };

  return (
    <div className="category-grid">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`category-item ${selected === cat.key ? 'selected' : ''}`}
          onClick={() => handleClick(cat.key)}
        >
          <img src={cat.icon} alt={cat.label} className="category-icon" />
          <span className="category-label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

export { CATEGORIES };
