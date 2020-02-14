import React, { Component } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator, AsyncStorage, FlatList, Image, KeyboardAvoidingView
  , TouchableHighlight, Modal, ImageBackground
} from 'react-native';
import fetch from 'isomorphic-fetch';
import SideMenu from './SideMenu'
import Drawer from 'react-native-drawer';
import navigate from '../component/navigate';
import { Dropdown } from 'react-native-material-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Common from '../common/common';
import { connect } from 'react-redux';
import Moment from 'moment';
var Toast = require('react-native-toast');
import NewProductRequestTitleHeader from '../component/NewProductRequestTitleHeader';
import TreeView from '@zaguini/react-native-tree-view'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Toast, { DURATION } from 'react-native-easy-toast'
class JobDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: '',

      surgeryid: 0,
      companyResponse: [],
      categoryResponse: [],
      doctorResponse: [],
      productResponse: [],
      companyList: [],
      doctorList: [],
      productList: [],
      productTypeList: [],
      categoryList: [],
      company: '',
      doctor: '',
      product: '',
      productType: '',
      category: 'Category',
      companyShow: 1,
      doctorShow: 1,
      productShow: 1,
      productTypeShow: 1,
      categoryShow: 1,
      commentShow: 1,
      companyid: '',
      doctorid: '',
      productid: '',
      categoryid: '',
      categoryList: [],
      categorySelect: 0,
      showModal: false,
      categoryTreeViewData: [
        {
          "Id": 1,
          "Name": "Biologics",
          "ParentId": 0,
          "Child": [
            {
              "Id": 3,
              "Name": "Nerve",
              "ParentId": 1,
              "Child": [
                {
                  "Id": 5,
                  "Name": "Hand",
                  "ParentId": 3,
                  "Child": [
                    {
                      "Id": 6,
                      "Name": "Right",
                      "ParentId": 5,
                      "Child": []
                    }
                  ]
                }
              ]
            },
            {
              "Id": 4,
              "Name": "Bone",
              "ParentId": 1,
              "Child": []
            }
          ]
        },
        {
          "Id": 2,
          "Name": "Reconstructive",
          "ParentId": 0,
          "Child": []
        }
      ]




    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userCredential').then((valueData) => {
      this.setState({ user_id: JSON.parse(valueData).userid });
      { this.companyCategoryDropdownData() }
    });


  }
  companyCategoryDropdownData() {

    this.setState({ loading: true })
    var requestData =
    {
      "vendorid": this.state.user_id,
      "companyid": "0",
      "flag": "0"
    }
    return fetch('http://gophorapi.demoappstore.com/api/product-input', {
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
        this.setState({ companyResponse: responseJson.Data.company });
        this.setState({ categoryResponse: responseJson.Data.category });
        //             this.setState({facilityList: responseJson.Data.facility});
        responseJson.Data.company.map((row, rowIndex) => {
          this.state.companyList.push({ value: row.name })
        });

        responseJson.Data.category.map((row, rowIndex) => {
          this.state.categoryList.push({ value: row.name })
        });
        // this.setState({arrayDateDataShow:this.state.arrayDateData})
        this.setState({
          loading: false
        })
      })

      .catch((error) => {

        console.error(error);
      });

  }
  newProductRequestSave() {

    this.setState({ loading: true })

    var requestData =
    {
      "id": "0",
      "vendorid": this.state.user_id,
      "companyid": this.state.doctorid,
      "mdid": this.state.doctorid,
      "resourceid": this.state.productid,
      "resourcetype": this.state.productType,
      "categoryid": this.state.categoryid,
      "comments": this.state.comments
    }
    return fetch('http://gophorapi.demoappstore.com/api/product-request', {
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


          this.refs.toast.show('Product Request Saved Successfully', 1000, () => {
            navigate.navigateTo(this.props.navigation, 'SurgeryCalendar')
          });

        }
        else if (responseJson.StatusCode === 403) {
          this.refs.toast.show('Product Request already exists', 1000, () => {
          });


        }



      })

      .catch((error) => {

        console.error(error);
      });

  }

  productDoctorDropdownData() {
    this.setState({ loading: true })

    var requestData =
    {
      "vendorid": this.state.user_id,
      "companyid": this.state.companyid,
      "flag": "1"
    }
    return fetch('http://gophorapi.demoappstore.com/api/product-input', {
      method: 'POST',
      headers: {
        'authentication': '',
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

      .then((response) => response.json())
      .then((responseJson) => {
        // alert(JSON.stringify(responseJson))
        this.setState({ loading: false })
        this.setState({ doctorResponse: responseJson.Data.doctor });
        this.setState({ productResponse: responseJson.Data.product });
        //             this.setState({facilityList: responseJson.Data.facility});
        responseJson.Data.doctor.map((row, rowIndex) => {
          this.state.doctorList.push({ value: row.name })
        });

        responseJson.Data.product.map((row, rowIndex) => {
          this.state.productList.push({ value: row.name })
        });
        // this.setState({arrayDateDataShow:this.state.arrayDateData})
        this.setState({
          loading: false
        })
      })

      .catch((error) => {

        console.error(error);
      });

  }
  datTime = (data) => {
    var NewText = data.replace("T00:00:00", "");
    return Moment(NewText).format('MM-DD-YYYY')
  }
  newProductRequest = () => {
    if (this.state.company.length === 0 || this.state.doctor.length === 0 || this.state.productType.length === 0 || this.state.productType.length === 0
      || this.state.category.length === 0 || this.state.comments.length === 0) {
      if (this.state.company.length === 0) {
        this.setState({ companyShow: 0 })
      }
      if (this.state.doctor.length === 0) {
        this.setState({ doctorShow: 0 })
      }
      if (this.state.product.length === 0) {
        this.setState({ productShow: 0 })
      }
      if (this.state.productType.length === 0) {
        this.setState({ productTypeShow: 0 })
      }
      if (this.state.category === "Category") {
        this.setState({ categoryShow: 0 })
      }
      if (this.state.comments.length === 0) {
        this.setState({ commentShow: 0 })
      }
    }
    else {
      { this.newProductRequestSave() }
    }

  }
  dropDownValueChange = (value, type) => {
    if (type === "company") {
      this.setState({ company: value })
      this.setState({ companyShow: 1 })
      this.filterCompany(value)
      this.productDoctorDropdownData()
    }
    if (type === "doctor") {
      this.setState({ doctor: value })
      this.setState({ doctorShow: 1 })
      this.filterDoctor(value)
    }
    if (type === "product") {
      this.setState({ product: value })
      this.setState({ productShow: 1 })
      this.filterProduct(value)
    }
    if (type === "productType") {
      this.setState({ productType: value })
      this.setState({ productTypeShow: 1 })

    }
    if (type === "Category") {
      this.setState({ category: value })
      this.setState({ categoryShow: 1 })
      this.setState({ showModal: true })
      //this.filterCategory(value)
    }
    if (type === "comments") {
      this.setState({ comments: value })
      this.setState({ commentShow: 1 })
    }

  }
  filterCompany = (companyName) => {


    let filterCompany = this.state.companyResponse
    let filteredCompany = filterCompany.filter((item) => {

      return item.name === companyName
    })

    this.setState({
      companyid: filteredCompany[0].id
    })
    //  alert(JSON.stringify(filteredCompany[0].id))

  }
  filterDoctor = (doctorName) => {


    let filterDoctor = this.state.doctorResponse
    let filteredDoctor = filterDoctor.filter((item) => {

      return item.name === doctorName
    })

    this.setState({
      doctorid: filteredDoctor[0].id
    })
    //  alert(JSON.stringify(filteredCompany[0].id))

  }
  filterProduct = (productName) => {


    let filterProduct = this.state.productResponse
    let filteredProduct = filterProduct.filter((item) => {

      return item.name === productName
    })

    this.setState({
      productid: filteredProduct[0].id
    })
    //  alert(JSON.stringify(filteredCompany[0].id))

  }
  filterCategory = (id, categoryName) => {


    this.setState({ categorySelect: 1 })
    this.setState({ category: categoryName })
    this.setState({ categoryid: id })
  }
  cancelFilterCategory = () => {


    this.setState({ showModal: false })
    this.setState({ category: 'Category' })
    this.setState({ categoryid: 0 })


  }
  getIndicator(isExpanded, hasChildrenNodes) {
    if (!hasChildrenNodes) {
      return '*';
    } else if (isExpanded) {
      return '-';
    } else {
      return '+';
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
        style={styles.container}
        source={require('../../assets/images/Log-In.png')}
      >
        <StatusBar
          hidden={true}
        />
        { !this.state.drawerOpen ?
             <NewProductRequestTitleHeader
                showFilterIcon
                headerText={"New Request"}
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
            <NewProductRequestTitleHeader
                showFilterIcon
                showBackButton={true}
                headerText={"New Request"}
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
            <KeyboardAvoidingView style={{ marginTop: '0%', width: '100%', height: 'auto', padding: 15 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderStyle: 'dashed',
                  borderColor: 'gray',
                  height: 62
                }}>
                <Dropdown
                  data={this.state.companyList}
                  label='Select Company'
                  itemTextStyle={{ color: "black", height: '100%', }}
                  baseColor="black"
                  style={{ color: '#0c5d78' }}
                  inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  containerStyle={[styles.dropdownStyle, {}]}
                  onChangeText={(company) => { this.dropDownValueChange(company, "company") }}
                />
                {this.state.companyShow === 0 ? <Text style={styles.errorStyle}>Please Select Company</Text> : null}
              </View>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                  borderStyle: 'dashed',
                  borderColor: 'gray',
                  height: 62
                }}>
                <Dropdown
                  label='Select Doctor'
                  data={this.state.doctorList}
                  containerStyle={styles.dropdownStyle}
                  inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  baseColor="black"
                  style={{ color: 'black', }}
                  onChangeText={(doctor) => { this.dropDownValueChange(doctor, "doctor") }}

                />
                {this.state.doctorShow === 0 ? <Text style={styles.errorStyle}>Please Select Doctor</Text> : null}
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderStyle: 'dashed',
                  borderColor: 'gray',
                  height: 62
                }}>
                <Dropdown
                  label='Product Name'
                  data={this.state.productList}
                  containerStyle={styles.dropdownStyle}
                  inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  baseColor="black"
                  style={{ color: 'black' }}
                  onChangeText={(product) => { this.dropDownValueChange(product, "product") }}
                />
                {this.state.productShow === 0 ? <Text style={styles.errorStyle}>Please Select Product</Text> : null}
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderStyle: 'dashed',
                  borderColor: 'gray',
                  height: 62
                }}>
                <TextInput
                  onChangeText={(productType) => { this.dropDownValueChange(productType, "productType") }}
                  style={[styles.textInputStyle]}
                  placeholder="Product Type"
                  placeholderTextColor="black"
                >{this.state.productType}</TextInput>
                {this.state.productTypeShow === 0 ? <Text style={styles.errorStyle}>Please Select Product Type</Text> : null}
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderStyle: 'dashed',
                  borderColor: 'gray',
                  height: 62
                }}>
                <TouchableOpacity style={{
                  marginTop: '3%',
                  flexDirection: 'row',
                  padding:7,
                  width: '100%', color: 'black',
                  // ,borderBottomColor: 'black', // Add this to specify bottom border color
                  // borderBottomWidth: 1,
                  height: '100%',
                }} onPress={() => this.dropDownValueChange("Category", "Category")}>
                  <Text
                    style={{
                      marginTop: '1%',
                      fontSize: 15,
                      width: '94%', 
                      color: 'black',
                      height: 50,
                    }}

                  >{this.state.category}
                  </Text>
                  <Image
                    style={{
                      height: 18, 
                      width: 18,
                      marginTop:5
                    }}
                    source={require('../../assets/arrow.png')}
                  />
                </TouchableOpacity>

                {this.state.categoryShow === 0 ? <Text style={styles.errorStyle}>Please Select Category</Text> : null}
              </View>
              <Dialog
                width={300}
                height={400}
                visible={this.state.showModal}
                dialogTitle={<DialogTitle title="Category" />}
                footer={
                  <DialogFooter>
                    <DialogButton
                      text="CANCEL"
                      onPress={() => { this.cancelFilterCategory() }}
                    />
                    <DialogButton
                      text="ADD"
                      onPress={() => { this.setState({ showModal: false }) }}
                    />
                  </DialogFooter>
                }
                onTouchOutside={() => {
                  this.setState({ showModal: false })
                }}
              >
                <DialogContent>
                  <TreeView
                    ref={ref => this.treeView = ref}
                    data={this.state.categoryResponse}
                    renderItem={(item, level) => (
                      <View style={{ flexDirection: 'row' }}>
                        {
                          item.collapsed !== null ?
                            <Text style={{ fontSize: 18, marginLeft: 25 * level }}>{item.collapsed ? ' + ' : ' - '}</Text> :
                            <Text style={{ marginLeft: 25 * level }}> - </Text>
                        }
                        <TouchableOpacity style={{ backgroundColor: item.Name === this.state.category ? '#107780' : '' }} onPress={() => this.filterCategory(item.Id, item.Name)}>
                          <Text
                            style={{
                              marginLeft: 25 * level,
                              fontSize: 18,
                              width: '180%',
                              color:item.Name === this.state.category ? 'white' : ''
                            }}
                          >
                            {item.Name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </DialogContent>
              </Dialog>
              <Text style={styles.heading} ></Text>
              <TextInput multiline={true} onChangeText={(comments) => { this.dropDownValueChange(comments, "comments") }} placeholderTextColor={"black"} placeholder={"Type your comment here..."} style={{
                color: 'black', fontSize: 16, borderRadius: 3, marginLeft: 0, marginRight: 10, width: '100%', marginTop: 10, backgroundColor: 'white'
                ,
                borderColor: '#f9cacd',
                borderWidth: 1,
                height: '30%'
              }}>{this.state.comments}</TextInput>
              {this.state.commentShow === 0 ? <Text style={styles.errorStyle}>Please Enter Comment</Text> : null}
              <View style={styles.addToCarContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.newProductRequest()
                  }}
                  style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Send Request</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center', alignSelf: 'center', alignContent: 'center', marginTop: '5%', width: '40%' }}>
                  <Text style={{ color: 'red', borderBottomColor: 'red', borderBottomWidth: 1 }}>Cancel</Text>
                </TouchableOpacity>

              </View>


            </KeyboardAvoidingView>
          </ScrollView>
          </Drawer>

          {this.state.loading ? <ActivityIndicator
            style={styles.activityStyle}
            size="large"
            color={'#283541'}
          /> :
            null
          }
          <Toast
            ref="toast"
            style={{ backgroundColor: 'black' }}
            position='bottom'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: 'black' }}
          />
        </ImageBackground>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addToCarContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20
  },
  shareButton: {
    marginTop: 20,
    height: 52,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#92dae8",
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  },
  textInputStyle: {
    marginTop: '2%',
    fontSize: 15,
    padding:7,
    width: '100%', color: 'black',
    // , borderBottomColor: 'black', // Add this to specify bottom border color
    // borderBottomWidth: 1,
    height: '80%',

  },
  icon: {
    width: 23,
    height: 23,
  },
  heading: {
    color: 'black',
    fontSize: 18,
    //fontStyle:'bold',
    marginLeft: '1%',
    marginTop: '5%'
  },
  errorStyle: {
    color: 'red',
    fontSize: 12,
    //fontStyle:'bold',
    marginLeft: '2%',
    marginTop: '7%'
  },
  dropdownStyle: {
    height: '6%',
    //width: '100%', 
    marginTop: '1%',
    padding:7,
    bottom: 24,
  },
  line: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginTop: '5%'
  }
});


const mapStateToProps = state => ({
  jobDetail: state.jobDetail
});

export default connect(mapStateToProps)(JobDetail);