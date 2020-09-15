import React from 'react';
import './styles/StorageButton.css';

function StorageButton(props) {
  return (
    <div>
      <button className={props.class}>{props.name}</button>
    </div>
  );
}

export default StorageButton;
