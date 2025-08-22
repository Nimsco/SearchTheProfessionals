import React from 'react';
import './aboutus.css';

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to Nims! We are building a simple platform to explore user profiles,
        share experiences, and connect with people easily.
      </p>
      <p>
        Our goal is to keep the interface clean and minimal while providing essential
        features like profile editing, search, and user discovery.
      </p>
      <p>
        Thank you for visiting our platform!
      </p>
    </div>
  );
};

export default AboutUs;
