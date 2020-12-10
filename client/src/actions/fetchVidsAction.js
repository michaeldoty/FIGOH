import stores from '../store';

export function fetchVids() {
  stores.dispatch({
    type: 'FETCH_VIDS'
  })
}