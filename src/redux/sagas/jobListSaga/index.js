import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const jobList = (payload, id) => ApiCaller('getassignjobList', 'get', id, payload).then(response => response);

export const watchJobList = function* watchJobList() {
  yield takeLatest('JOB_LIST_REQUEST', function* (action) {
    try {
      const data = yield call(jobList.bind(this, action.payload, action.id));
      yield put({ type: 'JOB_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'JOB_LIST_FAILED', payload: error });
    }
  });
};