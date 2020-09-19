import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import './styles/ArchVid.css';
import axios from 'axios';
import uuid from 'react-uuid';

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

  const randomSize = () => {
    let rando = Math.random() * (200 - 1 + 1) + 1;
    rando = rando.toFixed(1);
    return rando;
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
            <div className='footerInfo'>
              <div className='vidTitle'>{archVid.name} |</div>
              <div className='vidSize'>{randomSize()}MB</div>
            </div>
            <div>
              <button className='share' alt='share'>
                <i className='icon-repeat'></i>
              </button>
              <button className='delete' alt='delete'></button>
            </div>
          </div>
          <div className='tagFooter'>
            <div className='tags'>
              <div className='tagItem'>tag</div>
              <div className='tagItem'>tag</div>
              <div className='tagItem'>tag</div>
              <div className='tagItem'>tag</div>
              <div className='tagItem'>tasdfasdg</div>
              <div className='tagItem'>tag</div>
            </div>
            <div className='edit'></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchVid;
