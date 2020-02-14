import { Dimensions } from 'react-native';
// declare height width
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = {
  deviceHeight,
  deviceWidth,

  // size
  backButtonIconSize: 25,
  mainTextFontSize: 17,
  TitleText: 23,

  inverseTextColor: '#ee2424',
  footerItemInactive: '#fff',
  loginButtonColor: '#ee2424',
  loginSignUpBg: '#151515',
  lightGreen: '#DD0212',
  loginButton: '#c82333',
  statusBarColor: '#A8BF16',
  darkColor: '#4A4A4A',
  darkBlack: '#555555',
  lightDarkColor: 'gray',
  redDotColor: '#DC143C',
  whiteColor: '#ffffff',
  lightGray: '#F5F5F5',
  splashBackground: '#f3f3f2',
  subTitleText: '#626262',
  drawerText: '#1B1B1C',
  blackColor: '#000',
  termTextColor: '#B1B1B1',
  buttonTextColor: '#C0C0C0',
  jobListBorder:"#A2A2A2",

  // Font
  fontSizeGiant: deviceWidth / 10,
  fontSizeLargest: deviceWidth / 16,
  fontSizeLarge: deviceWidth / 19,
  fontSizeMedium: deviceWidth / 25,
  fontSizeSmall: deviceWidth / 30,
  fontSizeSmallest: deviceWidth / 35,
  fontSizeTiny: deviceWidth / 45,
  fontSizeBase: 15,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  //fontFamily


};
