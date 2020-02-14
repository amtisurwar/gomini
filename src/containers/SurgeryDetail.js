import React, { Component } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator, AsyncStorage,FlatList,Image
  ,TouchableHighlight,
  ImageBackground
} from 'react-native';
import navigate from '../component/navigate';
import Header from '../component/header';

import Common from '../common/common';
import { connect } from 'react-redux';
import Moment from 'moment';

import SurgeryDetailTextHeader from '../component/SurgeryDetailTextHeader';
var surgeryid,surgeryDetails;
class JobDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerId: '',
      loading: false,
     surgeryid:0,
    surgeryDetails:[],
    
      surgeryDetailsFiltered:[]
    

    }
  }

  componentWillMount() {
   this.setState({surgeryDetails:this.props.navigation.state.params.surgeryDetails})
   this.setState({surgeryid:this.props.navigation.state.params.surgeryid})
   surgeryid=this.props.navigation.state.params.surgeryid
   surgeryDetails=this.props.navigation.state.params.surgeryDetails
   {this.filterSurgery()}


  }
  filterSurgery = () => {

    let filteredSurgery = this.props.navigation.state.params.surgeryDetails.filter((item) => {
       
      return this.props.navigation.state.params.surgeryid===item.surgeryid
        })
    
    this.setState({
      surgeryDetailsFiltered:filteredSurgery
    }
   )

  }
  datTime=(data)=>{
    var NewText = data.replace("T00:00:00", "");
    return Moment(NewText).format('MM-DD-YYYY')
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
        <SurgeryDetailTextHeader 
          showBackButton={true}
          headerText={this.state.surgeryDetailsFiltered[0].facilityname}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
        />
        {this.state.surgeryDetailsFiltered.length>0?
        <View>
          {/* <View style={{flexDirection:'row'}}> */}
        <Text style={styles.heading} >Surgery Details :</Text>
        <Text style={styles.dataText} >{this.state.surgeryDetailsFiltered[0].surgeryname} </Text>
        {/* </View> */}
        <Text style={styles.dataText} >{this.datTime(this.state.surgeryDetailsFiltered[0].datesurgery)} {this.state.surgeryDetailsFiltered[0].surgerytime}</Text>
        <Text style={styles.dataText} >{this.state.surgeryDetailsFiltered[0].surgname} </Text>
        <Text style={styles.dataText} >Ox : {this.state.surgeryDetailsFiltered[0].oxname}</Text>
        <Text style={styles.dataText} >Proc : {this.state.surgeryDetailsFiltered[0].procname}</Text>
        <View style={styles.line}></View>
        <Text style={styles.heading} >Trimed Resources:</Text>
        <FlatList
             data={this.props.navigation.state.params.surgeryDetails[0].resource}
             showsVerticalScrollIndicator={false}
             extraData={this.state}

             renderItem={({item,index}) =>
             <TouchableHighlight style={{marginLeft:'5%'}} >
             <View style={{flexDirection:'row',marginTop:20,backgroundColor:item.Job_Status_Color,borderRadius:5,marginRight:'5%',}}>
             <Text style={{color:'white',width:'5%'
                 ,fontSize:15,marginLeft:7,marginRight:0}}>{++index}.</Text>
   <Text style={{color:'white',width:'50%'
                 ,fontSize:15,marginLeft:1,marginRight:10}}>{item.resourceitem}</Text>
               <Image
        style={{ height: 24, width: 24,marginLeft:'20%'  }}
        source={item.resource_available==="Yes"?require('../../assets/available.png'):require('../../assets/not_available.png')}
        resizeMode='contain'
      />
             </View>
              </TouchableHighlight>
             }
             keyExtractor={item => item.email}
           />
        
        <View style={styles.line}></View>
        <Text style={styles.heading} >Other Informations:</Text>
        <TouchableOpacity
          onPress={() => {
            navigate.navigateTo(this.props.navigation, "MessageDetail", { messageData: this.state.surgeryDetailsFiltered[0] })
          }}
          style={{ alignItems: 'center', marginTop: '10%',width:'60%',marginLeft:'20%' }}>
               <Text style={{color:'white',fontSize:16,borderRadius:3,marginLeft:'1%',width:'100%',marginTop:17,backgroundColor:'#3FC2F3'
              ,textAlign:'center',alignContent:'center',marginBottom:2,borderColor:'white',textAlignVertical:'center',height:30,paddingTop:6}}>Send Message</Text>
        </TouchableOpacity>
        </View>
        :null}
        {this.state.loading ? <ActivityIndicator
          style={styles.activityStyle}
          size="large"
          color={'#283541'}
        /> :
         null
        }
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  },
  icon: {
    width: 23,
    height: 23,
  },
  heading:{
    color:'#333',
    fontSize:20,
    //fontStyle:'bold',
    marginLeft:'6%',
    marginTop:'5%'
  },
  dataText:{
    color:'#333',
    fontSize:16,
    marginLeft:'5%',
    marginTop:'3%'
  },
  line:{
    height:2,
    backgroundColor:'#333',
    width:'100%',
    marginTop:'5%'
  }
});


const mapStateToProps = state => ({
  jobDetail: state.jobDetail
});

export default connect(mapStateToProps)(JobDetail);