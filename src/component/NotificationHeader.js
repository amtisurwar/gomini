import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Common from '../common/common';
import IconBadge from 'react-native-icon-badge';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'NOTIFICATION_LIST',
      id: this.props.userCredential.data.UserId,
    });
  }

  render() {
    let UnReadCount = 0;
    if (this.props.notificatons && this.props.notificatons.notifications && this.props.notificatons.notifications.Data && this.props.notificatons.notifications.Data.UnReadCount) {
      UnReadCount = this.props.notificatons.notifications.Data.UnReadCount;
    }
    return (
      <View style={{
        height: 60, width: '100%',
        flexDirection: 'row',
      }}>

        <TouchableOpacity
          onPress={this.props.onPress}
          style={{
            marginVertical: 4,
            width: Common.deviceWidth / 10,
            marginHorizontal: '4%'
          }}
        >
          {
            this.props.showBackButton ?
              // <Image source={require('../../assets/cross.png')} resizeMode='cover' style={{ height: 30, width: 30, marginTop: 10 }} />
              <Image source={{ uri: 'https://iconsetc.com/icons-watermarks/simple-black/bfa/bfa_ellipsis-v/bfa_ellipsis-v_simple-black_512x512.png' }} resizeMode='cover' style={{ height: 30, width: 30, marginTop: 10 }} />
              :
              <Image source={{ uri: 'https://iconsetc.com/icons-watermarks/simple-black/bfa/bfa_ellipsis-v/bfa_ellipsis-v_simple-black_512x512.png' }} resizeMode='cover' style={{ height: 30, width: 30, marginTop: 10 }} />
          }
        </TouchableOpacity>
        <Text style={{ height: 40, width: 80, marginLeft: '19%',marginTop:'3%', fontSize:25,color:'#283541' }}>
          {this.props.headerText} 
        </Text>
        <IconBadge
          MainElement={
            <View style={{
              marginHorizontal: '25%', marginVertical: 10
            }}>
              <TouchableOpacity
                onPress={this.props.onPress}
              >
                {
                this.props.showBackButton ?
                <Image
                  style={{ height: 30, width: 50, }}
                  source={require('../../assets/cut.png')}
                  resizeMode='contain'
                />:
                  null}
              </TouchableOpacity>
            </View>
          }
          BadgeElement={
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: "300" }}>{UnReadCount}</Text>
          }
          IconBadgeStyle={
            {
              width: 22,
              height: 22,
              backgroundColor: 'red'
            }
          }
          Hidden={!UnReadCount}
        />
        {/* <TouchableOpacity
        onPress={this.props.on_bell_icon_press}
        style={{ marginHorizontal: '1%', marginVertical: 10 }}
      >
        <MaterialCommunityIcons
          name={'bell-outline'}
          size={Common.deviceWidth / 12}
        />
      </TouchableOpacity> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notificatons: state.notificatons,
  userCredential: state.userCredential,
});

export default connect(mapStateToProps)(Header);
