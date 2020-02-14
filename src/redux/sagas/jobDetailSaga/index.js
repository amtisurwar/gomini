import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const jobDetail = (payload, id) => ApiCaller('getjobdetailsbyid?jobid=' + payload, 'get', id).then(response => response);
 
export const watchJobDetail = function* watchJobDetail() {
  yield takeLatest('JOB_DETAIL', function* (action) {
    try {
      const data = yield call(jobDetail.bind(this, action.payload, action.id));
      yield put({ type: 'JOB_DETAIL_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'JOB_DETAIL_FAILED', payload: error });
    }
  });
};
