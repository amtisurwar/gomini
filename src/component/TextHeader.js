import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Image, View,TouchableOpacity,Text } from 'react-native';
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
 
render(){
 
  
  return (
    <View style={{
      height: 60, width: '100%',
      flexDirection: 'row'
    }}>

      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          marginVertical: 6,
          width: Common.deviceWidth / 9,
          marginHorizontal: '4%'
        }}
      >
        {
          this.props.showBackButton ?
            <Ionicons
              name={'ios-arrow-round-back'}
              color={'#283541'}
              size={Common.deviceWidth / 8}
            />
            :
            <Icon
              name={'dehaze'}
              color={'#283541'}
              style={{marginTop:3}}
              size={Common.deviceWidth / 8}
            />
        }
      </TouchableOpacity>
      <Text
        style={{ height: 60, width: '80%',marginLeft:'15%' ,marginTop:'4%',fontSize:26,color:'black' }}
        >{this.props.headerText} </Text>
    </View>
  );
}
}

const mapStateToProps = state => ({
  notificatons: state.notificatons,
  userCredential: state.userCredential,
});

export default connect(mapStateToProps)(Header);
