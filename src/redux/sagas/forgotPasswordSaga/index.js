import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const forgotPassword = (payload) => ApiCaller('forgot-password', 'post', null, payload).then(response => response);

export const watchforgotPassword = function* watchforgotPassword() {
  yield takeLatest('FORGOT_PASSWORD', function* (action) {
    try {
      const data = yield call(forgotPassword.bind(this, action.payload));
      yield put({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FORGOT_PASSWORD_FAILED', payload: error });
    }
  });
};