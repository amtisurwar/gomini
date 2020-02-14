import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Text,
  Image,
  NetInfo,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Row, Col,  CheckBox } from 'native-base';
import Background from '../component/background';
import Button from '../component/button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import navigate from '../component/navigate';
import InfoModal from '../component/info-modal';
import { connect } from 'react-redux';
import Common from '../common/common';
import background from '../component/background';
import TextHeader from '../component/TextHeader';
import Toast, {DURATION} from 'react-native-easy-toast'
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      F_name:null,
      infoModalVisible: false,
      internetConnectivity: false,
      checked:false,
      message: '',
      from:'',
      to:'',
      cc:'',
      fromid:0,
      toid:0,
      ccid:0, 
      fromtype:0,
      totype:0,
      cctype:0,
      subject:'',
      messageShow: 1,
      fromShow:1,
      toShow:1,
      ccShow:1,
      subjectShow:1,
      user_id:'',
      messageDetail:[],
      toDetailArray:[],
      toIdDetailArray:[],
      toTypeDetailArray:[],
      ccDetailArray:[]


    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userCredential').then((valueData) => {
      this.setState({user_id:JSON.parse(valueData).userid});

    });
   this.setState({messageDetail:JSON.stringify(this.props.navigation.state.params.messageData)})
      this.setState({fromid:this.props.navigation.state.params.messageData.fromid})
   this.setState({fromtype:this.props.navigation.state.params.messageData.fromtype})
   this.setState({from:this.props.navigation.state.params.messageData.fromname})
   this.setState({subject:this.props.navigation.state.params.messageData.subject})
   this.setState({message:this.props.navigation.state.params.messageData.comments})
   if(this.props.navigation.state.params.messageData.to.length>0){
    this.props.navigation.state.params.messageData.to.map((row, rowIndex) => {
      this.state.toDetailArray.push(row.toname)
      this.state.toIdDetailArray.push(row.toid)
      this.state.toTypeDetailArray.push(row.totype)
     let toData= this.convertArrayToString(this.state.toDetailArray)
     let toIdData= this.convertArrayToString(this.state.toIdDetailArray)
     let toTypeData= this.convertArrayToString(this.state.toTypeDetailArray)
     this.setState({to:toData})
     this.setState({toid:toIdData})
     this.setState({totype:toTypeData})

                  });
   }
   if(this.props.navigation.state.params.messageData.cc.length>0){
    this.props.navigation.state.params.messageData.cc.map((row, rowIndex) => {
      this.state.ccDetailArray.push(row.ccname)
                  });
  }


  //  this.setState({toid:this.props.navigation.state.params.messageData.facilityid})
  //  this.setState({totype:this.props.navigation.state.params.messageData.facilitytype})
  //  this.setState({to:this.props.navigation.state.params.messageData.facilityname})
  //  this.setState({ccid:this.props.navigation.state.params.messageData.surgnid})
  //  this.setState({cctype:this.props.navigation.state.params.messageData.surgntype})
  //  this.setState({cc:this.props.navigation.state.params.messageData.surgname})
  
  // alert(this.props.navigation.state.params.messageData.from)
  };



  componentWillUpdate(){
    console.log(this.props);
  }

  showToast(msg) {
    this.setState({ loading: false })
    Toast.show({
      text: msg,
      textStyle: styles.toasterStyle
    })
  }

  convertArrayToString=(data)=>{
    var string = data.join();
   // this.setState({to:string})
    return string
  }
  
  sendMessageDataSave(){
  
    this.setState({loading:true})
   
    var requestData=
          {
              
              "fromid":this.state.user_id,
          "fromtype":this.state.fromtype,
"toid":this.state.toid,
"totype":this.state.totype,
"ccid":0,
"cctype":0,
"subject":this.state.subject,
"message":this.state.message

  } 
              
          return fetch('http://gophorapi.demoappstore.com/api/message-request', {method: 'POST',
          headers: {
                    'authentication'  : '',
                    'content-type': 'application/json'
                    },
          body:JSON.stringify(requestData)
        })
            
            .then((response) => response.json())
            .then((responseJson) => {
            
         this.setState({loading:false})
  
   //
              if(responseJson.StatusCode===200){
                this.refs.toast.show('Message Sent Successfully', 1000, () => {
                  navigate.navigateTo(this.props.navigation, 'SurgeryCalendar')
              });
             
              
 }
              else if(responseJson.StatusCode===403){
                this.refs.toast.show('',DURATION.LENGTH_LONG);
               
              }
                
    
   
            })
            
            .catch((error) => {
              
                console.error(error);
            });
        
      }

 sendMessage=()=>{
  if(this.state.from.length===0||this.state.to.length===0||this.state.subject.length===0
    ||this.state.message.length===0){
   

    if(this.state.from.length===0){
      this.setState({fromShow:0})
    }
    if(this.state.to.length===0){
      this.setState({toShow:0})
    }
    
    if(this.state.subject.length===0){
      this.setState({subjectShow:0})
    }
    if(this.state.message.length===0){
      this.setState({messageShow:0})
    }
  }
  else{
    {this.sendMessageDataSave()}
  }

  }
  ValueChange=(value,type)=>{
    if(type==="from"){
    this.setState({from:value})
    this.setState({fromShow:1})
    }
    if(type==="to"){
      this.setState({to:value})
    this.setState({toShow:1})
    }
    if(type==="cc"){
      this.setState({cc:value})
    this.setState({ccShow:1})
    }
    if(type==="subject"){
      this.setState({subject:value})
    this.setState({subjectShow:1})
    }
    if(type==="message"){
      this.setState({message:value})
    this.setState({messageShow:1})
    }
   
    }
    
  render() {
    return (
      
       <ImageBackground
       source={require('../../assets/images/Log-In.png')} style={{ marginTop: '0%',width:'100%',height:'100%',backgroundColor:'#241722' }}>
         <KeyboardAvoidingView style={{ marginTop: '0%',width:'100%',height:'100%',backgroundColor:'#241722' }}>
         <ScrollView contentContainerStyle={{ flex:1 }}
              >
        <StatusBar
          hidden={true}
        />
        <TextHeader
          showBackButton={true}
        headerText={"Message Detail"}
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <View style={{ flex:1,height: 300, width: '90%',marginLeft: '5%',marginRight: '5%', marginTop: '5%',justifyContent:"space-evenly" }} >
        {/* <Text style={styles.textStyle}>From :-</Text>

            <TextInput 
            onChangeText={(from)=> {this.ValueChange(from,"from")}}
            style={styles.textInputStyle}
          >{this.state.from}</TextInput>
 {this.state.fromShow===0?<Text style={styles.errorStyle}>Please Enter Email Id</Text>:null} */}
  <Text style={styles.textStyle}>To :-</Text>

<TextInput 
 onChangeText={(to)=> {this.ValueChange(to,"to")}}
style={styles.textInputStyle}
>{this.convertArrayToString(this.state.toDetailArray)}</TextInput>
{this.state.toShow===0?<Text style={styles.errorStyle}>Please Enter Email Id</Text>:null}

 
         

<Text style={styles.textStyle}>CC :-</Text>

            <TextInput 
            onChangeText={(cc)=> {this.ValueChange(cc,"cc")}}
            style={styles.textInputStyle}
            >{this.convertArrayToString(this.state.ccDetailArray)}</TextInput>
 
 <Text style={styles.textStyle}>Subject :-</Text>

<TextInput 
onChangeText={(subject)=> {this.ValueChange(subject,"subject")}}
style={styles.textInputStyle}
>{this.state.subject}</TextInput>

 {this.state.subjectShow===0?<Text style={styles.errorStyle}>Please Enter Subject</Text>:null}
         

<Text style={styles.textStyle}>Message :-</Text>

<TextInput maxLength={260} multiline={true} onChangeText={(message)=> {this.ValueChange(message,"message")}} placeholderTextColor={"white"} placeholder={""} style={{color:'white',fontSize:16,borderRadius:3,marginLeft:10,marginRight:10,width:'95%',marginTop:10,backgroundColor:'#2C1D2B'
 ,borderColor:'white',borderWidth: 1,height:'30%',textAlignVertical: "top"}}>{this.state.message}</TextInput>
 {this.state.messageShow===0?<Text style={styles.errorStyle}>Please Enter Message</Text>:null}

 <View style={{flexDirection:'row',marginLeft:'8%',marginTop:'4%'}}>


        <TouchableOpacity onPress={() => { this.sendMessage()}} style={{ alignItems: 'center', marginTop: '10%',width:'40%',marginLeft:'0%' }}>
            <Text style={{color:'white',fontSize:16,borderRadius:3,marginLeft:'1%',width:'100%',marginTop:17,backgroundColor:'#3FC2F3'
              ,textAlign:'center',alignContent:'center',marginBottom:2,borderColor:'white',textAlignVertical:'center',height:30,paddingTop:6}}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigate.navigateTo(this.props.navigation, "Messages")}}
                style={{ alignItems: 'center', marginTop: '10%',width:'40%',marginLeft:'10%' }}>
           <Text style={{color:'white',fontSize:16,borderRadius:3,marginLeft:'1%',width:'100%',marginTop:17,backgroundColor:'#FB0005'
                ,textAlign:'center',alignContent:'center',marginBottom:2,borderColor:'white',textAlignVertical:'center',height:30,paddingTop:6}}>Cancel</Text>
        </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>

        {this.state.loading ? <ActivityIndicator
          style={styles.activityStyle}
          size="large"
          color={'#283541'}
        /> :
         null
        }
        <Toast
                    ref="toast"
                    style={{backgroundColor:'white'}}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'black'}}
                />
      </ImageBackground>
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  textInputStyle: {
 
   marginTop:'1%',
    fontSize:18,
    width: '100%', color: 'white'
    ,borderBottomColor: 'white', // Add this to specify bottom border color
    borderBottomWidth: 2,
    
  },
  textStyle: {
 
    marginTop:'2%',
     fontSize:18,
     width: '100%', color: 'white'
     
     
   },
   errorStyle:{
    color:'red',
    fontSize:12,
    //fontStyle:'bold',
    marginLeft:'2%',
    marginTop:'6%'
  },
  toasterStyle: {
    textAlign: 'center',
    fontSize: 18, 
    color:'white'
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  }
});

const mapStateToProps = state => ({
  loginData: state.loginData,
  registerUser: state.registerUser,
  forgotPassword: state.forgotPassword
});

export default connect(mapStateToProps)(Login);


// target 'Gophor-tvOS' do
//   # Comment the next line if you don't want to use dynamic frameworks
//   use_frameworks!

//   # Pods for Gophor-tvOS

//   target 'Gophor-tvOSTests' do
//     inherit! :search_paths
//     # Pods for testing
//   end

// end