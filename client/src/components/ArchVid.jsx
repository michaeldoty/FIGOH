import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import './styles/ArchVid.css';
import axios from 'axios';
import uuid from 'react-uuid';
import share from '../assets/logo192.png';

const ArchVid = () => {
  const [archVidData, setArchVidData] = useState([]);

  useEffect(() => {
    fetchArchiveVideoData();
  }, []);

  const fetchArchiveVideoData = () => {
    axios
      .get('/archvid')
      .then((response) => {
        setArchVidData(response.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <div className='archVids'>
      {archVidData.reverse().map((archVid, index) => (
        <div key={uuid()}>
          <ReactPlayer
            controls={true}
            className='react-player'
            url={archVid.path}
            width='320px'
            height='240px'
          />
          <div className='archVidFooter'>
            <div className='vidTitle'>{archVid.name}</div>
            <button className='share' alt='share'></button>
            <button className='delete' alt='delete'></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchVid;
