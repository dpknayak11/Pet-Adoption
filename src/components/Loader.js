import React from 'react';
import '../styles.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner-wrapper">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-text">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
