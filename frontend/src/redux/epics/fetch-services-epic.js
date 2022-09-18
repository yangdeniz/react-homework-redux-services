import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ACTIONS } from '../actions/actions';
import { fetchServicesError, fetchServicesSuccess } from '../actions/action-creators';

const fetchServicesEpic = (action$) => {
  return action$.pipe(
    ofType(ACTIONS.FETCH_SERVICES),
    switchMap(() => ajax.getJSON(process.env.REACT_APP_SERVICES_API).pipe(
      map(services => fetchServicesSuccess(services)),
      catchError(error => of(fetchServicesError(error)))
    ))
  );
}

export default fetchServicesEpic;