import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Agenda} from 'react-native-calendars';
import Drawer from 'react-native-drawer';
import Common from '../common/common';
import Header from '../component/header';
import fetch from 'isomorphic-fetch';
import SideMenu from './SideMenu'
import Moment from 'moment';
import navigate from '../component/navigate';
import * as RN from 'react-native';
import CircleCheckBox, {LABEL_POSITION} from "react-native-circle-checkbox";
import {
  View,
  Image,
  StatusBar,
  ImageBackground,
  Text,
  NetInfo,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Modal, TouchableHighlight
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
let markeddate_json = { };
var markeddates=[];
let Data ={};
var date=''
 class MyCustomCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        month:new Date().getMonth() + 1,
        year:new Date().getFullYear(),
        dayName:'',
        activeDate: new Date(),
        user_id:'',
        arrayData:[],
        arrayDataShow:[],
        date:'',
       months : ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"],
      items: {
        "2019-03-05":[],
        

      },
      
      //    this.setState({month:monthName})
      search: false,
      loading:true,
      leaveList:[],
      drawerOpen: false,
      ReportTo:null,
      loaderVisible: false,
    };
   
  }
  generateMatrix() {
   
   var weekDays =[
      "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];
   var nDays=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
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
filterPoets = (arrayData) => {

  //alert(arrayData)
  let filteredPoets = arrayData
  filteredPoets = filteredPoets.filter((poet) => {
    let poetName = this.datTime(poet.TimeofDelivery)
    return poetName.indexOf(
      date) !== -1
  })
  
  this.setState({
    arrayDataShow:filteredPoets
  })

}


datTime=(data)=>{
  var NewText = data.replace("T00:00:00", "");
  return Moment(NewText).format('MM-DD-YYYY')
}
  componentWillMount(){
    date=this.props.navigation.state.params.date
    
    const arrayData=this.props.navigation.state.params.dateData
    this.setState({arrayData:arrayData});
    
    const day=this.props.navigation.state.params.day
    this.setState(() => {
      this.state.activeDate.setDate(
         day
      )
   
    });
    const dayName=this.props.navigation.state.params.dayName
    this.setState({dayName:dayName})
    //alert(dayName)
    const month=this.props.navigation.state.params.month
    this.setState(() => {
      this.state.activeDate.setMonth(
         month
      )
      
    });
    const year=this.props.navigation.state.params.year
    this.setState(() => {
      this.state.activeDate.setFullYear(
         year
      )
     
    });
    this.setState({
      loading: false
    })

   {this.filterPoets(arrayData)}
    
    
  }
  flatListRender(){
   // alert(this.state.arrayData)
    return(
      
        <View style={{flex:1,flexDirection:'column'}}>
      <Text style={{fontSize:22,color:'blue',fontWeight:'bold',marginLeft:'10%'}}>{this.state.activeDate.getDate()}</Text>
      <Text style={{fontSize:22,color:'blue',fontWeight:'bold',marginLeft:'8%'}}>{this.state.dayName}</Text>
     
      <FlatList
            data={this.state.arrayDataShow}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
style={{marginTop:'0%'}}
            renderItem={({item,index}) =>
            <View style={{marginTop:20,backgroundColor:item.Job_Status_Color,marginLeft:'30%',borderRadius:5,marginRight:'5%',}}>
  <TouchableOpacity >
  <Text style={{color:'white',width:'90%',textAlign:'center'
                ,fontSize:15,marginLeft:10,marginRight:10}}>{item.JobtypeCalName}</Text>
              </TouchableOpacity>
            </View>
            }
            keyExtractor={item => item.email}
          />
          </View>
      );
  }
  dataRender(){
    var matrix = this.generateMatrix();
   // alert(this.state.arrayData.length)
   var rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        
        return (
          <RN.View
            style={{
              flex: 1,
              flexDirection:'column',
              height: '100%',
              width: '100%',                   
              textAlign: 'left',
             
              backgroundColor: rowIndex == 0 ? '#fff' : '#fff',
              
              }}
            onPress={() => this._onPress(item,date)}>
          <RN.View
          style={{height: '100%',
          width: '100%',alignItems:'center',alignContent:'center',
          borderRadius:100,backgroundColor: item == this.state.activeDate.getDate() ? 'blue' : '#fff',}}
            >
              <RN.Text
            style={{
              flex: 1,
              height: '50%',
              width: '100%',
              textAlign: 'center',
              // Highlight header
              color: item == this.state.activeDate.getDate() ? 'white' : 'black',
              // Highlight current date
              fontWeight: item == this.state.activeDate.getDate() 
                                  ? 'bold': ''
              // Highlight current date
              
            }}
            onPress={() => this._onPress(item)}>
            {item != -1 ? item : ''}
          </RN.Text>
          </RN.View>
          
          </RN.View>
        );
     
    });
      return (
        <RN.View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {rowItems}
        </RN.View>
      );
    });
   
    return rows
  }
  handleChange = () => {
    
    
    if(this.state.allChecked){
      this.setState({ allChecked:false});
    }
    else{
      this.setState({ selfChecked:false});
      this.setState({ allChecked:true});
  
    }

  }
  handleChange2 = () => {
    
    if(this.state.selfChecked){
      this.setState({ selfChecked:false});
    }
    else{
      this.setState({ allChecked:false});
      this.setState({ selfChecked:true});
   
}}
   render () {
 
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'yellow', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};
    let newDaysObject = {};
    let data = [{
        value: 'January',
      }, {
        value: 'Febuary',
      }, {
        value: 'March',
      }
      , {
        value: 'April',
      }
      , {
        value: 'May',
      }
      , {
        value: 'June',
      }, {
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
    
    ];
    let yearData = [{value: '1955',}, {value: '1956',}, { value: '1957',}, { value: '1958',}, { value: '1959',}, {value: '1960',}, {value: '1961',}, {value: '1962',}, {value: '1961',}, {value: '1962',}, {value: '1963',}, {value: '1964',}
    
];
  
    markeddates.forEach((day) => {
      newDaysObject = {
        ...newDaysObject,
        [day]: {dots: [vacation, massage, workout]}
      };
    });

    return (
        <ImageBackground style={styles.container}
        source={require('../../assets/images/Log-In.png')}>
          <StatusBar
             hidden={true}
           />
           <Header
            showFilterIcon
            on_bell_icon_press={
              () => {
                navigate.navigateTo(this.props.navigation, 'Notification')
              }
            }
            onPress={() => {
              this.openControlPanel()
            }}
          />
          <Drawer
            open={this.state.drawerOpen}
            type="overlay"
            tapToClose={true}
            panOpenMask={0.2}
            panThreshold={0.25}
            ref={(ref) => { this.drawer = ref }}
            content={<SideMenu {...this.props} onDrawerItemClick={(val) => this.setState({ drawerOpen: val })} />}
            openDrawerOffset={0.2}
            onClose={() => this.closeControlPanel()} >
              <ScrollView style={{flex:1}}>
           <View style={{flex:1}}>
               <View style={{flexDirection:'row'}}>
           <Dropdown
           containerStyle={{width:'25%',marginLeft:'5%'}}
           label={this.state.months[this.state.activeDate.getMonth()]}
        data={data}
        labelFontSize={0}
      />
      <Dropdown
           containerStyle={{width:'20%'}}
           label={this.state.activeDate.getFullYear()}
        data={yearData}
        labelFontSize={0}
      />
       <Text style={{marginLeft:'5%',marginTop:35}}>Job For</Text>
       <CircleCheckBox
                checked={this.state.allChecked}
                onToggle={()=> this.handleChange()}
                labelPosition={LABEL_POSITION.RIGHT}
                label='All'
                
                styleCheckboxContainer={{marginLeft:'5%',marginTop:30}}
                innerColor="black"
                outerColor="black"
                styleLabel={{color:'#000',marginLeft:'1%'}}
              />
               <CircleCheckBox
                checked={this.state.selfChecked}
                onToggle={()=> this.handleChange2()}
                labelPosition={LABEL_POSITION.RIGHT}
                label='Self'
                styleCheckboxContainer={{marginLeft:'-2%',marginTop:30}}
                innerColor="black"
                outerColor="black"
                styleLabel={{color:'#000',marginLeft:'0%'}}
              />
      </View>
      
     {this.dataRender()}
     {this.state.arrayDataShow.length==0?
     <View>
     <Text style={{fontSize:22,color:'blue',fontWeight:'bold',marginLeft:'10%'}}>{this.state.activeDate.getDate()}</Text>
      
      <Text style={{fontSize:22,color:'blue',fontWeight:'bold',marginLeft:'9%'}}>{this.state.dayName}</Text>
      
      </View>
     :null}
           </View>
           <View style={{flex:1}}>
               <View style={{flexDirection:'column'}}>
           {this.flatListRender()}
           </View>
           </View>
           </ScrollView>
          </Drawer>
         
        </ImageBackground>
    );
   
  }
  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(
        this.state.activeDate.getMonth() + n
      )
      return this.state;
    });
}
  _onPress = (item) => {    
    this.setState(() => {
      if (!item.match && item != -1) {
        this.state.activeDate.setDate(item);
        return this.state;
      }
    });
};
  closeControlPanel = () => {
    this.setState({ drawerOpen: false})
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }
  


  loadItems(day) {
   // Alert.alert('data  DAY ',JSON.stringify(day));
   
      this.props.dispatch({
        type: 'LOADER',
        payload: true,
      });
      const value = this.props.userCredential.data.UserID;
     
  var monthint=day.month;
  var yearint=day.year;
  
      fetch('http://fams.demoappstore.com/cardealer/LeaveCalender?month='+monthint+'&year='+yearint, {
        method: 'GET',
        headers: {
            'authentication': value,
          
        }
        
    }).then((response) => response.json()).then((responseJson) => {
     // Alert.alert("LEAVE DATA next", JSON.stringify(responseJson.Data))
            // you'll get the response in responseJson
  
            this.setState({ReportTo:responseJson.Data?responseJson.Data:[]});
           // Data=this.state.ReportTo;
          
           this.setState({ReportTo:this.state.ReportTo?this.state.ReportTo:''})
          //  Alert.alert("Calender Data", JSON.stringify(this.state.ReportTo))
             Data=this.state.ReportTo;
            
  
         
             Object.keys(responseJson.Data).forEach(function(key){
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
  
  


    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = this.timeToString(time);
    //     if (!this.state.items[strTime]) {
    //       this.state.items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 5);
    //       for (let j = 0; j < numItems; j++) {
    //         this.state.items[strTime].push({
    //           name: 'Item for ' + strTime,
    //           height: Math.max(50, Math.floor(Math.random() * 150))
    //         });
    //       }
    //     }
    //   }
    //   //console.log(this.state.items);
    //   const newItems = {};
    //   Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    //   this.setState({
    //     items: newItems
    //   },()=>{
    //     console.log("Items => ",this.state.items);
    //   });
    // }, 1000);
   // console.log(`Load Items for ${day.year}-${day.month}`);  
    //day=> "{"year":2017,"month":10,"day":23,"timestamp":1508716800000,"dateString":"2017-10-23"}"
     
    if(!Data[day.dateString]){
      let newItems={};
      newItems[day.dateString]=[];
     this.setState({
        items: newItems
      },()=>{
        console.log("Items => ",this.state.items);
       // Alert.alert('data  IF',JSON.stringify(newItems));
      });
     }else{
       let data={};
       data[day.dateString]=Data[day.dateString];
      this.setState({
        items: data
      },()=>{
        console.log("Items => ",this.state.items);
      });
     }
  }

  renderItem=(data)=> {
    console.log("renderItem =>",data);
   // Alert.alert('data ',JSON.stringify(data));

   

   
    
     
    
    let list=data.list.map((item,i)=>{
     
      return <TouchableOpacity  onPress={()=> {

        if(item.Status==="Pending"){
        
        //nextProps
        }
        }
      }><Text 
      key={i} style={{color: 'red'}}>{item.Name}   {item.Status}</Text>
   </TouchableOpacity>
   
    })
    return (
      <View style={[styles.item,{padding:0,margin:0}]}>{list}</View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={[styles.item,{justifyContent:"center"}]}><Text> There is no Job</Text></View>
      // <View style={styles.emptyDate}><Text></Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    if(r1.name !== r2.name){alert("row changed.")}
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex:1,
//     paddingTop: 30
//   }
// });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff'
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