import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ACTIONS } from '../actions/actions';
import { fetchServiceDetailsError, fetchServiceDetailsSuccess } from '../actions/action-creators';

const fetchServiceDetailsEpic = (action$) => {
  return action$.pipe(
    ofType(ACTIONS.FETCH_SERVICE_DETAILS),
    map(request => request.payload.id),
    switchMap(id => ajax.getJSON(process.env.REACT_APP_SERVICES_API + id).pipe(
      map(service => fetchServiceDetailsSuccess(service)),
      catchError(error => of(fetchServiceDetailsError(error)))
    ))
  );
}

export default fetchServiceDetailsEpic;