import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import fetchServiceDetailsEpic from './epics/fetch-service-details-epic';
import fetchServicesEpic from './epics/fetch-services-epic';
import serviceDetailsReducer from './reducers/service-details-reducer';
import servicesReducer from './reducers/services-reducer';

const reducer = combineReducers({
  services: servicesReducer,
  serviceDetails: serviceDetailsReducer
});

const epic = combineEpics(
  fetchServicesEpic, 
  fetchServiceDetailsEpic
);

const epicMiddleware = createEpicMiddleware();

const store = legacy_createStore(
  reducer, 
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(epic);
export default store;