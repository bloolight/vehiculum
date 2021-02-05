import React from 'react';

import arrowRight from '../../assets/images/arrow-right.png';

export const Footer = () => {
  return (
      <div className="app-footer">
        <div className="container">
          <div className="footer-action">
            <p className="footer-submit-lead">Got Jokes? Get paid for submitting?</p>
            <p className="footer-link">
              submit joke
              <img src={arrowRight} alt="Link Icon" className="link-icon" />
            </p>
          </div>
        </div>
      </div>
  );
};
