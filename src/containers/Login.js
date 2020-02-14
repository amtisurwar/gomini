import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Text,
  Image,
  NetInfo,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ImageBackground,
  TouchableOpacity,

  ScrollView,
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

const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      F_name: null,
      infoModalVisible: false,
      internetConnectivity: false,
      checked: false

    }
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo) {
        this.setState({ internetConnectivity: true })
      }
    });
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    AsyncStorage.getItem('rememberMe').then((valueData) => {
      this.setState({ checked: JSON.parse(valueData) });
      if (JSON.parse(valueData) === true) {
        AsyncStorage.getItem('localUsername').then((valueData) => {
          this.setState({ email: JSON.parse(valueData) });
          //  alert(JSON.parse(valueData))
        });
        AsyncStorage.getItem('localPassword').then((valueData) => {
          this.setState({ password: JSON.parse(valueData) });
        });
      }

    });



  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
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



  componentWillReceiveProps(nextProps) {

    debugger;
    // alert(JSON.stringify(nextProps.loginData))
    console.log(`recieving props ${nextProps}`);

    if (nextProps.loginData.login.StatusCode === 200) {
      this.props.dispatch({
        type: 'SET_USER_CREDENTIAL',
        payload: nextProps.loginData.login.Data
      });
      AsyncStorage.setItem('userCredential', JSON.stringify(nextProps.loginData.login.Data[0])).then(succes => {
        this.showToast('You are login successfully.');
        navigate.navigateWithReset(this.props.navigation, 'SurgeryCalendar')

      });



    }
    else {
      this.showToast('Invalid Username or Password');
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
    const { email, password } = this.state;
    const value = {
      "UserName": email,
      "Password": password,
      "Deviceid": "dsjkdsdsdsdsdbns",
      "RegId": "djsdbshgsdgvhsadvsaghddshvsdgsfdgsavdsagdsadhfsag",
      "RememberMe": "false"
    }
    console.log(value)
    if (email !== '' && password !== '') {

      if (this.state.internetConnectivity) {
        this.props.dispatch({
          type: 'USER_LOGIN',
          payload: value
        });

        this.setState({ loading: true })
      }
      else {
        this.showToast('No Internet Connection.');
      }

    }
    else {
      this.showToast('Enter Email id and Password.');
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
  rememberMe = (rememberMe) => {
    //alert(rememberMe)
    this.setState({ checked: rememberMe })
    AsyncStorage.setItem('rememberMe', JSON.stringify(rememberMe)).then(succes => {

    });
    AsyncStorage.setItem('localUsername', JSON.stringify(this.state.email)).then(succes => {
    });
    AsyncStorage.setItem('localPassword', JSON.stringify(this.state.password)).then(succes => {
    });
  }
  render() {
    return (

      <ImageBackground style={{ marginTop: '0%', width: '100%', height: '100%' }}
      source={require('../../assets/images/Log-In.png')}>
        <KeyboardAvoidingView style={{ marginTop: '0%', width: '100%', height: '100%',}}>
          <ScrollView contentContainerStyle={{ flex: 1 }}
          >
            <View style={{ flex: 1, height: 300, width: '95%', marginTop: '0%', justifyContent: "center" }} >
            <View style={{alignSelf:'center', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
            <Image
             style={{width: 150, height: 90}}
             source={require('../../assets/images/logo.png')}
            />
            </View>
              <View style={{ flexDirection: 'row', height: '12%', width: '90%', marginHorizontal: '7%', marginTop: "5%" }}>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor='gray'
                    returnKeyType='done'
                    placeholder = 'Your Email'
                    keyboardType='email-address'
                    placeholderTextColor={'#3FC1F3'}
                    onChangeText={(email) => this.setState({ email })}
                    style={styles.textInputStyle}
                  >{this.state.email}</TextInput>
                  {/* <View style={{flexDirection:'row', position:'absolute', marginTop:15}}>
                  <Text style={{ fontSize: 16, color:'gray' }}>Your </Text>
                  <Text style={{ fontSize: 16, color:'#107780' }}>Email </Text>
                  </View> */}
                </View>

              </View>
              {/* <View style={{ height: 2, width: '90%', marginTop: '-5%',backgroundColor:'#3FC1F3',marginHorizontal: '7%' }} /> */}
              <View style={{ flexDirection: 'row', height: '12%', width: '90%', marginHorizontal: '7%', marginTop:'8%' }}>

                <View style={{ flexDirection: 'row' }}>

                  <TextInput
                    autoCorrect={false}
                    placeholderTextColor='#3FC1F3'
                    returnKeyType='done'
                    autoCapitalize="none"
                    placeholder = 'Your Password'
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholderTextColor={'#3FC1F3'}
                    onChangeText={(password) => this.setState({ password })}
                    style={styles.textInputStyle}
                  >{this.state.password}</TextInput>
                  {/* <View style={{flexDirection:'row', position:'absolute', marginTop:15}}>
                  <Text style={{ fontSize: 16, color:'gray' }}>Your </Text>
                  <Text style={{ fontSize: 16, color:'#107780' }}>Password </Text>
                  </View> */}
                </View>
              </View>
              {/* <View style={{ height: 2, width: '90%', marginTop: '-15%',backgroundColor:'#3FC1F3',marginHorizontal: '7%' }} /> */}
              <View style={{ flexDirection: 'row', marginRight: '5%', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end', marginTop:15 }}>
                
                <Text style={{ marginTop: '0%', height: '100%', width: '32%', alignItems: 'center', marginLeft: '0%', color: '#073a6e', fontSize: 16 }}>Remember Me </Text>
                <CheckBox
                  checked={this.state.checked}
                  containerStyle={{ size: 6}}
                  onPress={() => this.rememberMe(!this.state.checked)}
                ></CheckBox>
                {/* <TouchableOpacity
          onPress={() => {
            navigate.navigateWithReset(this.props.navigation, 'ForgotPassword')
          }}
          style={{ marginTop: '0%', height: '100%', width: '80%', alignItems: 'center',marginLeft:'0%' }}>
          <Text style={{ color: '#0093D0', fontSize: 16 }}>Forgot Password ?</Text>
        </TouchableOpacity> */}
              </View>
              {/* <View style={{ flexDirection: 'row', borderRadius:50, height: '12%', width: '100%', marginHorizontal: '2%', marginTop:'8%' }}>
                <Button
                  name={'Log In'}
                  buttonColor={'#3FC1F3'}
                  textColor={'#230000'}
                  marginTop={'0%'}
                  style={{ borderRadius:30  }}

                  onPress={this.onButtonPress.bind(this)}
                />
              </View> */}
              <View style={styles.addToCarContainer}>
                <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Log In</Text>  
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigateWithReset(this.props.navigation, 'ForgotPassword')
                }}
                style={{ marginTop: '5%', paddingLeft:'5%', height: '10%', width: '90%', alignItems: 'center',alignSelf:'center', alignContent:'center' }}>
                <Text style={{ color: '#073a6e', fontSize: 16 }}>Recovery Password</Text>
              </TouchableOpacity>
            </View>

            <InfoModal
              onChangeText={(email) => this.setState({ email })}
              onChangePassword={this.onChangePassword.bind(this)}
              infoModalVisible={this.state.infoModalVisible}
              setInfoModalVisible={() => this.setState({ infoModalVisible: false, email: '' })}
              email={this.state.email}
            />
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
    paddingLeft: '0%',
    fontSize: Common.fontSizeLarge,
    width: '100%', color: '#3FC1F3'
    , borderBottomColor: '#3FC1F3', // Add this to specify bottom border color
    borderBottomWidth: 2,
    padding: 5
  },
  toasterStyle: {
    textAlign: 'center',
    fontSize: 18, 
    color:'white'
  },
  addToCarContainer:{
    marginHorizontal:10, marginTop:15
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