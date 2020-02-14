import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const containerId = (payload) => ApiCaller('updatecontaineridbyid?jobid='+payload.jobid+'&'+'containerid='+payload.containerid,'get',payload.token).then(response => response);

export const watchContainerId = function* containerValue() {
  yield takeLatest('CONTAINER_UPDATE_REQUEST', function* (action) {
    try {
      const data = yield call(containerId.bind(this, action.payload));
      yield put({ type: 'IS_LOADING', payload: true });
      yield put({ type: 'CONTAINER_UPDATE_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'CONTAINER_UPDATE_FAILED', payload: error });
    }
  });
};

