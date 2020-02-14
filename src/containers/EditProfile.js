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
import { Row, Col, lastNameast, CheckBox } from 'native-base';
import Background from '../component/background';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import navigate from '../component/navigate';
import InfoModal from '../component/info-modal';
import { connect } from 'react-redux';
import Common from '../common/common';
import background from '../component/background';
import Drawer from 'react-native-drawer';
import CompanyHeader from '../component/CompanyHeader';
import SideMenu from './SideMenu'
import Toast, { DURATION } from 'react-native-easy-toast'
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      password: '',
      loading: false,
      F_name: null,
      infoModalVisible: false,
      internetConnectivity: false,
      checked: false,
      address: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      addressShow: '',
      firstNameShow: '',
      lastNameShow: '',
      emailShow: '',
      phoneNoShow: '',
      messageDetail: []
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userCredential').then((valueData) => {
      //   alert(JSON.parse(valueData).address)
      this.setState({ email: JSON.parse(valueData).emailid })
      this.setState({ phoneNo: JSON.parse(valueData).phoneno })
      if (JSON.parse(valueData).username.indexOf(' ') >= 0) {
        var firstLastNameArray = JSON.parse(valueData).username.split(" ");
        this.setState({ firstName: firstLastNameArray[0] })
        this.setState({ lastName: firstLastNameArray[1] })
      }
      else {
        this.setState({ firstName: JSON.parse(valueData).username })
      }
      this.setState({ address: JSON.parse(valueData).address })
    });
    // alert(this.props.navigation.state.params.messageData.firstName)
  };
  componentWillUpdate() {
    console.log(this.props);
  }
  showToast(msg) {
    this.setState({ loading: false })
    Toast.show({
      text: msg,
      textStyle: styles.lastNameasterStyle
    })
  }
  editProfile = () => {
    if (this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.email.length === 0
      || this.state.address.length === 0 || this.state.phoneNo.length === 0) {
      if (this.state.firstName.length === 0) {
        this.setState({ firstNameShow: 0 })
      }
      if (this.state.lastName.length === 0) {
        this.setState({ lastNameShow: 0 })
      }
      if (this.state.email.length === 0) {
        this.setState({ emailShow: 0 })
      }
      if (this.state.address.length === 0) {
        this.setState({ addressShow: 0 })
      }
      if (this.state.phoneNo.length === 0) {
        this.setState({ phoneNoShow: 0 })
      }
    }
    else {
      { this.editProfileDataSave() }
    }
  }
  ValueChange = (value, type) => {
    if (type === "firstName") {
      this.setState({ firstName: value })
      this.setState({ firstNameShow: 1 })
    }
    if (type === "lastName") {
      this.setState({ lastName: value })
      this.setState({ lastNameShow: 1 })
    }
    if (type === "email") {
      this.setState({ email: value })
      this.setState({ emailShow: 1 })
    }
    if (type === "address") {
      this.setState({ address: value })
      this.setState({ addressShow: 1 })
    }
    if (type === "phoneNo") {
      this.setState({ phoneNo: value })
      this.setState({ phoneNoShow: 1 })
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
      this.showlastNameast('Enter valid email address.');
    }
  }
  editProfileDataSave() {
    this.setState({ loading: true })
    var requestData =
    {
      "id": 10501,
      "name": this.state.firstName + " " + this.state.lastName,
      "phonno": this.state.phoneNo,
      "email": this.state.email,
      "address": this.state.address,
      "country": "30 Aulike St, #201",
      "state": "HI",
      "city": "Kailua",
      "zipcode": "96734"
    }
    return fetch('http://gophorapi.demoappstore.com/api/change-profile', {
        method: 'POST',
        headers: {
          'authentication': '',
          'content-type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false })
        //
        if (responseJson.StatusCode === 200) {
          AsyncStorage.setItem('userCredential', JSON.stringify(responseJson.Data[0])).then(succes => {
          });
          this.refs.toast.show('Profile Updated Successfully !!!', 1000, () => {
            navigate.navigateTo(this.props.navigation, 'SurgeryCalendar')
          });
        }
        else if (responseJson.StatusCode === 403) {
          this.refs.toast.show('', DURATION.LENGTH_LONG);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  closeControlPanel = () => {
    showBackButton = true,
      this.setState({ drawerOpen: false })
  }
  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }
  render() {
    return (
      <ImageBackground
      source={require('../../assets/images/Log-In.png')}
      style={{ marginTop: '0%', width: '100%', height: '100%' }}>
        {!this.state.drawerOpen ?
          <CompanyHeader
            showFilterIcon
            headerText={"Edit Profile"}
            on_bell_icon_press={
              () => {
                navigate.navigateTo(this.props.navigation, 'Notification')
              }
            }
            onPress={() => {
              this.openControlPanel()
            }}
          />
          :
          <CompanyHeader
            showFilterIcon
            showBackButton={true}
            headerText={"Menu"}
            on_bell_icon_press={
              () => {
                navigate.navigateTo(this.props.navigation, 'Notification')
              }
            }
            onPress={() => {
              this.closeControlPanel()
            }}
          />}
        <Drawer
          open={this.state.drawerOpen}
          type="overlay"
          tapToClose={true}
          ref={(ref) => { this.drawer = ref }}
          content={<SideMenu {...this.props} forceRemount={() => { this.forceRemount() }} onDrawerItemClick={(val) => this.setState({ drawerOpen: val })} />}
          onClose={() => this.closeControlPanel()} >
          <KeyboardAvoidingView style={{ marginTop: '0%', width: '100%', height: '100%' }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <StatusBar hidden={true} />
              <TouchableOpacity
                style={{ alignItems: 'center', marginTop: '10%' }}>
                <Image source={require('../../assets/menu_logo.png')}
                  resizeMode='cover'
                  style={{ height: 100, width: 100, borderRadius: 50 }} />
              </TouchableOpacity>
              <View style={{ flex: 1, height: 300, width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '5%', justifyContent: "space-evenly" }} >
                <View style={{ flexDirection: 'row', height: 30, width: '100%', marginLeft: '0%', marginRight: '0%', marginTop: '5%' }}>
                  <TextInput
                    onChangeText={(firstName) => { this.ValueChange(firstName, "firstName") }}
                    style={styles.textInputStyleName}
                    placeholder="First Name"
                    placeholderTextColor="#177b84"
                  >{this.state.firstName}</TextInput>
                  <TextInput
                    onChangeText={(lastName) => { this.ValueChange(lastName, "lastName") }}
                    style={{
                      marginTop: '1%',
                      fontSize: 18,
                      width: '45%', color: '#177b84'
                      , borderBottomColor: '#177b84', // Add this lastName specify botlastNamem border color
                      borderBottomWidth: 2, marginLeft: '5%',
                      flex: 1
                    }}
                    placeholder="Last Name"
                    placeholderTextColor="#177b84"
                  >{this.state.lastName}</TextInput>
                  <Icon
                    style={{ position: 'absolute', marginLeft: 325 }}
                    name='account-minus'
                    color='#c6d4d8'
                    size={15}
                  />
                </View>
                {this.state.lastNameShow === 0 || this.state.firstNameShow === 0 ?
                  <View style={{ flexDirection: 'row', width: '100%', marginLeft: '0%', marginRight: '5%', marginTop: '0%' }}>
                    {this.state.firstNameShow === 0 ? <Text style={{
                      color: 'red',
                      fontSize: 12,
                      fontStyle: 'bold',
                      marginLeft: '2%',
                      marginTop: '0%'
                    }}>Please Enter First Name</Text> : null}
                    {this.state.lastNameShow === 0 ? <Text style={{
                      color: 'red',
                      fontSize: 12,
                      fontStyle: 'bold',
                      marginTop: '0%', marginLeft: this.state.firstNameShow === 1 ? "30%" : '10%'
                    }}>Please Enter Last Name</Text> : null}
                  </View>
                  : null}
                <TextInput
                  onChangeText={(email) => { this.ValueChange(email, "email") }}
                  style={styles.textInputStyle}
                  placeholder="Email"
                  placeholderTextColor="#177b84"
                >{this.state.email}</TextInput>
                <Icon
                  style={{ position: 'absolute', marginLeft: 325, marginTop: 90 }}
                  name='email'
                  color='#c6d4d8'
                  size={15}
                />
                {this.state.emailShow === 0 ? <Text style={styles.errorStyle}>Please Enter Email Id</Text> : null}
                <TextInput
                  onChangeText={(phoneNo) => { this.ValueChange(phoneNo, "phoneNo") }}
                  style={styles.textInputStyle}
                  placeholder="Phone No"
                  keyboardType='numeric'
                  placeholderTextColor="#177b84"
                >{this.state.phoneNo}</TextInput>
                <Icon
                  style={{ position: 'absolute', marginLeft: 325, marginTop: 155 }}
                  name='phone'
                  color='#c6d4d8'
                  size={15}
                />
                {this.state.phoneNoShow === 0 ? <Text style={styles.errorStyle}>Please Enter Phone No</Text> : null}
                <TextInput
                  onChangeText={(address) => { this.ValueChange(address, "address") }}
                  style={styles.textInputStyle}
                  placeholder="Address"
                  placeholderTextColor="#177b84"
                >{this.state.address}</TextInput>
                <Icon
                  style={{ position: 'absolute', marginLeft: 325, marginTop: 230 }}
                  name='map-marker'
                  color='#c6d4d8'
                  size={15}
                />
                {this.state.addressShow === 0 ? <Text style={styles.errorStyle}>Please Enter Address</Text> : null}
                <View style={styles.addToCarContainer}>
                  <TouchableOpacity style={styles.shareButton} onPress={() => { this.editProfile() }}>
                    <Text style={styles.shareButtonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Drawer>
        {this.state.loading ?
          <ActivityIndicator
            style={styles.activityStyle}
            size="large"
            color={'#283541'}
          /> : null}
        <Toast
          ref="toast"
          style={{ backgroundColor: '#177b84' }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'black' }}
        />
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  addToCarContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20
  },
  shareButton: {
    marginTop: 20,
    height: 47,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#9adde9",
  },
  textInputStyle: {
    marginTop: '5%',
    fontSize: 18,
    width: '100%', color: '#177b84',
    borderBottomColor: '#177b84',
    borderBottomWidth: 2,
  },
  textInputStyleName: {
    marginTop: '1%',
    fontSize: 18,
    width: '45%',
    color: '#177b84',
    borderBottomColor: '#177b84',
    borderBottomWidth: 2,
  },
  textStyle: {
    marginTop: '2%',
    fontSize: 18,
    width: '100%', color: '#177b84'
  },
  errorStyle: {
    color: 'red',
    fontSize: 12,
    marginLeft: '2%',
    marginTop: '6%'
  },
  lastNameasterStyle: {
    textAlign: 'center',
    fontSize: 22
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  }
});

const mapStatelastNameProps = state => ({
  loginData: state.loginData,
  registerUser: state.registerUser,
  forgotPassword: state.forgotPassword
});

export default connect(mapStatelastNameProps)(Login);