import React, { useEffect, useState } from 'react';
import './styles/Avatar.css';
import axios from 'axios';

function Avatar(props) {
  const [count, setCount] = useState('');

  useEffect(() => {
    fetchNumVideos();
    console.log('hi');
  }, [count]);

  const fetchNumVideos = () => {
    axios
      .get('/count')
      .then((response) => {
        setCount(response.data);
      })
      .catch((err) => console.log('error', err));
  };

  return (
    <div className='avatarStats'>
      <button className={props.class}>{props.name}</button>
      <div className='stats'>
        <p>Michael Doty</p>
        <p>{count} Videos Secured</p>
        <p>22% of Cloud Storage Used</p>
      </div>
    </div>
  );
}

export default Avatar;
