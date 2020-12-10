import React from 'react';
import './styles/LiveVideo.css';
import { connect } from 'react-redux';
import { toggleRecording } from '../actions/toggleRecordingActions';
import { Avatar } from './Avatar';

const LiveVideo = ({ recording }) => {
  let constraintObj = {
    audio: true,
    video: {
      facingMode: 'environment',
      // width: { min: 340, ideal: 700, max: 900 },
      // height: { min: 194, ideal: 400, max: 514 },
    },
  };

  //handle older browsers that might implement getUserMedia in some way
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function (constraintObj) {
      let getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(
          new Error('getUserMedia is not implemented in this browser')
        );
      }
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraintObj, resolve, reject);
      });
    };
  } else {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(device.kind.toUpperCase(), device.label);
          //, device.deviceId
        });
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }

  navigator.mediaDevices
    .getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
      let video = document.querySelector('video');
      if ('srcObject' in video) {
        video.srcObject = mediaStreamObj;
      } else {
        video.src = window.URL.createObjectURL(mediaStreamObj);
      }
      video.onloadedmetadata = function (ev) {
        video.play();
      };
      let toggleRecord = document.getElementById('toggleRecordBtn');
      let toggleRecordView = document.getElementById('toggleRecordView');
      let vidSave = document.getElementById('archvid_1');
      let mediaRecorder = new MediaRecorder(mediaStreamObj);
      mediaRecorder.start();
      console.log('InitialMediaRecorderState', mediaRecorder.state);
      let chunks = [];

      toggleRecord.addEventListener('click', (ev) => {
        console.log('recordingState', recording.recording);
        if (recording.recording) {
          mediaRecorder.start();
          console.log('mediaRecorderState', mediaRecorder.state);
        } else {
          mediaRecorder.stop();
          console.log('mediaRecorderState', mediaRecorder.state);
        }
      });

      toggleRecordView.addEventListener('click', (ev) => {
        console.log('recordingState', recording.recording);
        if (recording.recording) {
          mediaRecorder.start();
          console.log('mediaRecorderState', mediaRecorder.state);
        } else {
          mediaRecorder.stop();
          //run fetchNumVideos in Avatar
          Avatar();
          console.log('mediaRecorderState', mediaRecorder.state);
        }
      });

      mediaRecorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
      };
      mediaRecorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: 'video/mp4;' });
        console.log(blob);
        chunks = [];

        function sendBlobAsBase64(blob) {
          const reader = new FileReader();

          reader.addEventListener('load', () => {
            const dataUrl = reader.result;
            const base64EncodedData = dataUrl.split(',')[1];
            sendDataToBackend(base64EncodedData);
          });

          reader.readAsDataURL(blob);
        }

        sendBlobAsBase64(blob);

        function sendDataToBackend(base64EncodedData) {
          const body = JSON.stringify({
            data: base64EncodedData,
          });

          fetch('/upload', {
            method: 'POST',
            name: 'data',
            headers: {
              'Content-Type': 'application/json',
            },
            body,
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => console.log(json));
        }
      };
    });

  return (
    <div>
      <video className='livebox' controls></video>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recording: state.isRecording,
});

export default connect(mapStateToProps, {
  toggleRecording,
})(LiveVideo);
