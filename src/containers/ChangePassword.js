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
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import { NavigationActions, StackActions } from 'react-navigation';

const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var mobile_no;
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
      Id: '',
      Token: '',
      NewPassword: '',
      ConfirmPassword: '',
      mobile_no: ''

    }
  }

  componentDidMount() {
    this.setState({ Id: this.props.navigation.state.params.Id })
    this.setState({ Token: this.props.navigation.state.params.Token })
    // AsyncStorage.getItem('mobile_no').then((valueData) => {
    //   this.setState({ mobile_no:JSON.parse(valueData)})
    // });
    // alert(this.props.navigation.state.params.Id)
    // alert(this.props.navigation.state.params.Token)
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


    if (nextProps.forgotPassword.forgotPassword.StatusCode === 200) {

      AsyncStorage.setItem('userCredential', JSON.stringify(nextProps.forgotPassword.forgotPassword.Data)).then(succes => {

        navigate.navigateTo(this.props.navigation, "SurgeryCalendar")

      });
    }
    else {
      this.showToast('Something Went Wrong.')
    }

  }

  componentWillUpdate() {

  }

  showToast(msg) {
    this.setState({ loading: false })
    Toast.show({
      text: msg,
      textStyle: styles.toasterStyle
    })
  }

  onButtonPress = () => {
    const { otp, ConfirmPassword, NewPassword } = this.state;


    const value = {
      "Id": this.state.Id,
      "OldPassword": "xxxxxx",
      "NewPassword": NewPassword,
      "ConfirmPassword": ConfirmPassword,
      "Token": this.state.Token
    }
    // alert(JSON.stringify(value))

    if (this.state.NewPassword.length >= 6 && this.state.ConfirmPassword.length >= 6) {
      if (this.state.NewPassword === this.state.ConfirmPassword) {
        if (this.state.internetConnectivity) {
          this.props.dispatch({
            type: 'CHANGE_PASSWORD',
            payload: value
          });

          this.setState({ loading: true })
        }
        else {
          this.showToast('No Internet Connection.');
        }

      }
      else {
        this.showToast('Passwords are not matching .');
      }
    }
    else {
      this.showToast('Enter Minimum 6 Character Password.');
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
        style={{ marginTop: '0%', width: '100%', height: '100%' }}>
        <KeyboardAvoidingView style={{ marginTop: '0%', width: '100%', height: '100%' }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}
          >
            <ImageBackground source={require('../../assets/login_header.png')}
              style={{ marginTop: '0%', width: '100%', height: 140 }}
            >
              <TouchableOpacity onPress={() => {
                navigate.navigateWithReset(this.props.navigation, "Otp", { key: '9185-128-27998' });
              }}>
                <Image
                  source={require('../../assets/left_arrow.png')}
                  style={{ width: 40, height: 30, marginTop: 20, marginLeft: 10 }} />
              </TouchableOpacity>
            </ImageBackground>
            <View style={{ marginTop: Platform.OS === "android" ? '20%' : 120 }}>
              <Text
                style={{ fontSize: 18, color: '#3FC1F3', marginLeft: '30%' }}
              >Change Password
             </Text>
              <Text
                style={{ fontSize: 12, color: 'white', marginLeft: '10%' }}
              >
              </Text>
            </View>
            <View style={{ height: 300, width: '90%', marginTop: '0%', justifyContent: "space-evenly" }} >
              <View style={{ flexDirection: 'column', height: '15%', width: '100%', marginHorizontal: '6%', marginTop: "0%" }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor='gray'
                    returnIdType='done'
                    secureTextEntry={true}
                    IdboardType='email-address'
                    placeholderTextColor={'white'}
                    placeholder="Enter New Password"
                    onChangeText={(NewPassword
                    ) => this.setState({ NewPassword })}
                    style={styles.textInputStyle}
                  />

                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor='gray'
                    returnIdType='done'
                    secureTextEntry={true}
                    IdboardType='email-address'
                    placeholderTextColor={'white'}
                    placeholder="Confirm Password"
                    onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                    style={styles.textInputStyle}
                  />
                  <Button
                    name={'Submit'}
                    buttonColor={'#3FC1F3'}
                    textColor={'#230000'}
                    height={30}
                    onPress={this.onButtonPress.bind(this)}
                  />
                </View>
              </View>
              <InfoModal
                onChangeText={(email) => this.setState({ email })}
                onChangePassword={this.onChangePassword.bind(this)}
                infoModalVisible={this.state.infoModalVisible}
                setInfoModalVisible={() => this.setState({ infoModalVisible: false, email: '' })}
                email={this.state.email}
              />

            </View>
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
    paddingLeft: '5%',
    marginTop: '10%',
    fontSize: Common.fontSizeLarge,
    width: '100%', color: 'white'
    , borderBottomColor: 'white', // Add this to specify bottom border color
    borderBottomWidth: 2
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