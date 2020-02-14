import { all } from 'redux-saga/effects';
import { watchUserLogin } from './loginSaga/';
import { watchAssignPost } from './assignPostSaga/';
import { watchUserCredential } from './saveCredentialSaga/';
import { watchMyJobList } from './myJobSaga/';
import { watchJobList } from './jobListSaga/';
import { watchDriverList } from './driverListSaga/';
import { watchGroupList } from './groupListSaga/';
import { watchmanagerDriverJobList } from './managerDriverJobListSaga/';
import { watchmanagerJobList } from './managerJobListSaga/';
import { watchforgotPassword } from './forgotPasswordSaga/';
import { watchOtp} from './OtpSaga/';
import { watchChangePassword} from './ChangePasswordSaga/';
import { watchCreateJob } from './createJobSaga/';
import { watchJobDetail } from './jobDetailSaga/';
import { watchJobStatus } from './jobStatus/';
import { watchGroupJobList } from './groupJobListSaga';
import {watchContainerId} from './updateContainerSaga';
import {watchNotificationList}from './notificationList';





const rootSaga = function* rootSaga() {
  yield all([
    watchUserLogin(),
    watchJobStatus(),
    watchAssignPost(),
    watchUserCredential(),
    watchJobList(),
    watchDriverList(),
    watchmanagerJobList(),
    watchmanagerDriverJobList(),
    watchGroupJobList(),
    watchGroupList(),
    watchforgotPassword(),
    watchChangePassword(),
    watchOtp(),
    watchCreateJob(),
    watchJobDetail(),
    watchContainerId(),
    watchNotificationList()
  ]);
};

export default rootSaga;
