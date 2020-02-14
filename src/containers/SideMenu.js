import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, AsyncStorage, ScrollView, ImageBackground } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import DrawerMenu from '../component/drawer';
import navigate from '../component/navigate';
import Common from '../common/common';



// const driverSideMenuList = [
//   { icon: "job", menuOption: 'Job', screen: 'Dashboard',isImage:true },
//   { icon: 'group', menuOption: 'Group Job', screen: 'Dashboard' ,isImage:false},

//   { icon: 'calendar', menuOption: 'Job Calendar', screen: 'SurgeryCalendar',isImage:false },
//   // { icon: 'lock', menuOption: 'Privacy Policy', screen: 'Dashboard' },
//   { icon: 'share-square-o', menuOption: 'Log Out', screen: 'logOut',isImage:false },
// ];
const managerSideMenuList = [
  { icon: 'group', menuOption: 'Surgery Schedule', screen: 'ManagerDashboard', isImage: false },
  { icon: 'group', menuOption: 'Messages', screen: 'CreateJob' },

  { icon: 'calendar', menuOption: 'Company List', screen: 'SurgeryCalendar', isImage: false },
  // { icon: 'lock', menuOption: 'Privacy Policy', screen: 'Dashboard' },
  { icon: 'share-square-o', menuOption: 'Log Out', screen: 'logOut', isImage: false },
];
// const managerDriverSideMenuList = [
//   { icon: 'group', menuOption: 'Job', screen: 'ManagerDriverDashboard' ,isImage:false},
//   { icon: 'group', menuOption: 'Create Job', screen: 'CreateJob' },

//   { icon: 'calendar', menuOption: 'Job Calendar', screen: 'SurgeryCalendar',isImage:false },
//   // { icon: 'lock', menuOption: 'Privacy Policy', screen: 'Dashboard' },
//   { icon: 'share-square-o', menuOption: 'Log Out', screen: 'logOut' ,isImage:false},
// ];


