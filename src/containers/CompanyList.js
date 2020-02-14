import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Picker,
  FlatList,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  AsyncStorage,
  ScrollView,
  ImageBackground
} from 'react-native';
import SideMenu from './SideMenu'
import Drawer from 'react-native-drawer';
import navigate from '../component/navigate';
import Button from '../component/button';
import CompanyHeader from '../component/CompanyHeader';
import Common from '../common/common';
import apiCaller from '../common/apiCaller';
import MultiSelect from 'react-native-multiple-select';
import { showToast } from '../common/globalFunction';
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
      selectedItems: [],
      user_id: '',
      companyResponse: [],
      companyList: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userCredential').then((valueData) => {
      this.setState({ user_id: JSON.parse(valueData).userid });
      { this.companyListData() }
    });
  }

  companySearch = (search) => {
    //alert(search)
    if (search.length === 0) {
      { this.companyListData() }
    }
    else {
      let filteredCompany = this.state.companyResponse.filter((item) => {

        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      })

      this.setState({
        companyResponse: filteredCompany
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
        {/* <CompanyHeader
          showBackButton={false}
          headerText={"Company Name"}
          //companySearch={(search) => { this.companySearch(search) }}
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        /> */}
        { !this.state.drawerOpen ?
             <CompanyHeader
                showFilterIcon
                headerText={"Company List"}
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
                headerText={"Company List"}
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
              <View style={{padding:15, borderBottomColor:'#d1e0e0', borderBottomWidth:1}}>
                <Item style={{backgroundColor:'#e0e4e5', borderRadius:30}}>
                      <Icon style={{fontSize: 20, marginLeft:20, color: 'black'}} name="ios-search" />
                      <Input placeholderTextColor="black" placeholder="Company Search" companySearch={(search) => { this.companySearch(search) }} />
                    <Icon />
                </Item>
            </View>
            {this.newBody()}
          </ScrollView>
        </Drawer>
      </ImageBackground>
    );
  }
  companyListData() {
    this.setState({ loading: true })

    var requestData =
    {
      "vendorid": this.state.user_id,

    }
    return fetch('http://gophorapi.demoappstore.com/api/vendor-company', {
      method: 'POST',
      headers: {
        'authentication': '',
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

      .then((response) => response.json())
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson))
        this.setState({ loading: false })
        this.setState({ companyResponse: responseJson.Data.company });
        // this.setState({productResponse: responseJson.Data.product});
        //             this.setState({facilityList: responseJson.Data.facility});
        responseJson.Data.company.map((row, rowIndex) => {
          this.state.companyList.push(row.name)
        });
        // console.log('companyResponse:', companyResponse)

        //  responseJson.Data.product.map((row, rowIndex) => {
        //   this.state.productList.push({value:row.name})
        //               });
        // this.setState({arrayDateDataShow:this.state.arrayDateData})
        this.setState({
          loading: false
        })
      })

      .catch((error) => {

        console.error(error);
      });

  }
  newBody() {
    const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', width: '100%', height: '100%', marginTop: '0%' }}>
          <FlatList
            data={this.state.companyResponse}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            renderItem={({ item, index }) =>
            <View>
              <TouchableHighlight style={{ marginLeft: '0%', width: '100%', marginTop: 10 }} onPress={() => { navigate.navigateTo(this.props.navigation, "CompanySendMessage", { messageData: this.state.companyResponse[0] }) }}>
                <View>
                  <View style={{ flexDirection: 'row', marginTop: 0, borderRadius: 5, marginRight: '2%', marginLeft: '2%', backgroundColor: 'white' }}>
                    <Image source={require('../../assets/trimm.png')}
                      resizeMode='cover'
                      style={styles.image} />
                    <View style={{ flexDirection: 'column', width: '50%', marginLeft: 4 }}>
                      <Text style={{
                        color: '#107780', width: '100%'
                        , fontSize: 16, marginLeft: 4, marginRight: 10
                      }}>{item.name}</Text>
                      <Text style={{
                        color: 'black', width: '100%'
                        , fontSize: 16, marginLeft: 4, marginRight: 10, marginTop: 4
                      }}>{item.address}</Text>
                      <Text style={{
                        color: 'black', width: '100%'
                        , fontSize: 16, marginLeft: 4, marginRight: 10, marginTop: 4
                      }}>
                        {item.contactdetail.map((row, rowIndex) => {
                          return (<Text style={{
                            color: 'black', width: '100%'
                            , fontSize: 16, marginLeft: 1, marginRight: 0, marginTop: 0
                          }}>{index === 0 ? row.contactvalue : "," + row.contactvalue}</Text>
                          )
                        })}
                      </Text>
                    </View>
                    <Image source={require('../../assets/inboxes.png')}
                      resizeMode='cover'
                      style={styles.sendMessageImageStyle} />
                  </View>
                  {/* <View style={styles.line}></View> */}
                </View>
              </TouchableHighlight>
          </View>
            }
            keyExtractor={item => item.email}
          />
        </View>
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
    backgroundColor: '#241722',
    flexDirection: 'column'
  },
  line: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '150%',
    marginTop: '5%'
  },
  triangle: {

    height: 20,
    width: '28%',
    backgroundColor: '#FC1E34',
    borderStyle: 'solid',
    marginLeft: 7,
    marginTop: '5%',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 6
  },
  arrowRight: {
    borderTopWidth: 30,
    borderRightWidth: 0,
    borderBottomWidth: 30,
    height: '50%',
    width: '30%',
    //borderLeftWidth: "tomato",
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: "tomato",
  },
  inputLabel: { fontSize: 16, fontWeight: "normal", paddingTop: 5 },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
    marginTop: '2%',
    marginLeft: 10
  },
  sendMessageImageStyle: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderColor: "white",
    marginTop: '0%',
    marginLeft: '13%'
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  },
});
export default Impulse;