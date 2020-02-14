import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const createJob = (payload, id) => ApiCaller('postjob', 'post', id, payload).then(response => response);

export const watchCreateJob = function* watchCreateJob() {
  yield takeLatest('CREATE_JOB', function* (action) {
    try {
      const data = yield call(createJob.bind(this, action.payload, action.id));
      yield put({ type: 'CREATE_JOB_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'CREATE_JOB_FAILED', payload: error });
    }
  });
};
