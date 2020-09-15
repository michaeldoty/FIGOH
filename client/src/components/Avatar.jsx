import React from 'react';
import './styles/Avatar.css';

function Avatar(props) {
  return (
    <div className='avatarStats'>
      <button className={props.class}>{props.name}</button>
      <div className='stats'>
        <p>Michael Doty</p>
        <p># of Videos</p>
        <p>22% of Cloud Storage Used</p>
      </div>
    </div>
  );
}

export default Avatar;
