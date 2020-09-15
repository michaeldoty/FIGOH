import { START_RECORDING, STOP_RECORDING, RECORDbtn_CLASSNAME_ON, RECORDbtn_CLASSNAME_OFF } from '../actions/types';

const initialState = {
  recording: false,
  recordBtnClassName: 'recordButtonOn'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_RECORDING':
      return {
        ...state,
        recording: true
      }
    case 'STOP_RECORDING':
      return {
        ...state,
        recording: false
      }
    case 'RECORDbtn_CLASSNAME_ON':
      return {
        ...state,
        recordBtnClassName: 'recordButtonOn'
      }
    case 'RECORDbtn_CLASSNAME_OFF':
      return {
        ...state,
        recordBtnClassName: 'recordButtonOff'
      }
    default:
      return state;
  }
}
