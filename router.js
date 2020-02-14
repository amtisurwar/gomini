import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, Button, Image, ImageBackground, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { Icon } from 'native-base';
import Login from './src/containers/Login';
import Splash from './src/containers/Splash';

import Notification from './src/containers/Notification';
import SurgeryDetail from './src/containers/SurgeryDetail';

import SurgeryCalendar from './src/containers/SurgeryCalendar';
import SurgeryCalendarDetail from './src/containers/SurgeryCalendarDetail';
import NewProductRequest from './src/containers/NewProductRequest';
import ForgotPassword from './src/containers/ForgotPassword';
import Otp from './src/containers/Otp';
import Messages from './src/containers/Messages';
import CompanyList from './src/containers/CompanyList';
import MessageDetail from './src/containers/MessageDetail';
import ChangePassword from './src/containers/ChangePassword';
import InboxAndSentMessageDetail from './src/containers/InboxAndSentMessageDetail';
import EditProfile from './src/containers/EditProfile';
import SendMessage from './src/containers/SendMessage';
import CompanySendMessage from './src/containers/CompanySendMessage';
import { createAppContainer, createStackNavigator } from 'react-navigation';


export const RootNavigator = () => {
  return createStackNavigator(
    {
      Splash: { screen: Splash },
      Login: { screen: Login },
      ForgotPassword: { screen: ForgotPassword },
    
     
     
      Otp: { screen: Otp ,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      ChangePassword: { screen: ChangePassword ,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
     
     
      Messages: { screen:Messages,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
     CompanyList: { screen:CompanyList,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      MessageDetail: { screen:MessageDetail,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      SendMessage: { screen : SendMessage,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      CompanySendMessage: { screen : CompanySendMessage,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      InboxAndSentMessageDetail: { screen : InboxAndSentMessageDetail,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      EditProfile: { screen:EditProfile,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      SurgeryCalendar: { screen:SurgeryCalendar,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      SurgeryCalendarDetail: { screen:SurgeryCalendarDetail,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
    
     
      Notification: { screen: Notification,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
     
      SurgeryDetail: { screen: SurgeryDetail,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      NewProductRequest: { screen:NewProductRequest,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
     
     
     
    },
    {
      initialRouteName: 'Splash',
      headerMode: 'none',
    },
  );
};
