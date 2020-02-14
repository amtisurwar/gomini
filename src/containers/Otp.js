import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Text,
  Image,
  NetInfo,
  Platform,
  StyleSheet,
  AsyncStorage,
  TextInput,

  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { Row, Col, Toast, CheckBox } from 'native-base';
import Background from '../component/background';
import Button from '../component/button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import navigate from '../component/navigate';
import InfoModal from '../component/info-modal';
import { connect } from 'react-redux';
import Common from '../common/common';
import background from '../component/background';
import Modal, { ModalContent } from 'react-native-modals';

import { NavigationActions, StackActions } from 'react-navigation';

const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      otp: '',
      password: '',
      loading: false,
      F_name: null,
      infoModalVisible: false,
      internetConnectivity: false,
      checked: false,
      key: '',
      status: '0',
      visible: true

    }
  }

  componentDidMount() {
    this.setState({ key: this.props.navigation.state.params.key })
    //alert(this.props.navigation.state.params.key)
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo) {
        this.setState({ internetConnectivity: true })
      }
    });
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }
  changeStatus(data) {
    this.setState({ status: data })
  }
  _handleConnectionChange = (isConnected) => {
    if (isConnected) {
      //this.showToast('Internet Connected Successfully.');
      this.setState({ internetConnectivity: true })
    } else {
      this.showToast('No Internet Connection.');
      this.setState({ internetConnectivity: false })
    }
  };


  backClick() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ForgotPassword', params: { Id: '', Token: '' } })],
    });

    this.props.navigation.dispatch(resetAction);

  }
  resendOtp() {
    this.setState({ loading: true })
    const value = {
      "key": this.state.key,
    }

    return fetch('http://gophorapi.demoappstore.com/api/forgot-password', {
      method: 'post',

      headers: { 'content-type': 'application/json', 'authentication': '' },

      body: JSON.stringify(value),
    })

      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false })
        this.showToast('OTP has been sent to your mobile number');
        //  alert(JSON.stringify(responseJson.Data.joblist))

      })

      .catch((error) => {
        console.error(error);

      })

  }
  componentWillReceiveProps(nextProps) {


    // alert(JSON.stringify(nextProps.loginData))


    this.setState({ loading: false })
    // alert(JSON.stringify(nextProps))


    if (nextProps.forgotPassword.forgotPassword.StatusCode === 200) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'ChangePassword', params: { Id: nextProps.forgotPassword.forgotPassword.Data.userid, Token: nextProps.forgotPassword.forgotPassword.Data.validatetoken } })],
      });

      this.props.navigation.dispatch(resetAction);
      // navigate.navigateTo(this.props.navigation, "ChangePassword", { Id: nextProps.forgotPassword.forgotPassword.Data.userid,Token: nextProps.forgotPassword.forgotPassword.Data.validatetoken });

      this.showToast('Success');
    }
    else {
      this.showToast('Enter Valid OTP.')
    }

  }
  onResendButtonPress = () => {
    const { usernameOrmobile, password, countryCode } = this.state;
    var mobile_no;
    // AsyncStorage.getItem('mobile_no').then((valueData) => {
    //   mobile_no=valueData
    // });

    //  txt2 = usernameOrmobile.slice(0, 0) + "91" + usernameOrmobile.slice(0);
    this.setState({ status: '2' })
    const value = {
      "key": this.state.key,
    }
    console.log(value)
    if (this.state.key !== '') {

      if (this.state.internetConnectivity) {
        this.props.dispatch({
          type: 'FORGOT_PASSWORD',
          payload: value
        });

        this.setState({ loading: true })
      }
      else {
        this.showToast('No Internet Connection.');
      }

    }
    else {
      //   this.showToast('Enter Email id or Mobile No.');
    }


  }
  componentWillUpdate() {
    console.log(this.props);
  }

  showToast(msg) {
    this.setState({ loading: false })
    Toast.show({
      text: msg,
      textStyle: styles.toasterStyle
    })
  }

  onButtonPress = () => {
    const { otp, password } = this.state;

    this.setState({ status: '1' })
    const value = {
      "key": this.state.key,
      "otp": otp
    }
    console.log(value)
    if (otp !== '') {

      if (this.state.internetConnectivity) {
        this.props.dispatch({
          type: 'OTP',
          payload: value
        });

        this.setState({ loading: true })
      }
      else {
        this.showToast('No Internet Connection.');
      }

    }
    else {
      this.showToast('Enter OTP.');
    }


  }

  onChangePassword() {
    if (emailRegex.test(this.state.email)) {
      this.setState({
        infoModalVisible: false,
        loading: true
      })
      console.log(this.state.email)
      const params = '?EmailId=' + this.state.email
      console.log(params)
      this.props.dispatch({
        type: 'FORGOT_PASSWORD',
        payload: params
      })
    }
    else {
      this.showToast('Enter valid email address.');
    }
  }

  render() {
    return (



      <ImageBackground
        source={require('../../assets/images/Log-In.png')}
        style={{ marginTop: '0%', width: '100%', height: '100%'}}>
        <KeyboardAvoidingView style={{ marginTop: '0%', width: '100%', height: '100%'}}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <ImageBackground 
            //source={require('../../assets/login_header.png')}
              style={{ marginTop: '0%', width: '100%', height: 140 }}
            >

              <TouchableOpacity onPress={() => {
                this.backClick()

              }}>
                <Image
                  //source={require('../../assets/left_arrow.png')}
                  style={{ width: 40, height: 30, marginTop: 20, marginLeft: 10 }} />

              </TouchableOpacity>
            </ImageBackground>
            {/* <Image
          style={{ marginTop: '0%',width:'100%',height:'21%' }}
            source={require('../../assets/login_header.png')}
        /> */}

        <Modal
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
                navigate.navigateTo(this.props.navigation, "Login");
              }}
            >
              <ModalContent>
              <View style={{ marginTop: Platform.OS === "android" ? '5%' : 50 }}>
                <Text style={{ fontSize: 18, color: '#6f7581', marginTop:20, alignContent:'center', alignSelf:'center', alignItems:'center', justifyContent:'center', alignContent:'center'}}>A one time password will be sent to the phone number register with out mobile</Text>
                <Text style={{ fontSize: 18, color: '#6f7581',alignContent:'center', alignSelf:'center', alignItems:'center', justifyContent:'center', alignContent:'center'}}>app</Text>
                <Text style={{ fontSize: 18, color: '#6f7581', marginTop:10, alignContent:'center', alignSelf:'center', alignItems:'center'}}>one time password?</Text>
                <TouchableOpacity onPress={this.resendOtp.bind(this)}>
                  <Text style={{color: '#107780', borderBottomColor:'#107780', borderBottomWidth:2,alignContent:'center', alignSelf:'center', alignItems:'center'}}>Click Here</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 300, width: '90%', marginTop: '0%', justifyContent: "space-evenly" }} >
                <View style={{ flexDirection: 'column', height: '15%', width: '100%', marginHorizontal: '6%', marginTop: "0%" }}>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholderTextColor='#107780'
                      returnKeyType='done'
                      maxLength={6}
                      keyboardType='numeric'
                      placeholderTextColor={'black'}
                      placeholder="Enter OTP"
                      onChangeText={(otp) => this.setState({ otp })}
                      style={styles.textInputStyle}
                    />
                    {/* <Button
                      style={{borderRadius:30}}
                      name={'Submit'}
                      buttonColor={'#3FC1F3'}
                      textColor={'#230000'}
                      height={27}
                      onPress={this.onButtonPress.bind(this)}
                    /> */}
                     <View style={styles.addToCarContainer}>
                      <TouchableOpacity onPress={this.onButtonPress.bind(this)}style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Submit</Text>  
                      </TouchableOpacity>
                    </View>
                  </View>

              </View>
              {/* <View style={{ height: 2, width: '90%', marginTop: '-5%',backgroundColor:'#3FC1F3',marginHorizontal: '7%' }} /> */}

              {/* <View style={{ height: 2, width: '90%', marginTop: '-15%',backgroundColor:'#3FC1F3',marginHorizontal: '7%' }} /> */}

              

              <InfoModal
                onChangeText={(email) => this.setState({ email })}
                onChangePassword={this.onChangePassword.bind(this)}
                infoModalVisible={this.state.infoModalVisible}
                setInfoModalVisible={() => this.setState({ infoModalVisible: false, email: '' })}
                email={this.state.email}
              />

            </View>
            </ModalContent>
            </Modal>
            {this.state.loading && <ActivityIndicator
              style={styles.activityStyle}
              size="large"
              color={'#283541'}
            />}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  textInputStyle: {
    marginLeft: '0%',
    fontSize: Common.fontSizeLarge,
    width: '100%', color: '#107780'
    , borderBottomColor: '#107780', // Add this to specify bottom border color
    borderBottomWidth: 2
  },
  addToCarContainer:{
    marginHorizontal:0,
    marginTop:15,
    width:200
  },
  shareButton: {
    marginTop:20,
    height:47,
    marginLeft:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#92dae8",
  },
  shareButtonText:{
    color: "black",
    fontSize:20,
  },
  toasterStyle: {
    textAlign: 'center',
    fontSize: 18, 
    color:'white'
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  }
});

const mapStateToProps = state => ({
  loginData: state.loginData,
  registerUser: state.registerUser,
  forgotPassword: state.forgotPassword
});

export default connect(mapStateToProps)(Login);


// target 'Gophor-tvOS' do
//   # Comment the next line if you don't want to use dynamic frameworks
//   use_frameworks!

//   # Pods for Gophor-tvOS

//   target 'Gophor-tvOSTests' do
//     inherit! :search_paths
//     # Pods for testing
//   end

// end