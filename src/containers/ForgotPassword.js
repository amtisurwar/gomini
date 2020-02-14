import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Text,
  Image,
  NetInfo,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  TextInput,
  Platform,
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
import Modal, { ModalContent } from 'react-native-modals';
var txt2;
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var platform;
class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      usernameOrmobile: '',
      password: '',
      loading: false,
      F_name: null,
      infoModalVisible: false,
      internetConnectivity: false,
      checked: false,
      countryCode: '',
      visible: true

    }
  }

  componentDidMount() {
    platform = Platform.OS
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

    debugger;
    // alert(JSON.stringify(nextProps.loginData))


    this.setState({ loading: false })
    if (nextProps.forgotPassword.forgotPassword.StatusCode === 200) {
      AsyncStorage.setItem('mobile_no', JSON.stringify(txt2)).then(succes => { });
      navigate.navigateTo(this.props.navigation, "Otp", { key: txt2 });
      this.showToast('OTP has been sent to your mobile number');
    }
    else {
      this.showToast('Enter Correct Mobile No./ Email id')
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

  // onButton= () => {
  //   navigate.navigateTo(this.props.navigation, "Otp");
  //   this.setState({
  //     infoModalVisible: false
  //   })
  // }

  onButtonPress = () => {
    // navigate.navigateTo(this.props.navigation, "Otp");
    // this.setState({
    //   infoModalVisible: false
    // })
    const { usernameOrmobile, password, countryCode } = this.state;
    var mobile = this.state.countryCode + this.state.usernameOrmobile
    //  txt2 = usernameOrmobile.slice(0, 0) + "91" + usernameOrmobile.slice(0);
    txt2 = mobile.slice(0, 4) + "-" + mobile.slice(4);
    txt2 = txt2.slice(0, 8) + "-" + txt2.slice(8);

    const value = {
      "key": txt2,
    }
    console.log(value)
    if (mobile !== '') {

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
      this.showToast('Enter Email id or Mobile No.');
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
          <ScrollView contentContainerStyle={{ flex: 1 }}

          >
            <ImageBackground 
              //source={require('../../assets/login_header.png')}
              style={{ marginTop: '0%', width: '100%', height: 140 }}
            >

              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Login")
              }}>
                <Image
                  //source={require('../../assets/images/grp.png')}
                  style={{ width: 40, height: 30, marginTop: 20, marginLeft: 10 }} />

              </TouchableOpacity>
            </ImageBackground>

            <Modal
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
                navigate.navigateTo(this.props.navigation, "Login");
              }}
            >
              <ModalContent>

                {/* <Image
          style={{ marginTop: '0%',width:'100%',height:'21%' }}
            source={require('../../assets/login_header.png')}
        />
        <Image
          style={{ marginTop: '0%',width:'10%',height:'5%',position:'absolute',left:10,top:10 }}
            source={require('../../assets/left_arrow..png')}
        /> */}
                <View style={{ marginTop: platform === "android" ? '5%' : 50 }}>
                  <Text style={{ fontSize: 20, color: '#6f7581', alignContent:'center', alignSelf:'center', alignItems:'center'  }}>No worries, it happens!</Text>
                  <Text style={{ fontSize: 14, color: '#6f7581', marginTop:20, alignContent:'center', alignSelf:'center', alignItems:'center'}}>Enter your email/mobile no in</Text>
                  <Text style={{ fontSize: 12, color: '#6f7581', marginTop:10, alignContent:'center', alignSelf:'center', alignItems:'center'}}>order to receive OTP on your registered mobile number.</Text>
                  <Text style={{ fontSize: 12, color: '#6f7581', marginTop:10, alignContent:'center', alignSelf:'center', alignItems:'center'}}>mobile number.</Text>
                </View>
                <View style={{ height: 300, width: '90%', marginTop: '0%', justifyContent: "space-evenly" }} >
                  <View style={{ flexDirection: 'column', height: '15%', width: '100%', marginHorizontal: '3%', marginTop: "0%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                      <TextInput
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholderTextColor='gray'
                        returnKeyType='done'
                        placeholderTextColor={'black'}
                        placeholder="Your Email"
                        onChangeText={(usernameOrmobile) => this.setState({ usernameOrmobile })}
                        style={styles.textInputStyle}
                      />
                    </View>
                    <View style={styles.addToCarContainer}>
                      <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Submit</Text>  
                      </TouchableOpacity>
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
    width: '90%', color: '#6f7581'
    , borderBottomColor: '#6f7581', // Add this to specify bottom border color
    borderBottomWidth: 1,
    paddingLeft: 0
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
  textInputStyle1: {
    marginLeft: '0%',
    paddingLeft: '5%',
    fontSize: Common.fontSizeLarge,
    width: '20%', color: 'black'
    , borderBottomColor: 'black', // Add this to specify bottom border color
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