import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text, StatusBar, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import NotificationHeader from '../component/NotificationHeader';
import Common from '../common/common';
import apiCaller from '../common/apiCaller';
import navigate from '../component/navigate';
import { connect } from 'react-redux';
import moment from 'moment';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupJobScreen: true,
      password: '',
      loading: false,
      drawerOpen: false,
      modalVisible: false,
      viewNotification: {}
    }
  }


  _renderItem = ({ item, i }) => (
    <TouchableOpacity
      onPress={() => {
        this.performAction(item);
      }}
      key={i}
    >
      <View
        style={{
          backgroundColor: item.Is_Read ? "white" : "#d8d8d8", height: Common.deviceHeight / 8, flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#A2A2A2'
        }}
      >
        <View
          style={{ width: '65%', marginHorizontal: '5%' }}
        >
          <Text
            style={{ color: '#CB0D1F', marginVertical: '5%' }}
          >
            {item.Title}
          </Text>
          <Text
            style={{ color: '#A2A2A2' }}
          >
            {item.Notification_Message}
          </Text>
        </View>
        <View>
          <Text
            style={{ color: '#A2A2A2', marginVertical: '7%' }}
          >
            {moment(item.NotificationDate).format('MM/DD/YYYY')}
          </Text>
          <View
            style={{
              backgroundColor: '#00A659', justifyContent: 'center',
              marginVertical: '2%', height: '50%', width: '90%'
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center'
              }}
            >
              {moment(item.NotificationDate).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  closeControlPanel = () => {
    showBackButton = true
    this.setState({ drawerOpen: false})
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }

  render() {
    let jobDetailArray = [];
    if (this.props.notificatons && this.props.notificatons.notifications && this.props.notificatons.notifications.Data && this.props.notificatons.notifications.Data.Notification) {
      jobDetailArray = this.props.notificatons.notifications.Data.Notification;
    }

    return (
      <ImageBackground
        source={require('../../assets/images/Log-In.png')}
        style={styles.container}
      >
        <StatusBar
          hidden={true}
        />
        <NotificationHeader
          showFilterIcon
          showBackButton={true}
          headerText={"Notification"}
          onPress={() => {
            this.openControlPanel()
          }}
        />
      <Drawer
            open={this.state.drawerOpen}
            type="overlay"
            tapToClose={true}
            ref={(ref) => { this.drawer = ref }}
            content={<SideMenu {...this.props} forceRemount={()=>{this.forceRemount()}} onDrawerItemClick={(val) => this.setState({ drawerOpen: val })} />}
            onClose={() => this.closeControlPanel()} >
          <ScrollView style={{flex:1,}}>
        {
          jobDetailArray.length
            ?
            <FlatList
              style={{ marginTop: '5%' }}
              renderItem={this._renderItem}
              data={jobDetailArray}
            />
            :
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>Sorry, no notifications found.</Text>
            </View>
        }
        {this.modal()}
        </ScrollView>
        </Drawer>
      </ImageBackground>
    );
  }

  performAction(notifi) {
    debugger;
    if (notifi.Is_Read) {
      this.redirect(notifi);
    } else {
      apiCaller(`setreadnotification/${notifi.Id}`, 'get', this.props.userCredential.data.UserId).then(success => {
        this.props.dispatch({
          type: 'NOTIFICATION_LIST',
          id: this.props.userCredential.data.UserId,
        });
        this.redirect(notifi);
      })
        .catch(error => {
          this.redirect(notifi);
        })
    }

  }

  redirect(notifi) {
    switch (notifi.NotificationType) {
      case 1:
        navigate.navigateWithReset(this.props.navigation, 'Dashboard', 'Job');
        break
      case 2:
        if (notifi.Notification_Message && notifi.Notification_Message.length > 80) {
          this.setState({ viewNotification: notifi }, () => {
            this.setModalVisible(true)
          })
        }
        break
      case 3:
        navigate.navigateWithReset(this.props.navigation, 'Dashboard', 'Group Job');
        break
      default:

    }
  }

  modal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => { }}
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1, justifyContent: "center" }}>
          <View style={{ height: 350, backgroundColor: "#fff", borderRadius: 5, margin: 10 }}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", position: "absolute", paddingRight: 5 }}
              onPress={() => {
                this.setModalVisible(false);
              }}>
              <FontAwesome5 size={25} name="times" />
            </TouchableOpacity>
            {this.form()}
          </View>
        </View>
      </Modal>
    )
  }
  form() {
    return (
      <View style={[{ marginLeft: 10, marginRight: 10, flexDirection: "column" }]}>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 20, color: "black", paddingTop: 5 }}>{this.state.viewNotification.Title} </Text>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 15 }}>
            {this.state.viewNotification.Notification_Message}</Text>
        </View>
      </View>
    )
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

const mapStateToProps = state => ({
  notificatons: state.notificatons,
  userCredential: state.userCredential,
});

export default connect(mapStateToProps)(Notification);