import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  Image, AsyncStorage, ImageBackground, TouchableOpacity
} from 'react-native';
import navigate from '../component/navigate';
import Button from '../component/button';
import MessageHeader from '../component/MessageHeader';
import SideMenu from './SideMenu'
import Drawer from 'react-native-drawer';
import Common from '../common/common';
import apiCaller from '../common/apiCaller';
import MultiSelect from 'react-native-multiple-select';
import { showToast } from '../common/globalFunction';
import { FloatingAction } from "react-native-floating-action";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Item, Input, Icon } from 'native-base';
class Impulse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupJobScreen: true,
      password: '',
      loading: false,
      drawerOpen: false,
      selectedValue: undefined,
      user_id: '',
      selectedItems: [],
      showInbox: 1,
      showSent: 0,
      messageResponse: [],
      inboxDataList: [],
      sentDataList: [],
      inboxDataFilterList: [],
      sentDataFilterList: [],
      isDateTimePickerVisible: false

    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userCredential').then((valueData) => {
      this.setState({ user_id: JSON.parse(valueData).userid });
      { this.inboxAndSentData() }
    });

  }
  inboxAndSentData() {
    this.setState({ loading: true })

    var requestData =
    {
      "vendorid": this.state.user_id,

    }
    return fetch('http://gophorapi.demoappstore.com/api/vendor-inbox', {
      method: 'POST',
      headers: {
        'authentication': '',
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

      .then((response) => response.json())
      .then((responseJson) => {
        //  alert(JSON.stringify(responseJson.Data.sent))
        this.setState({ loading: false })
        this.setState({ messageResponse: responseJson.Data });
        this.setState({ inboxDataList: responseJson.Data.receive });
        this.setState({ sentDataList: responseJson.Data.sent });
        this.setState({ inboxDataFilterList: responseJson.Data.receive });
        this.setState({ sentDataFilterList: responseJson.Data.sent });
        this.setState({loading: false})
        console.log('sentDataList', this.state.sentDataList)
      })

      .catch((error) => {

        console.error(error);
      });

  }
  filterInboxAndSent = () => {
    this.setState({ isDateTimePickerVisible: true });
  }
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    var a = new Date(date);

    this.hideDateTimePicker();
    var date1;
    //alert(a.getDate())
    var dd = a.getDate();

    var mm = a.getMonth() + 1;
    var yyyy = a.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    date1 = mm + '/' + dd + '/' + yyyy;
    this.filterMessages(date1);
  };

  getFirstWordFromString = (value) => {
    var firstWord = value.split(" ");
    return firstWord
  }

  filterMessages = (search) => {
    //alert(search)
    if (search.length === 0) {
      { this.inboxAndSentData() }
    }
    else if (this.state.showInbox === 1) {
      let filteredMessage = this.state.inboxDataFilterList.filter((item) => {

        return this.getFirstWordFromString(item.maildate).indexOf(search) > -1
      })

      this.setState({
        inboxDataList: filteredMessage
      }
      )
    }
    else if (this.state.showSent === 1) {
      let filteredSentMessage = this.state.sentDataFilterList.filter((item) => {

        return this.getFirstWordFromString(item.maildate).indexOf(search) > -1
      })

      this.setState({
        sentDataList: filteredSentMessage
      }
      )
    }
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }
  closeControlPanel = () => {
    showBackButton = true
    this.setState({ drawerOpen: false})
  }


  render() {
    return (

      <ImageBackground
        source={require('../../assets/images/Log-In.png')}
        style={styles.container}
      >
        <StatusBar
          hidden={true}
        />
        { !this.state.drawerOpen ?
             <MessageHeader
                showFilterIcon
                headerText={"Messages"}
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
            <MessageHeader
                showFilterIcon
                showBackButton={true}
                headerText={"Messages"}
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
                  content={<SideMenu {...this.props} forceRemount={()=>{this.forceRemount()}} onDrawerItemClick={(val) => this.setState({ drawerOpen: val })} />}
                  onClose={() => this.closeControlPanel()} >
              <ScrollView contentContainerStyle={{ height: 900 }}>
              {this.newBody()}
              {this.state.loading ? <ActivityIndicator
                style={styles.activityStyle}
                size="large"
                color={'#283541'}
              /> :
                null
              }
              <FloatingAction

                onPressMain={() => { navigate.navigateTo(this.props.navigation, "SendMessage") }}
              />
              </ScrollView>
        </Drawer>
      </ImageBackground>

    );
  }
  showInboxOrSent = (type) => {
    if (type === "inbox") {
      this.setState({ showInbox: 1 })
      this.setState({ showSent: 0 })
    }
    if (type === "sent") {
      this.setState({ showSent: 1 })
      this.setState({ showInbox: 0 })
    }
  }
  removeLastChar = (data) => {
    var newStr = data.slice(0, data.length);
    // alert(newStr)
    return newStr
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  newBody() {
    const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', marginTop:5 }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <TouchableOpacity style={{ width: '50%', height: 40 }} onPress={() => { this.showInboxOrSent("inbox") }}>
            <Text
              name={'Inbox'}
              style={this.state.showInbox === 1 ? styles.activeBoxStyle : styles.inActiveBoxStyle}
            >Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '50%', height: 40, borderLeftColor:'black', borderLeftWidth:1 }} onPress={() => { this.showInboxOrSent("sent") }}>
            <Text
              name={'Sent'}
              style={this.state.showSent === 1 ? styles.activeBoxStyle : styles.inActiveBoxStyle}
            >Sent</Text>
          </TouchableOpacity>
        </View>
        <View style={{padding:15, borderBottomColor:'#d1e0e0', borderBottomWidth:1}}>
        <Item style={{backgroundColor:'#e0e4e5', borderRadius:30}}>
            <Icon style={{fontSize: 20, marginLeft:20, color: 'black'}} name="ios-search" />
            <Input placeholderTextColor="#b3b4b5" placeholder="Search" companySearch={(search) => { this.companySearch(search) }} />
            <Icon />
        </Item>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        {this.state.showInbox === 1 ?
          <View style={{ flexDirection: 'row', width: '100%', height: '100%', marginTop: '1%' }}>
            <FlatList
              data={this.state.inboxDataList}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              renderItem={({ item, index }) =>
                <TouchableHighlight style={{ marginLeft: '0%', width: '98%' }} onPress={() => { navigate.navigateTo(this.props.navigation, "InboxAndSentMessageDetail", { messageData: item }) }}>
                  <View style={{ flexDirection: 'row', marginTop: 10, borderRadius: 5, marginRight: '0%', }}>
                    <Image source={require('../../assets/menu_logo.png')}
                      resizeMode='cover'
                      style={styles.image} />
                    <View style={{ flexDirection: 'column', width: '50%', marginTop: 10, marginLeft:7 }}>
                      <Text style={{
                        color: '#338a91', width: '100%'
                        , fontSize: 16, marginLeft: 1, marginRight: 10
                      }}>{item.fromname}</Text>
                      {/* <Text style={{
                        color: 'black', width: '80%'
                        , fontSize: 16, marginLeft: 1, marginRight: 10
                      }}>{item.subject}</Text> */}
                      <Text style={{
                        color: '#b3b4b5', width: '100%'
                        , fontSize: 16, marginLeft: 1, marginRight: 10, marginTop:5
                      }}>{item.comments}</Text>
                      <View style={styles.line}></View>
                    </View>
                    <Text style={{
                      color: '#b3b4b5', width: '100%', marginTop: '8%'
                      , fontSize: 14, marginLeft: 1, marginRight: 0
                    }}> {this.removeLastChar(item.maildate)}</Text>
                  </View>
                </TouchableHighlight>
              }
              keyExtractor={item => item.email}
            />


          </View>
          : null}

        {this.state.showSent === 1 ?
          <View style={{ flexDirection: 'row', width: '100%', height: '100%', marginTop: '1%' }}>
            <FlatList
              data={this.state.sentDataList}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              renderItem={({ item, index }) =>
                <TouchableHighlight style={{ marginLeft: '3%', width: '98%' }} onPress={() => { navigate.navigateTo(this.props.navigation, "InboxAndSentMessageDetail", { messageData: item }) }}>
                  <View style={{ flexDirection: 'row', marginTop: 10, borderRadius: 5, marginRight: '5%', }}>
                    <Image source={require('../../assets/menu_logo.png')}
                      resizeMode='cover'
                      style={styles.image} />
                    <View style={{ flexDirection: 'column', width: '50%', marginTop: 10, marginLeft:7 }}>
                      <Text style={{
                        color: '#338a91', width: '100%'
                        , fontSize: 16, marginLeft: 1, marginRight: 10
                      }}>{item.fromname}</Text>
                      <Text style={{
                        color: '#b3b4b5', width: '100%'
                        , fontSize: 16, marginLeft: 1, marginRight: 10, marginTop:5
                      }}>{item.comments}</Text>
                      <View style={styles.line}></View>
                    </View>
                    <Text style={{
                      color: '#b3b4b5', width: '70%', marginTop: '3%'
                      , fontSize: 14, marginLeft: 1, marginRight: 10
                    }}>{this.removeLastChar(item.maildate)}</Text>
                  </View>
                </TouchableHighlight>
              }
              keyExtractor={item => item.email}
            />
          </View>
          : null}

      </View>
    )
  }



  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    console.log('submit button was pressed')
  };





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '160%',
    marginTop: '5%'
  },
  inputLabel: { fontSize: 16, fontWeight: "normal", paddingTop: 5 },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: '4%',
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white"
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  },
  activeBoxStyle: {
    width: '100%', height: 50, color: '#338a91', paddingTop: 5, textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center', alignContent: 'center', fontSize: 22
  },
  inActiveBoxStyle: {
    width: '100%', height: 50, color: 'black', paddingTop: 5, textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center', alignContent: 'center', fontSize: 22
  }
});
export default Impulse;