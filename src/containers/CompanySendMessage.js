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
      from:'vendor',
      to:'',
      cc:'',
      fromid:'',
      toid:'',
      ccid:0,
      fromtype:'',
      totype:'',
      cctype:0,
      subject:'',
      messageShow: 1,
      fromShow:1,
      toShow:1,
      ccShow:1,
      subjectShow:1,
      messageDetail:[]


    }
  }

  componentDidMount() {
  //  this.setState({messageDetail:JSON.stringify(this.props.navigation.state.params.messageData)})
   
   this.setState({toid:this.props.navigation.state.params.messageData.companyid})
   this.setState({totype:this.props.navigation.state.params.messageData.companytype})
   this.setState({to:this.props.navigation.state.params.messageData.name})
  //  this.setState({ccid:this.props.navigation.state.params.messageData.surgnid})
  //  this.setState({cctype:this.props.navigation.state.params.messageData.surgntype})
  //  this.setState({cc:this.props.navigation.state.params.messageData.surgname})
  
  // alert(this.props.navigation.state.params.messageData.from)
  };



  componentWillReceiveProps(nextProps) {

    debugger;
   // alert(JSON.stringify(nextProps.loginData))
    console.log(`recieving props ${nextProps}`);
   
      if (nextProps.loginData.login.StatusCode === 200) {
        this.props.dispatch({
          type: 'SET_USER_CREDENTIAL',
          payload: nextProps.loginData.login.Data
        });
        AsyncStorage.setItem('userCredential', JSON.stringify(nextProps.loginData.login.Data[0])).then(succes => {
          this.showToast('You are login successfully.');
          navigate.navigateWithReset(this.props.navigation, 'SurgeryCalendar')
          
        });
        
       
   
      }
      else {
        this.showToast('Invalid Username or Password');
      }
    
   
  }

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

  onButtonPress = () => {
    const { email, password } = this.state;
    const value = {
      "UserName": email,
      "Password": password,
      "Deviceid": "dsjkdsdsdsdsdbns",
      "RegId": "djsdbshgsdgvhsadvsaghddshvsdgsfdgsavdsagdsadhfsag",
      "RememberMe": "false"
    }
    console.log(value)
    if (email !== '' && password !== '') {
     
        if (this.state.internetConnectivity) {
          this.props.dispatch({
            type: 'USER_LOGIN',
            payload: value
          });
           
          this.setState({ loading: true })
        }
        else {
          this.showToast('No Internet Connection.');
        }
      
    }
    else {
      this.showToast('Enter Email id and Password.');
    }
 
  
  }

  onChangePassword() {
    if (emailRegex.test(this.state.email)) {
      this.setState({
        infoModalVisible: false,
        loading: true
      })
      console.log(this.state.email)
      const params = '?EmailId=' + this.state.email
      console.log(params)
      this.props.dispatch({
        type: 'FORGOT_PASSWORD',
        payload: params
      })
    }
    else {
      this.showToast('Enter valid email address.');
    }
  }
  sendMessageDataSave(){
  
    this.setState({loading:true})
   
    var requestData=
          { 
          "fromid":"10501",
          "fromtype":"4000",
          "toid":this.state.toid,
          "totype":this.state.totype,
          "ccid":this.state.ccid,
          "cctype":this.state.cctype,
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
       source={require('../../assets/images/Log-In.png')}
       style={{ marginTop: '0%',width:'100%',height:'100%' }}>
         <KeyboardAvoidingView style={{ marginTop: '0%',width:'100%',height:'100%' }}>
         <ScrollView contentContainerStyle={{ flex:1 }}
              >
        <StatusBar
          hidden={true}
        />
        <TextHeader
          showBackButton={true}
          headerText={"Send Message"}
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
      <Text style={styles.textStyle}>Subject :-</Text>

      <TextInput 
      onChangeText={(subject)=> {this.ValueChange(subject,"subject")}}
      style={styles.textInputStyle}
      >{this.state.subject}</TextInput>

      {this.state.subjectShow===0?<Text style={styles.errorStyle}>Please Enter Subject</Text>:null}
          <Text style={styles.textStyle}>To :-</Text>
          <TextInput 
            onChangeText={(to)=> {this.ValueChange(to,"to")}}
            style={styles.textInputStyle}
          >{this.state.to}</TextInput>
      {this.state.toShow===0?<Text style={styles.errorStyle}>Please Enter Email Id</Text>:null}
      <Text style={styles.textStyle}>Message :-</Text>
      <TextInput maxLength={260} multiline={true} onChangeText={(message)=> {this.ValueChange(message,"message")}} placeholderTextColor={"black"} placeholder={""} style={{color:'black',fontSize:16,borderRadius:3,marginLeft:10,marginRight:10,width:'95%',marginTop:10,
      borderColor:'black',borderWidth: 1,height:'30%',textAlignVertical: "top"}}>{this.state.message}</TextInput>
      {this.state.messageShow===0?<Text style={styles.errorStyle}>Please Enter Message</Text>:null}

      <View style={{flexDirection:'row',marginLeft:'8%',marginTop:'4%'}}>


      <TouchableOpacity
          onPress={() => {
            this.sendMessage()
          }}
          style={{ alignItems: 'center', marginTop: '10%',width:'40%',marginLeft:'0%' }}>
               <Text style={{color:'black',fontSize:16,borderRadius:3,marginLeft:'1%',width:'100%',marginTop:17,backgroundColor:'#3FC2F3'
              ,textAlign:'center',alignContent:'center',marginBottom:2,borderColor:'black',textAlignVertical:'center',height:30,paddingTop:6}}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate.navigateTo(this.props.navigation, "CompanyList")
          }}
          style={{ alignItems: 'center', marginTop: '10%',width:'40%',marginLeft:'10%' }}>
               <Text style={{color:'black',fontSize:16,borderRadius:3,marginLeft:'1%',width:'100%',marginTop:17,backgroundColor:'#FB0005'
              ,textAlign:'center',alignContent:'center',marginBottom:2,borderColor:'black',textAlignVertical:'center',height:30,paddingTop:6}}>Cancel</Text>
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
                    style={{backgroundColor:'black'}}
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
  },
  textInputStyle: {
    marginTop:'1%',
    fontSize:18,
    width: '100%', 
    color: 'black',
    borderBottomColor: 'black', // Add this to specify bottom border color
    borderBottomWidth: 2,
  },
  textStyle: {
 
    marginTop:'2%',
     fontSize:18,
     width: '100%', color: 'black'
     
     
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
    color:'black'
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