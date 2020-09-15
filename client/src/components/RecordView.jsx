import React from 'react';
import './styles/RecordButton.css';
import { connect } from 'react-redux';
import {
  toggleRecording,
  recordBtnClassName,
} from '../actions/toggleRecordingActions';

const RecordButton = ({ recording }) => {
  const onClick = () => {
    toggleRecording();
    recordBtnClassName();
  };

  return (
    <div>
      <button id='toggleRecordView' onClick={onClick}></button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recording: state.isRecording,
});

export default connect(mapStateToProps, {
  toggleRecording,
  recordBtnClassName,
})(RecordButton);
