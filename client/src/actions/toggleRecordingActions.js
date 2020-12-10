import stores from '../store';
console.log(stores);

let togRec = true;

export function toggleRecording() {
  if (togRec) {
    togRec = !togRec;
    console.log('togRec is', togRec)
    stores.dispatch({
      type: 'START_RECORDING'
    })
  } else {
    togRec = !togRec;
    console.log('togRec is', togRec)
    stores.dispatch({
      type: 'STOP_RECORDING'
    })
  }
}

export function recordBtnClassName() {
  if (togRec) {
    stores.dispatch({
      type: 'RECORDbtn_CLASSNAME_ON'
    })
  } else {
    stores.dispatch({
      type: 'RECORDbtn_CLASSNAME_OFF'
    })
  }
}
