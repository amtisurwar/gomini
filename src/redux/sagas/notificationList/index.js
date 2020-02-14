import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getNotificationList = payload => ApiCaller('getdrivernotification', 'get', payload).then(response => response);

export const watchNotificationList = function* watchNotificationList() {
  yield takeLatest('NOTIFICATION_LIST', function* (action) {
    try {
      const data = yield call(getNotificationList.bind(this, action.id));
      yield put({ type: 'NOTIFICATION_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'NOTIFICATION_LIST_FAILED', payload: error });
    }
  });
};
