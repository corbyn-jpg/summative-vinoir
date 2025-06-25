// src/Components/Founder/Founder.js
import React from 'react';
import './Founder.css';

const Founder = ({ name, role, bio, image }) => {
  return (
    <div className="founder-card">
      <div className="founder-image-container">
        <img src={image} alt={`${name}'s portrait`} className="founder-image" />
      </div>
      <div className="founder-info">
        <h3 className="founder-name">{name}</h3>
        <p className="founder-role">{role}</p>
        <p className="founder-bio">{bio}</p>
      </div>
    </div>
  );
};

export default Founder;
