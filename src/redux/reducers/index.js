import { combineReducers } from 'redux';
import loginData from './loginReducer/';
import userCredential from './userCredentialReducer/';
import forgotPassword from './forgotPassword/';
import Otp from './Otp/';
import createJob from './createJobReducer/';
import jobList from './jobListReducer/';
import driverJobList from './driverListReducer/';
import changePassword from './changePasswordReducer';
import groupAssignJobList from './groupListReducer/';
import managerjobList from './managerJobListReducer/';
import managerDriverjobList from './managerDriverJobListReducer/';
import jobDetail from './jobDetailReducer/';
import assignPost from './assignPostReducer/';
import jobStatus from './jobStatusReducer/';
import loadingReducer from './loadingReducer';
import groupJobList from './groupJobListReducer';
import updateContainerId from './updateContainerReducer';
import { reducer as formReducer } from 'redux-form';
import notificatons from './notificationListReducer';





export default combineReducers({
  loginData,
  userCredential,
  forgotPassword,
  Otp,
  changePassword,
  jobList,
  driverJobList,
  groupAssignJobList,
  managerjobList,
  managerDriverjobList,
  jobDetail,
  jobStatus,
  assignPost,
  createJob,
  loadingReducer,
  groupJobList,
  updateContainerId,
  form: formReducer,
  notificatons
});
