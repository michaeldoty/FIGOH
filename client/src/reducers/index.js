import { combineReducers } from 'redux';
import toggleRecordingReducer from './toggleRecordingReducer';

export default combineReducers({
  isRecording: toggleRecordingReducer,
});