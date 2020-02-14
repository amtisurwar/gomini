import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Agenda } from 'react-native-calendars';
import Drawer from 'react-native-drawer';
import Common from '../common/common';
import Header from '../component/header';
import fetch from 'isomorphic-fetch';
import SideMenu from './SideMenu'
import moment, { version } from 'moment';
import navigate from '../component/navigate';
import * as RN from 'react-native';
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  Text,
  NetInfo,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Alert,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  CheckBox,
  Dimensions,
  Platform,
  Modal, TouchableHighlight
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Moment from 'moment';
import { Button } from 'native-base';
let markeddate_json = {};
var markeddates = [];
let Data = {};
var counter = 0
var weekDataChange;
var weekDataChangeDay;
class MyCustomCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      activeDate: new Date(),
      user_id: '',
      dayName: '',
      arrayData: [],
      arrayDateData: [],
      arrayDataShow: [],
      showOnLoad: 0,
      arrayDataShowSingleScreen: [],
      arrayDateDataShow: [],
      surgeryDataShow: [],
      loading: true,
      allChecked: true,
      selfChecked: false,
      matchingCount: 0,
      selectedDate: 0,
      dataShow: '',
      clickDataShow: 1,
      role_id: '',
      months: ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"],
      weekMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekMonth: ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"],
      items: {
        "2019-03-05": [],
      },
      yearData: [{ value: '1955', }, { value: '1956', }, { value: '1957', }, { value: '1958', }, { value: '1959', }, { value: '1960', }, { value: '1961', }, { value: '1962', }, { value: '1963', }, { value: '1964', }
        , { value: '1965', }, { value: '1966', }, { value: '1967', }, { value: '1968', }, { value: '1969', }, { value: '1970', }, { value: '1971', }, { value: '1972', }, { value: '1973', }, { value: '1974', }, { value: '1975', }, { value: '1976', }, { value: '1976', }, { value: '1977', }
        , { value: '1978', }, { value: '1979', }, { value: '1980', }, { value: '1981', }, { value: '1982', }, { value: '1983', }, { value: '1984', }, { value: '1985', }, { value: '1986', }, { value: '1987', }, { value: '1988', }, { value: '1989', }, { value: '1990', }, { value: '1991', }
        , { value: '1992', }, { value: '1993', }, { value: '1994', }, { value: '1995', }, { value: '1996', }, { value: '1997', }, { value: '1998', }, { value: '1999', }, { value: '2000', }, { value: '2001', }, { value: '2002', }, { value: '2003', }, { value: '2004', }, { value: '2005', }
        , { value: '2006', }, { value: '2007', }, { value: '2008', }, { value: '2009', }, { value: '2010', }, { value: '2011', }, { value: '2012', }, { value: '2013', }, { value: '2014', }, { value: '2015', }, { value: '2016', }, { value: '2017', }, { value: '2018', }, { value: '2019', }
        , { value: '2020', }, { value: '2021', }, { value: '2022', }, { value: '2023', }, { value: '2024', }, { value: '2025', }, { value: '2026', }, { value: '2027', }, { value: '2028', }, { value: '2029', }, { value: '2030', }],
      data: [
        {
          value: 'January'
        },
        {
          value: 'February'
        },
        {
          value: 'March',
        },
        {
          value: 'April',
        },
        {
          value: 'May',
        },
        {
          value: 'June',
        },
        {
          value: 'July',
        }
        , {
          value: 'August',
        }
        , {
          value: 'September',
        }
        , {
          value: 'October',
        }
        , {
          value: 'November',
        }
        , {
          value: 'December',
        }
      ],
      //    this.setState({month:monthName})
      search: false,
      leaveList: [],
      drawerOpen: false,
      ReportTo: null,
      loaderVisible: false,
      clickDate: '',
      showDateOnWeek: '',
      showDateOnWeek1: '',
      renderWeekArray: [0, 1, 1, 1, 1, 1, 1],
      countDateShow: 0,
      dayDate: '',
      facilityList: [],
      show:false,
      uniqueValue: 1
    };
  }
  filterPoets = (arrayData, date, day, colIndex) => {
    this.setState({ selectedDate: 0 })
    this.setState({ loading: true })
    //alert(arrayData)
    let filteredPoets = arrayData
    filteredPoets = filteredPoets.filter((poet) => {
      let poetName = this.datTime(poet.TimeofDelivery)
      return poetName.indexOf(
        date) !== -1
    })

    this.setState({
      arrayDataShowSingleScreen: filteredPoets
    })
    this.setState(() => {
      this.state.activeDate.setDate(
        day
      )
    });
    var weekDays = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    var dayName = weekDays[colIndex]
    this.setState({ dayName: dayName })
    this.setState({ showOnLoad: 1 })
    // this.setState(
    //   () => {
    //     this.flatListRender();
    //   },{
    //   loading:false
    //   });

    setTimeout(() => { this.setState({ loading: false }) }
      , 4000)
  }
  closeDialog() {
    this.setState({ loading: false })
  }
  flatListRender() {
    return (

      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.state.arrayDataShowSingleScreen.length !== 0 ?
          <View>
            <Text style={{ fontSize: 22, color: 'blue', fontWeight: 'bold', marginLeft: '10%' }}>{this.state.activeDate.getDate()}</Text>
            <Text style={{ fontSize: 22, color: 'blue', fontWeight: 'bold', marginLeft: '8%' }}>{this.state.dayName}</Text>
          </View>
          : null}
        <FlatList
          data={this.state.arrayDataShowSingleScreen}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          style={{ marginTop: '-15%' }}
          renderItem={({ item, index }) =>
            <TouchableHighlight style={{ marginLeft: '30%' }} onPress={() => navigate.navigateTo(this.props.navigation, "JobDetail", { jobId: item.Job_ID, userId: this.props.userCredential.data.UserId })}>
              <View style={{ marginTop: 20, backgroundColor: item.Job_Status_Color, borderRadius: 5, marginRight: '5%', }}>
                <Text style={{ color: 'white', width: '90%', textAlign: 'center', fontSize: 15, marginLeft: 10, marginRight: 10 }}>{item.JobtypeCalName}</Text>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
  generateMatrix() {
    var weekDays = [
      "S", "M", "T", "W", "T", "F", "S"
    ];
    var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var matrix = [];
    // Create header
    matrix[0] = weekDays;
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = nDays[month];
    if (month == 1) { // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
    // More code here
  }
  datTime = (data) => {
    var NewText = data.replace("T00:00:00", "");
    return Moment(NewText).format('MM-DD-YYYY')
  }
  datTimeIndianReal = (data) => {
    return Moment(data).format('DD-MM-YYYY')
  }
  datTimeIndian = (data) => {

    return Moment(data).format('MM-DD-YYYY')
  }
  datTimeUS = (data) => {

    var datearray = data.split("-");

    var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
    this.setState({ clickDate: datearray[0] })
    this.setState(() => {
      this.state.activeDate.setMonth(
        Number(datearray[1] - 1)
      )
    });


    return newdate
  }
  datTimeUSOnWeekMinus = (data) => {

    var datearray = data.split("-");

    var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];

    return newdate
  }
  componentWillMount() {
    { this.allData() }
    this.setState({ dataShow: this.state.months[this.state.activeDate.getMonth()] })
  }

  allData() {
    this.setState({ loading: true })
    this.setState({ arrayDataShowSingleScreen: [] })
    var weekDays = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    var dayName = weekDays[new Date().getDay()]
    this.setState({ dayName: dayName })
    AsyncStorage.getItem('userCredential').then((valueData) => {
      this.setState({ user_id: JSON.parse(valueData).userid });
      //  alert(JSON.parse(valueData).userid)
      //  alert(this.state.activeDate.getMonth()+1)
      return fetch('http://gophorapi.demoappstore.com/api/vendor-schedule-surgery?vendorid=' + JSON.parse(valueData).userid + '&month=' + this.state.activeDate.getMonth() + 1 + '&year=' + this.state.activeDate.getFullYear(), {
        method: 'GET',
        headers: {
          'authentication': ''
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson))
          this.setState({ surgeryDataShow: responseJson.Data.surgery });
          this.setState({ facilityList: responseJson.Data.facility });
          this.state.surgeryDataShow.map((row, rowIndex) => {
            this.state.arrayDateData.push(this.datTime(row.datesurgery))
          });
          this.setState({ arrayDateDataShow: this.state.arrayDateData })
          this.setState({
            loading: false
          })
          console.log('surgeryDataShow', this.state.surgeryDataShow)
          console.log('facilityList', this.state.facilityList)
          // console.log('facilityList', this.state.facilityList)
          // console.log('arrayDateDataShow', this.state.arrayDateDataShow)
        })

        .catch((error) => {
          console.error(error);
        });
    });
  }
  clickDate = (item, date, date1) => {
    this.setState({ clickDate: item })
    this.setState({ showDateOnWeek: date })
    this.setState({ showDateOnWeek1: date1 })
    var new_date1 = moment(date1, "DD-MM-YYYY");
    var a = new Date(new_date1);
    weekDataChangeDay = date1
    this.setState({ dayDate: this.removeGmt(a.toString()) })
    this.setState({ dataShow: date })
    this.setState({ clickDataShow: 3 })
  }

  abbrebation = (data) => {
    var abbr = data.split(' ').map(function (item) { return item[0] }).join('');
    return abbr
  }
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    })
    );
  }
  renderWeekData() {
    var month = this.state.weekMonth[this.state.activeDate.getMonth()]
    var dateValue = this.state.clickDate
    var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month1 = this.state.activeDate.getMonth() + 1;
    return (
      this.state.renderWeekArray.map((item) => {
        if (dateValue.toString().length === 1) {
          var date2 = (this.state.activeDate.getMonth() + 1) + "-" + "0" + dateValue + "-" + this.state.activeDate.getFullYear()
        }
        if (month1.toString().length === 1) {
          var date2 = "0" + (this.state.activeDate.getMonth()) + "-" + dateValue + "-" + this.state.activeDate.getFullYear()
        }
        if (month1.toString().length === 1 && dateValue.toString().length === 1) {
          var date2 = "0" + (this.state.activeDate.getMonth()) + "-" + "0" + dateValue + "-" + this.state.activeDate.getFullYear()
        }
        if (month1.toString().length !== 1 && dateValue.toString().length !== 1) {
          var date2 = (this.state.activeDate.getMonth() + 1) + "-" + dateValue + "-" + this.state.activeDate.getFullYear()
        }

        if (dateValue.toString().length === 1) {
          var dateCheck = this.state.activeDate.getFullYear() + "-" + (this.state.activeDate.getMonth() + 1) + "-" + "0" + dateValue
        }
        if (month1.toString().length === 1) {
          var dateCheck = this.state.activeDate.getFullYear() + "-" + "0" + (this.state.activeDate.getMonth() + 1) + "-" + dateValue
        }
        if (month1.toString().length === 1 && dateValue.toString().length === 1) {
          var dateCheck = this.state.activeDate.getFullYear() + "-" + "0" + (this.state.activeDate.getMonth() + 1) + "-" + "0" + dateValue
        }
        if (month1.toString().length !== 1 && dateValue.toString().length !== 1) {
          var dateCheck = this.state.activeDate.getFullYear() + "-" + (this.state.activeDate.getMonth() + 1) + "-" + dateValue
        }
        var month2 = this.state.activeDate.getMonth();
        var maxDays1 = nDays[month2];
        var date = new Date(dateCheck)
        let weekdayCheck = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let weekday = weekdayCheck[date.getDay()]
        if (dateValue === maxDays1) {
          counter++
        }
        else {
          if (counter > 0) {
            month = this.state.weekMonth[this.state.activeDate.getMonth() + 1];
            dateValue = 1
            counter = 0
          }
        }
        return (
          <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row' }}>
            <View style={{ width: 100, height: 70, padding: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: "center", backgroundColor: 'white', borderWidth: 1, borderColor: '#6f7581', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
              <Text>{month} {dateValue.length === 1 ? "0" + dateValue++ : dateValue++}</Text>
              <Text style={{ color: '#0e707e' }}>{weekday}</Text>
            </View>
            <View style={{ width: 200, height: 70, marginLeft: 7, padding: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: '#0e707e' }}>09:30 AM</Text>
                  <View style={{ marginLeft: 20, backgroundColor: '#f7afb4', borderRadius: 30, width: 80 }}>
                    <Text style={{ marginLeft: 20 }}>cmc</Text>
                  </View>
                </View>
                <Text>Rasmuss, Linda, MD</Text>
              </View>
            {/* {this.state.arrayDateDataShow.indexOf(date2) > -1 ? this.state.surgeryDataShow.map((item1, colIndex)
            => {  
              return (
              <View style={{ width: 200, height: 70, marginLeft: 7, padding: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: '#0e707e' }}>{item1.surgerytime}</Text>
                  <View style={{ marginLeft: 20, backgroundColor: '#f7afb4', borderRadius: 30, width: 80 }}>
                    <Text style={{ marginLeft: 20 }}>cmc</Text>
                  </View>
                </View>
                <Text>{item1.surgname}</Text>
              </View>
              )
            }):''} */}
            <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: "center", }}>
              <Image style={{ transform: [{ rotate: '180deg' }] }}
                source={require('../../assets/images/grp.png')} />
            </View>
          </View>
        )
      })
    );
  }

  // renderWeek() {
  //   return (
  //     this.state.surgeryDataShow.map((item) => {    
  //       return (
  //         <View style={{ width: 200, height: 70, marginLeft: 7, padding: 5, borderRadius: 10 }}>
  //             <View style={{ flexDirection: 'row', marginBottom: 10 }}>
  //               <Text style={{ color: '#0e707e' }}>09:30 AM</Text>
  //               <View style={{ marginLeft: 20, backgroundColor: '#f7afb4', borderRadius: 30, width: 80 }}>
  //                 <Text style={{ marginLeft: 20 }}>cmc</Text>
  //               </View>
  //             </View>
  //             <Text>{item.surgname}</Text>
  //           </View>
  //       )
  //       // }
  //     })
  //   );
  // }

  renderFacilityList() {

    return (
      this.state.facilityList.map((item) => {
        var abbr = item.facilityname.split(' ').map(function (item) { return item[0] }).join('');
        return (
          <View style={{ marginTop: '0%', flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: item.color, height:20, borderRadius:15, borderWidth:1, borderColor:'#00ff00',  marginLeft: '6%', width: '20%', marginTop: 35,textAlign: 'center',textAlignVertical: 'center', paddingTop: 0, }}>
              <Text style={{color: '#034660', fontSize: 14,textAlign: 'center',}}>{abbr}</Text>
            </TouchableOpacity>
            <View style={{height:20, marginLeft:10 , marginTop: 35,}}>
              <Text style={{color: 'black', fontSize: 14}}>{item.facilityname}</Text>
            </View>
         </View>
        )
      })
    );
  }
  addNewProductRequest = () => {
    navigate.navigateTo(this.props.navigation, 'NewProductRequest')
  }

  surgeryListClick = (surgeryidData) => {
    navigate.navigateTo(this.props.navigation, 'SurgeryDetail', { surgeryDetails: this.state.surgeryDataShow, surgeryid: surgeryidData })
  }
  renderDayData() {
    return (
      this.state.surgeryDataShow.map((item) => {
        // if(this.state.dataShow===this.datTime(item.datesurgery)){     
        return (
          //       <TouchableOpacity onPress={()=>this.surgeryListClick(item.surgeryid)}>
          //       <View style={{flexDirection:'row'}}>
          //         <Text style={{color:'white',fontSize:12,borderRadius:3,marginLeft:'0%',width:'40%',backgroundColor:'#241722',height:'100%'
          //       ,borderColor:'white',borderWidth: 1,paddingLeft:10,paddingTop:5}}>
          //         <Text style={{color:'white',fontSize:10,borderRadius:3,marginLeft:'1%',width:'9%',marginTop:"10%",backgroundColor:'#EA781B',marginBottom:0,borderColor:'white',borderWidth: 1,height:'50%'}}>{item.facilityname}</Text>
          //         {'\n'}{item.surgerytime} {item.surgname} {item.facilityname}{'\n'}</Text>
          //         <Text  style={{color:'white',fontSize:12,borderRadius:3,marginLeft:'0%',width:'60%',backgroundColor:'#241722'
          //       ,textAlignVertical:'center',textAlign:'center',alignContent:'center',borderColor:'white',borderWidth: 1}}> <Image
          //       style={{ height: 12, width: 12,marginLeft:0,paddingTop:10  }}
          //       source={require('../../assets/correct.png')}
          //       resizeMode='contain'
          //     />Available</Text>
          //   </View> 
          // </TouchableOpacity>
          <TouchableOpacity onPress={() => this.surgeryListClick(item.surgeryid)}>
            <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', backgroundColor: '#e0e5e7' }}>
              <View style={{ width: 150, height: 90, padding: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: "center", backgroundColor: 'white', borderWidth: 1, borderColor: '#0e707e', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: '#0e707e', fontSize: 13 }}>{item.surgerytime}</Text>
                  <View style={{ marginLeft: 15, backgroundColor: '#f7afb4', borderRadius: 30, width: 50 }}>
                    <Text style={{ marginLeft: 10, fontSize: 13 }}>cmc</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 15 }}>{item.surgname}</Text>
              </View>
              <View style={{ width: 150, height: 70, marginLeft: 7, padding: 5, borderRadius: 10, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: "center" }}>
                <Text style={{ color: '#4e7498' }}>{item.procname}</Text>
              </View>
              <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: "center", }}>
                <Image style={{ width: 25, height: 25 }}
                  source={require('../../assets/images/tik.png')} />
              </View>
            </View>
          </TouchableOpacity>
        )
        // }
      })
    );
  }

  dataRender() {
    if (this.state.clickDataShow === 1) {
      var matrix = this.generateMatrix();
      //alert(this.state.arrayDateDataShow)
      var rows = matrix.map((row, rowIndex) => {
        var rowItems = row.map((item, colIndex) => {

          var date, date1;
          var currentMonth = this.state.activeDate.getMonth() + 1
          if (item.toString().length === 1) {
            var date = (this.state.activeDate.getMonth() + 1) + "-" + "0" + item + "-" + this.state.activeDate.getFullYear()
          }
          if (currentMonth.toString().length === 1) {
            var date = "0" + (this.state.activeDate.getMonth()) + "-" + item + "-" + this.state.activeDate.getFullYear()
          }
          if (currentMonth.toString().length === 1 && item.toString().length === 1) {
            var date = "0" + (this.state.activeDate.getMonth()) + "-" + "0" + item + "-" + this.state.activeDate.getFullYear()
          }
          if (currentMonth.toString().length !== 1 && item.toString().length !== 1) {
            var date = (this.state.activeDate.getMonth() + 1) + "-" + item + "-" + this.state.activeDate.getFullYear()
          }
          if (item.toString().length === 1) {
            var date1 = "0" + item + "-" + (this.state.activeDate.getMonth() + 1) + "-" + this.state.activeDate.getFullYear()
          }
          if (currentMonth.toString().length === 1) {
            var date1 = item + "-" + "0" + (this.state.activeDate.getMonth()) + "-" + this.state.activeDate.getFullYear()
          }
          if (currentMonth.toString().length === 1 && item.toString().length === 1) {
            var date1 = "0" + item + "-" + "0" + (this.state.activeDate.getMonth()) + "-" + this.state.activeDate.getFullYear()
          }
          if (currentMonth.toString().length !== 1 && item.toString().length !== 1) {
            var date1 = item + "-" + (this.state.activeDate.getMonth() + 1) + "-" + this.state.activeDate.getFullYear()
          }
          console.log(date)
          // console.log("ddddaaaaaaaaaaaaaaaaaaaaaaaaaa===>",this.state.arrayData);
          //{alert("dataaaaaass==>",this.state.arrayData)}
          if (item === 'S' || item === 'M' || item === 'T' || item === 'W' || item === 'T' || item === 'F' || item === 'S') {
            return (

              <TouchableHighlight style={{
                flex: 1,
                flexDirection: 'row',
                height: '100%',
                width: '100%',
                marginTop: 5,
                textAlign: 'center',
                backgroundColor: '#c9eaf5',
                padding:15,
                // borderWidth: 1,
                // borderColor: 'black',
                // borderStyle: 'dashed'
              }}
              >

                <RN.View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    
                  }}
                >

                  <RN.View style={{ height: '50%', width: '100%', }}>
                    <RN.Text
                      style={{
                        flex: 1,
                        height: '200%',
                        width: '100%',
                        marginLeft: '27%',
                        fontSize: 12,
                        color: item == this.state.activeDate.getDate() ? '#083e6f' : '#083e6f',
                        fontWeight: item == this.state.activeDate.getDate() ? 'bold' : ''
                      }}
                    >
                      {item != -1 ? item : ''}
                    </RN.Text>
                  </RN.View>

                  {

                    this.state.arrayDateDataShow.indexOf(date) > -1 ?
                      <RN.View
                        style={{
                          height: '350%',
                          width: '1600%',
                        }}

                      >
                        <RN.Text style={{ color: '#7aa1bd', width: '1600%', height: '60%', fontSize: 9 }} ></RN.Text>
                      </RN.View>
                      : null}
                </RN.View>
              </TouchableHighlight>
            );
          }
          else {
            return (
              item !== -1 ?
                <TouchableHighlight style={{
                  flex: 1,
                  //flexDirection: 'row',
                  height: '100%',
                  width: '100%',
                  textAlign: 'right',
                //  borderWidth: 1,
                //   borderColor: 'black',
                //   borderStyle: 'dashed',
                  padding:7,
                  //marginRight:10
                }}
                  onPress={() => this.clickDate(item, date, date1)}
                >
                  <RN.View
                    style={{
                      //flexDirection: 'row',
                      height: '100%',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
 
                      <RN.Text
                        style={{
                          flex: 1,
                          height: '100%',
                          width: '100%',
                          color: this.state.clickDate === item ? 'yellow' : '#6f7581',
                          marginLeft: '20%',
                          fontWeight: item == this.state.activeDate.getDate() ? this.state.selectedDate === 0 ? 'bold' : '' : ''
                        }}
                      >
                        {item != -1 ? item.toString().length === 1 ? '  ' + item : item : ''}
                      </RN.Text>
                    {
                      this.state.arrayDateDataShow.indexOf(date) > -1 ?
                        <RN.View
                          style={{
                            height: '50%',
                            width: '80%',
                            marginLeft: '10%',
                            marginTop: '-30%',
                            // Highlight header
                            backgroundColor: '#6f7581'
                          }}
                        >
                          <RN.Text style={{
                            color: '#6f7581', width: '100%', backgroundColor: '#6f7581',
                            height: '100%', fontSize: 12, alignSelf: 'center', textAlignVertical: 'center', textAlign: 'center'
                          }}>
                            {this.state.surgeryDataShow.map((item1, colIndex) => {
                              //  var result = this.state.arrayData.filter(i => this.datTime(item1.TimeofDelivery) === date).length;
                              //console.log("datatrtattttttttttttttttttttaaaaaaaaaaaa>=====",item1);

                              // {this.datTime(item1.TimeofDelivery).indexOf(date)>-1?this.state.matchingCount++:this.state.matchingCount}
                              return (
                                <RN.Text style={{
                                  color: '#6f7581', width: '100%', backgroundColor: item1.Job_Status_Color,
                                  height: '100%', fontSize: 10
                                }} >
                                  {this.datTime(item1.datesurgery).indexOf(date) > -1 ? item1.surgname : ''}
                                </RN.Text>
                              )
                            })}
                          </RN.Text>
                        </RN.View>
                        : <RN.View
                          style={{
                            height: '0%',
                            width: '0%',
                            marginLeft: '20%',
                            backgroundColor: '#241722',
                          }}
                        >

                          <RN.Text style={{
                            color: 'white', width: '0%', backgroundColor: '#241722',
                            height: '0%', fontSize: 12, alignSelf: 'center', textAlignVertical: 'center', textAlign: 'center'
                          }}>
                          </RN.Text>
                        </RN.View>}
                  </RN.View>
                </TouchableHighlight>
                : 
                <TouchableHighlight style={{
                  flex: 1,
                  flexDirection: 'row',
                  height: '115%',
                  width: '100%',
                  textAlign: 'right',
                  // borderWidth: 1,
                  // borderColor: 'black',
                  // borderStyle: 'dashed'
                }}
                >
                  <RN.View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      height: '100%',
                      width: '100%',
                      textAlign: 'right',
                    }}
                  >

                    <RN.View style={{
                      height: '150%',
                      width: '50%', alignItems: 'center', alignContent: 'center',
                    }}>
                      {/* <RN.Text
                        style={{
                          flex: 1,
                          height: '200%',
                          width: '100%',
                          textAlign: 'right',
                          color: item == this.state.activeDate.getDate() ? this.state.selectedDate === 0 ? 'white' : 'white' : 'white',
                          // Highlight current date
                          fontWeight: item == this.state.activeDate.getDate() ? this.state.selectedDate === 0 ? 'bold' : '' : ''
                        }}
                      >
                        {item != -1 ? '' : ''}
                      </RN.Text> */}
                    </RN.View>
                    {
                      this.state.arrayDateDataShow.indexOf(date) > -1 ?
                        <RN.View
                          style={{
                            height: '350%',
                            width: '1600%',
                            backgroundColor: this.state.arrayDateDataShow.indexOf(date) > -1 ? '#241722' : '#241722',
                          }}
                        >
                          <RN.Text style={{
                            color: 'white', width: '1600%',
                            height: '60%', fontSize: 9
                          }}>

                            <RN.Text style={{
                              color: 'white', width: '200%', backgroundColor: 'blue',
                              height: '20%', fontSize: 12
                            }}>
                              {item === 10 || 13 || 19 ? '' : ''}
                            </RN.Text>
                            })}
                         </RN.Text>
                        </RN.View>
                        : null}
                  </RN.View>
                </TouchableHighlight>
            );
          }
        });
        return (
          <RN.View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 0,
              justifyContent: 'space-around',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'black',
              borderStyle: 'dashed',
            }}>
            {rowItems}
          </RN.View>
        );
      });
      return rows
    }
    else if (this.state.clickDataShow === 2) {
      return (
        this.renderWeekData()
      );
    }
    else if (this.state.clickDataShow === 3) {
      return (
        <View>
          {/* <View style={{marginTop:'0%',flexDirection:'row'}}>
        <Text style={{color:'white',fontSize:16,borderRadius:3,marginLeft:'0%',width:'40%',marginTop:0,backgroundColor:'#241722'
        ,textAlign:'center',alignContent:'center',borderColor:'white',borderWidth: 1,textAlignVertical:'center',height:'100%'}}>{this.state.dayDate}</Text>
        <Text  style={{color:'white',fontSize:16,borderRadius:3,marginLeft:'0%',width:'60%',marginTop:0,backgroundColor:'#241722'
        ,textAlignVertical:'center',textAlign:'center',alignContent:'center',borderColor:'white',borderWidth: 1}}></Text> 
      </View>  */}
          {this.renderDayData()}
        </View>
      );
    }
  }
  renderRow() {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }} /> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
      </View>
    );
  }
  removeGmt(data) {
    var returnDate = data.replace(" 00:00:00 GMT+0530 (IST)", "")
    return returnDate
  }
  changeData(data) {
    if (this.state.showDateOnWeek1 === "") {
      alert("Please Select Any Date")
    }
    else {
      if (data === "1") {
        var new_date1 = moment(this.state.showDateOnWeek1, "DD-MM-YYYY");
        var a = new Date(new_date1);
        this.setState({ dayDate: this.removeGmt(a.toString()) })
        this.setState({ dataShow: this.state.months[this.state.activeDate.getMonth()] })
        this.setState({ clickDataShow: 1 })
      }
      else if (data === "2") {
        var new_date1 = moment(this.state.showDateOnWeek1, "DD-MM-YYYY");
        var a = new Date(new_date1);
        this.setState({ dayDate: this.removeGmt(a.toString()) })
        var new_date = moment(this.state.showDateOnWeek1, "DD-MM-YYYY");
        new_date.add(6, 'days');
        var newDate = new Date(new_date)
        weekDataChange = this.datTimeIndianReal(newDate)
        newDate = this.datTimeIndian(newDate)
        this.setState({ dataShow: this.state.showDateOnWeek + " - " + newDate })
        this.setState({ clickDataShow: 2 })
      }
      else if (data === "3") {
        this.setState({ dataShow: this.state.showDateOnWeek })
        this.setState({ clickDataShow: 3 })
      }
    }
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  render() {
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'yellow', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: '#6f7581' };
    let newDaysObject = {};
    markeddates.forEach((day) => {
      newDaysObject = {
        ...newDaysObject,
        [day]: { dots: [vacation, massage, workout] }
      };
    });
    const data = [1, 2, 3, 4, 5];
    return (
      <ImageBackground style={styles.container}
        source={require('../../assets/images/Log-In.png')}
      >
        <StatusBar
          hidden={true}
        />
        {!this.state.drawerOpen ?
          <Header
            showFilterIcon
            headerText={"Calender"}
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
          <Header
            showFilterIcon
            showBackButton={true}
            headerText={"Calender"}
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
          <ScrollView style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ marginTop: '0%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#0e707e', width: '100%' }}>
                <TouchableOpacity onPress={() => this.changeData("1")} style={{
                  borderBottomWidth:this.state.clickDataShow === 1 ? 4:0, borderBottomColor: '#0e707e',  width: '25%', marginTop: 30, marginBottom: 10,  height: '60%',marginLeft: '5%', paddingTop: 11}}>
                    <Text style={{color: this.state.clickDataShow === 1 ? '#0e707e' : 'black', fontSize: 20, borderRadius: 3, textAlign: 'center', alignContent: 'center',textAlignVertical: 'center',}}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeData("2")} style={{
                  borderBottomWidth:this.state.clickDataShow === 2 ? 4:0, borderBottomColor: '#0e707e',  width: '25%', marginTop: 30, marginBottom: 10,  height: '60%',marginLeft: '5%', paddingTop: 11}}>
                    <Text style={{color: this.state.clickDataShow === 2 ? '#0e707e' : 'black', fontSize: 20, borderRadius: 3, textAlign: 'center', alignContent: 'center',textAlignVertical: 'center',}}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeData("3")} style={{
                  borderBottomWidth:this.state.clickDataShow === 3 ? 4:0, borderBottomColor: '#0e707e',  width: '25%', marginTop: 30, marginBottom: 10,  height: '60%',marginLeft: '5%', paddingTop: 11}}>
                    <Text style={{color: this.state.clickDataShow === 3 ? '#0e707e' : 'black', fontSize: 20, borderRadius: 3, textAlign: 'center', alignContent: 'center',textAlignVertical: 'center',}}>Day</Text>
                </TouchableOpacity>
              </View>
              {this.state.clickDataShow === 1 || this.state.clickDataShow === 3 ? <View style={{ marginTop: '5%', flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity onPress={this.changeMonthMinus.bind()}>
                  <Image
                    style={{ height: 20, width: 30, marginTop: 33, marginLeft: 20 }}
                    source={require('../../assets/images/grp.png')}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <Text style={{
                  color: '#6f7581', fontSize: 20, borderRadius: 3, marginLeft: this.state.clickDataShow === 2 ? '5%' : '18%', width: this.state.clickDataShow === 2 ? '65%' : '25%', marginTop: 30
                  , textAlignVertical: 'center', textAlign: 'center', alignContent: 'center', marginBottom: 10
                }}>{this.state.dataShow}</Text>
                <TouchableOpacity onPress={this.changeMonthPlus.bind()} style={{ height: 20, width: 30, marginTop: 33, marginLeft: this.state.clickDataShow === 2 ? '3%' : '19%' }}>
                  <Image
                    style={{ height: '100%', width: '100%', transform: [{ rotate: '180deg' }] }}
                    source={require('../../assets/images/grp.png')}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View> : null}
            </View>
            <View style={{ marginLeft: '5%', marginTop: 25, marginRight: '5%' }}>
              {this.dataRender()}
            </View>
            <TouchableOpacity onPress={this.ShowHideComponent} style={{backgroundColor:'#e1eaed', width:'90%', borderRadius:10, marginLeft:6, marginTop:10, padding:15, alignItems:'center', alignSelf:'center', alignContent:'center'}}>
              <Text style={{color:'#5a5d61', fontSize:18}}>Select Faciloties</Text>
            </TouchableOpacity>
            {this.state.show ? (
              <View>
                {this.state.activeDate.getMonth() === 11 && this.state.activeDate.getFullYear() === 2019 ? this.renderFacilityList() : null}
              </View>
          ) : null}
          </ScrollView>
        </Drawer>
      </ImageBackground>
    );
  }
  weekDataChangePlus = () => {
    var new_date = moment(weekDataChange, "DD-MM-YYYY");
    new_date.add(6, 'days');
    var newDate = new Date(new_date)
    var indianFormat = this.datTimeIndianReal(newDate)
    newDate = this.datTimeIndian(newDate)
    this.setState({ dataShow: this.datTimeUS(weekDataChange) + " - " + newDate })
    weekDataChange = indianFormat
  }
  weekDataChangeMinus = () => {
    var new_date = moment(weekDataChange, "DD-MM-YYYY");
    new_date.subtract(6, 'days');
    var newDate = new Date(new_date)
    var indianFormat = this.datTimeIndianReal(newDate)
    newDate = this.datTimeIndian(newDate)
    this.setState({ dataShow: this.datTimeUS(indianFormat) + " - " + this.datTimeUSOnWeekMinus(weekDataChange) })
    weekDataChange = indianFormat

  }
  daYDataChangePlus = () => {
    var new_date = moment(weekDataChangeDay, "DD-MM-YYYY");
    new_date.add(1, 'days');
    var newDate = new Date(new_date)
    var a = new Date(newDate);
    this.setState({ dayDate: this.removeGmt(a.toString()) })
    var indianFormat = this.datTimeIndianReal(newDate)
    newDate = this.datTimeIndian(newDate)
    this.setState({ dataShow: newDate })
    weekDataChangeDay = indianFormat


  }
  daYDataChangeMinus = () => {
    var new_date = moment(weekDataChangeDay, "DD-MM-YY YY");
    new_date.subtract(1, 'days');
    var newDate = new Date(new_date)
    var a = new Date(newDate);
    this.setState({ dayDate: this.removeGmt(a.toString()) })
    var indianFormat = this.datTimeIndianReal(newDate)
    newDate = this.datTimeIndian(newDate)
    this.setState({ dataShow: newDate })
    weekDataChangeDay = indianFormat
  }
  changeMonthPlus = () => {
    if (this.state.clickDataShow === 2) {
      this.weekDataChangePlus()
    }
    else if (this.state.clickDataShow === 3) {
      this.daYDataChangePlus()
    }
    else if (this.state.clickDataShow === 1) {
      this.setState(() => {
        this.state.activeDate.setMonth(
          Number(this.state.activeDate.getMonth()) + 1
        )
        this.setState({ dataShow: this.state.months[this.state.activeDate.getMonth()] })
        return this.state;
      });
      this.setState({ arrayDataShowSingleScreen: [] })
      this.setState({ showOnLoad: 0 })
      this.setState({ selectedDate: 1 })

    }
  }
  changeMonthMinus = () => {
    if (this.state.clickDataShow === 2) {
      this.weekDataChangeMinus()
    }
    else if (this.state.clickDataShow === 3) {
      this.daYDataChangeMinus()
    }
    else if (this.state.clickDataShow === 1) {
      this.setState(() => {
        this.state.activeDate.setMonth(
          Number(this.state.activeDate.getMonth()) - 1
        )
        this.setState({ dataShow: this.state.months[this.state.activeDate.getMonth()] })
        return this.state;
      });
      this.setState({ arrayDataShowSingleScreen: [] })
      this.setState({ showOnLoad: 0 })
      this.setState({ selectedDate: 1 })
    }
  }
  changeYear = (n) => {
    this.setState(() => {
      this.state.activeDate.setFullYear(
        n
      )
      return this.state;
    });
    this.setState({ arrayDataShowSingleScreen: [] })
    this.setState({ showOnLoad: 0 })
    this.setState({ selectedDate: 1 })
  }
  _onPress = (item, date, day, month, year) => {
    var weekDays = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    var colIndex = weekDays[item]
    navigate.navigateTo(this.props.navigation, "SurgeryCalendarDetail", { date: date, dateData: this.state.arrayData, day: day, month: month, year: year, dayName: colIndex });
    this.setState({ loading: false })
  };
  closeControlPanel = () => {
    showBackButton = true
    this.setState({ drawerOpen: false })
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }



  loadItems(day) {
    // Alert.alert('data  DAY ',JSON.stringify(day));

    this.props.dispatch({
      type: 'LOADER',
      payload: true,
    });
    const value = this.props.userCredential.data.UserID;

    var monthint = day.month;
    var yearint = day.year;

    fetch('http://fams.demoappstore.com/cardealer/LeaveCalender?month=' + monthint + '&year=' + yearint, {
      method: 'GET',
      headers: {
        'authentication': value,

      }

    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ ReportTo: responseJson.Data ? responseJson.Data : [] });
      // Data=this.state.ReportTo;

      this.setState({ ReportTo: this.state.ReportTo ? this.state.ReportTo : '' })
      //  Alert.alert("Calender Data", JSON.stringify(this.state.ReportTo))
      Data = this.state.ReportTo;
      Object.keys(responseJson.Data).forEach(function (key) {
        //var value = obj[key];
        markeddates.push(key);
        //markeddate_json[key] = '{dots: [vacation, massage, workout]}';

        // console.log(key + ':' + value);
      });
      //Alert.alert("Calender Data", JSON.stringify(markeddates))
    })
      .catch((error) => {
        //  Alert.alert("LEAVE DATA next", JSON.stringify(error))
        //you will get error here.
      });

    if (!Data[day.dateString]) {
      let newItems = {};
      newItems[day.dateString] = [];
      this.setState({
        items: newItems
      }, () => {
        console.log("Items => ", this.state.items);
      });
    } else {
      let data = {};
      data[day.dateString] = Data[day.dateString];
      this.setState({
        items: data
      }, () => {
        console.log("Items => ", this.state.items);
      });
    }
  }

  renderItem = (data) => {
    console.log("renderItem =>", data);
    let list = data.list.map((item, i) => {
      return <TouchableOpacity onPress={() => {
        if (item.Status === "Pending") {
        }
      }
      }><Text
        key={i} style={{ color: 'red' }}>{item.Name}   {item.Status}</Text>
      </TouchableOpacity>

    })
    return (
      <View style={[styles.item, { padding: 0, margin: 0 }]}>{list}</View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={[styles.item, { justifyContent: "center" }]}><Text> There is no Job</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    if (r1.name !== r2.name) { alert("row changed.") }
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 23,
    height: 23,
  },
  headerTabTextStyle:
  {
    color: 'white',
    fontSize: Common.fontSizeLarge,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  colStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: Common.deviceHeight / 13,
    borderBottomWidth: 3,
    borderBottomColor: '#00A659'
  },
  activityStyle: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    alignSelf: 'center',
  }

});

const mapStateToProps = state => ({
  userCredential: state.userCredential,
  notificationCount: state.notificationCount,
});

export default connect(mapStateToProps)(MyCustomCalendar);