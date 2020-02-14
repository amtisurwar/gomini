import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const otp = (payload) => ApiCaller('validate-otp', 'post', null, payload).then(response => response);

export const watchOtp = function* watchOtp() {
  yield takeLatest('OTP', function* (action) {
    try {
      const data = yield call(otp.bind(this, action.payload));
      yield put({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FORGOT_PASSWORD_FAILED', payload: error });
    }
  });
};