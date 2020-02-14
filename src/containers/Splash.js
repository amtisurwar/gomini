import React, { Component } from 'react';
import { View, Animated, AsyncStorage, ImageBackground,NetInfo,ToastAndroid,Image } from 'react-native';
import navigate from '../component/navigate';
import { connect } from 'react-redux';
import Common from '../common/common';

class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageAnimX: new Animated.Value(30),
      imageAnimY: new Animated.Value(20),
      imageTruckAnimX: new Animated.Value(-100),
    }
  }
navigationSplash(){
  navigate.navigateWithReset(_this.props.navigation, 'Dashboard')
  
}
NoInternet(){
 // ToastAndroid.show('No internet Connection ,Please Connect to internet !!.', ToastAndroid.SHORT)
}
  componentDidMount() {
    // NetInfo.isConnected.fetch().then(isConnected => {
    //   if(isConnected ){
    

    var _this = this;
    // setTimeout(function () {
      
    //   navigate.navigateWithReset(_this.props.navigation, 'Login')
    // }, 2000);
    AsyncStorage.getItem('userCredential').then((valueData) => {
      
      
      if (valueData !== null && valueData !== undefined) {
          setTimeout(function () {
          navigate.navigateWithReset(_this.props.navigation, 'SurgeryCalendar')
        }, 2000);
       
      }
      else {
        setTimeout(function () {
        navigate.navigateWithReset(_this.props.navigation, 'Login')
      }, 2000);
     
    }
          
      // }
      // else {
      //   setTimeout(function () {
      //     navigate.navigateWithReset(_this.props.navigation, 'Login')
      //   }, 5000);
      // }
    })
    Animated.timing(
      this.state.imageAnimX,
      {
        toValue: Common.deviceWidth / 1.7,
        duration: 5000,
      }
    ).start();
    Animated.timing(
      this.state.imageAnimY,
      {
        toValue: Common.deviceWidth / 2.6,
        duration: 5000,
      }
    ).start();
    Animated.timing(
      this.state.imageTruckAnimX,
      {
        toValue: Common.deviceWidth /2,
        duration: 5000,
      }
    ).start();
      // }
      // else{
      //   {this.NoInternet()}
      // }
    // });
  }

  render() {
    return (
        <ImageBackground source={require('../../assets/images/Splash-Screen.png')} style={{ flex: 1 }}>
        </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  userCredential: state.userCredential,
});

export default connect(mapStateToProps)(Splash);