import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const userLogin = (payload,id) => ApiCaller('assignjob', 'post', id, payload).then(response => response);

export const watchAssignPost = function* watchAssignPost() {
  yield takeLatest('ASSIGN', function* (action) {
    try {
      const data = yield call(userLogin.bind(this, action.payload, action.id));
      yield put({ type: 'USER_LOGIN_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'USER_LOGIN_FAILED', payload: error });
    }
  });
};
