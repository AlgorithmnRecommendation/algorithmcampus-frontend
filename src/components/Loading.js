import React from 'react';
import './Loading.css';

const Loading = ({ message = "로딩 중..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
