import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const forgotPassword = (payload) => ApiCaller('change-password', 'post', null, payload).then(response => response);

export const watchChangePassword = function* watchChangePassword() {
  yield takeLatest('CHANGE_PASSWORD', function* (action) {
    try {
      const data = yield call(forgotPassword.bind(this, action.payload));
      yield put({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FORGOT_PASSWORD_FAILED', payload: error });
    }
  });
};