class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      expand: false,
      loginPressed: false,
      accessToken: '',
      userName: '',
      userProfilePic: '',
      showNavigation: 1,
      uniqueValue: 1
    };
  }

  showSideMenu = () => {
    return (
      <View>
        {this.sideMenuListItems()}
      </View>
    );
  }

  sideMenuListItems() {
    return (
      managerSideMenuList.map((data, i) => {
        return (
          <DrawerMenu
            key={i}
            text={data.menuOption}
            menuStyle={styles.myItemsMenuStyle}
            textStyle={styles.drawerMenuItemsText}
            onPress={() => this.navigateTo(data.screen)}
            isImage={data.isImage}
          />
        )
      })
    );

  }

  addNewProductRequest=()=>{
    navigate.navigateTo(this.props.navigation, 'NewProductRequest')
    }
    
  navigateTo(screen, type) {
    this.props.onDrawerItemClick(false);
    if (screen === 'logOut') {
      AsyncStorage.removeItem("userCredential");
      this.props.dispatch({
        type: 'SET_USER_CREDENTIAL',
        payload: {}
      });
      navigate.navigateWithReset(this.props.navigation, 'Login')
    }

  }
  hideShowNavigationDrawaer() {
    this.setState({ showNavigation: 1 })
  }
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    })
    );
    { this.props.forceRemount() }
  }
  render() {
    return (
      <ImageBackground key={this.state.uniqueValue} style={this.state.showNavigation === 0 ? styles.drawerHide : styles.drawerContainer}
      source={require('../../assets/images/Log-In.png')}>
      
        <View style={{backgroundColor:'white', borderRadius:30, marginTop:75, height:'110%'}}>
        <TouchableOpacity onPress={() => {navigate.navigateTo(this.props.navigation, 'EditProfile')}} style={{ alignItems: 'center', marginTop: '0%', position:'relative', justifyContent:'center', alignSelf:'center', bottom:40 }}>
          <Image source={require('../../assets/menu_logo.png')} resizeMode='cover' style={{ height: 100, width: 100, borderRadius: 50}} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginLeft: '4%', alignItems: 'center', marginTop: 0 }}>
        <TouchableOpacity style={[styles.card, {backgroundColor:'#a5e2ea', paddingTop:10}]} onPress={() => {
            // this.forceRemount()
            navigate.navigateWithReset(this.props.navigation, 'SurgeryCalendar')
          }} >
            <Image style={styles.userImage} source={require('../../assets/surgery.png')} />
            <View style={{alignItems: "center", justifyContent: "center", paddingVertical: 17, paddingHorizontal: 16,}}>
              <Text style={{color:'black'}}>Surgery</Text>
              <Text style={{color:'black'}}>Schedule</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, {backgroundColor:'#0c5d78', paddingTop:10}]} onPress={()=>this.addNewProductRequest()}>
            <Image style={styles.userImage} source={require('../../assets/images/001-shipping.png')} />
            <View style={{alignItems: "center", justifyContent: "center", paddingVertical: 17, paddingHorizontal: 16}}>
              <Text style={{color:'white'}}>Add Product</Text>
              <Text style={{color:'white'}}>Request</Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', marginLeft: '4%', alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity style={[styles.card, {backgroundColor:'#f9cacd', paddingTop:10}]} onPress={() => {
            navigate.navigateTo(this.props.navigation, 'CompanyList')
          }} >
            <Image style={styles.userImage} source={require('../../assets/companies.png')} />
            <View style={{alignItems: "center", justifyContent: "center", paddingVertical: 17, paddingHorizontal: 16}}>
              <Text style={{color:'black'}}>Companies</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, {backgroundColor:'#f6e67d', paddingTop:10}]} onPress={() => {
            navigate.navigateTo(this.props.navigation, 'Messages')
          }}>
            <Image style={styles.userImage} source={require('../../assets/message.png')} />
            <View style={{alignItems: "center", justifyContent: "center", paddingVertical: 17, paddingHorizontal: 16}}>
              <Text style={{color:'black'}}>Messages</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.addToCarContainer}>
                <TouchableOpacity style={styles.shareButton} onPress={() => {this.navigateTo("logOut","0") }}>
                  <Text style={styles.shareButtonText}>Log Out</Text>  
                </TouchableOpacity>
              </View>
        </View>
        {/* {this.showSideMenu()} */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1
  },
  addToCarContainer:{
    marginHorizontal:10, 
    marginTop:10,
    marginBottom:20
  },
  shareButton: {
    marginTop:20,
    height:47,
    marginLeft:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    borderColor:'#f9cacd',
    borderWidth:1,
    backgroundColor: "white",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  drawerHide: {
    height: 0,
    width: 0
  },
  icon: {
    width: 23,
    height: 23,
  },
  drawerMenuItemsText: {
    paddingLeft: 8,
    color: 'black',
    backgroundColor: '#3FC2F3',
  },
  // avatar: {
  //   width: 130,
  //   height: 130,
  //   borderRadius: 63,
  //   borderWidth: 4,
  //   borderColor: "white",
  //   marginBottom:10,
  //   alignSelf:'center',
  //   position: 'absolute',
  //   marginTop:130
  // },
  myItemsMenuStyle: {
    padding: 15,
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    // borderColor: 'gray'
  },
  colStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: Common.deviceHeight / 13,
    borderBottomWidth: 3,
    borderBottomColor: '#00A659'
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    borderRadius:20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  // cardFooter: {
  //   paddingVertical: 17,
  //   paddingHorizontal: 16,
  //   borderTopLeftRadius: 1,
  //   borderTopRightRadius: 1,
  //   flexDirection: 'row',
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "black",
    fontWeight: 'bold'
  },
  // position: {
  //   fontSize: 14,
  //   flex: 1,
  //   alignSelf: 'center',
  //   color: "#696969"
  // },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  icon: {
    height: 20,
    width: 20,
  }
});
const mapStateToProps = state => ({
  userCredential: state.userCredential
});
export default connect(mapStateToProps)(SideMenu);