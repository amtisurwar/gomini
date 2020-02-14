import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const jobStatus = (payload, id,jobStatus) => ApiCaller('acceptrejectjob?Job_ID='+payload+'&'+'acceptstatus='+jobStatus,'get',id).then(response => response);

export const watchJobStatus = function* watchJobList() {
  yield takeLatest('JOB_STATUS', function* (action) {
    try {
      const data = yield call(jobStatus.bind(this, action.payload, action.id, action.jobStatus));
      yield put({ type: 'JOB_STATUS_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'JOB_STATUS_FAILED', payload: error });
    }
  });
};