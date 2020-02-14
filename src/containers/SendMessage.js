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
import AutoComplete from 'react-native-autocomplete'
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      email: '',
      user_id:'',
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
      messageDetail:[],
      toAndCCData:[],
      toData:[],
      ccData:[],
      toList:[],
      ccList:[]


    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userCredential').then((valueData) => {
      this.setState({user_id:JSON.parse(valueData).userid});
{this.toAndCCData()}
    });
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


  sendMessageDataSave(){
  
    this.setState({loading:true})
   
    var requestData=
          {
              
              "fromid":this.state.user_id,
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
                  navigate.navigateTo(this.props.navigation, 'Messages')
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

      toAndCCData(){
  
        this.setState({loading:true})
       
        var requestData=
              {
                  
                  "vendorid":this.state.user_id,
              
    
      } 
                  
              return fetch('http://gophorapi.demoappstore.com/api/message-helper', {method: 'POST',
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
                   // alert(JSON.stringify(responseJson))
                   this.setState({toAndCCData:responseJson.Data})
                   this.setState({toData:responseJson.Data.to})
                   this.setState({ccData:responseJson.Data.cc})
                   responseJson.Data.to.map((row, rowIndex) => {
                   // this.state.toList.push(row.name)
                                });
                  responseJson.Data.cc.map((row, rowIndex) => {
                     // this.state.ccList.push(row.name)
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
  if(this.state.to.length===0||this.state.subject.length===0
    ||this.state.message.length===0){
   

   
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
    onTyping(text) {
      // const toData = this.state.toData.filter(item =>
      //   item.name.toLowerCase().startsWith(text.toLowerCase())
      // ).map(item => item.name);
    //  alert(this.state.toData)
      const toData = this.state.toData.filter((item) => {
     return item.name.indexOf(text)>-1
          }).map(function (item) {
            return item.name;
        });
         // alert(JSON.stringify(toData))
      this.setState({ toList : toData });
      }
  
    onSelect(value) {
      alert(value)
      this.setState({to:value})
      const toData = this.state.toData.filter((item) => {
        return item.name.indexOf(value)>-1
             }).map(function (item) {
              return item.name;
          });
  
    
      this.setState({ toid : toData[0].id });
      this.setState({ totype : toData[0].onwertype });
    }


    onTypingCC(text) {
      // const ccData = this.state.ccData.filter((item) =>
      //   item.name.toLowerCase().startsWith(text.toLowerCase())
      // ).map(item => item.name);
      const ccData = this.state.ccData.filter((item) => {
        return item.name.indexOf(text)>-1
             }).map(function (item) {
              return item.name;
          });
      this.setState({ ccList : ccData });
     }
  
    onSelectCC(value) {
      this.setState({cc:value})
      const ccData = this.state.ccData.filter((item) => {
        return item.name.indexOf(value)>-1
             }).map(function (item) {
              return item.name;
          });
  
      
      this.setState({ ccid : ccData[0].id });
      this.setState({ cctype : ccData[0].onwertype });
    }

  render() {
    return (
      
       <ImageBackground
       source={require('../../assets/images/Log-In.png')}
        style={{ marginTop: '0%',width:'100%',height:'100%',backgroundColor:'#241722' }}>
         <KeyboardAvoidingView style={{ marginTop: '0%',width:'100%',height:'100%',backgroundColor:'#241722' }}>
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
       
    <Text style={styles.textStyle}>Subject :-</Text>

    <TextInput 
    onChangeText={(subject)=> {this.ValueChange(subject,"subject")}}
    style={styles.textInputStyle}
    >{this.state.subject}</TextInput>

 {this.state.subjectShow===0?<Text style={styles.errorStyle}>Please Enter Subject</Text>:null}

      <Text style={styles.textStyle}>To :-</Text>
          <AutoComplete
          style={styles.autocomplete}
          suggestions={this.state.toList}
          onTyping={(value)=>this.onTyping(value)}
          onSelect={(value)=>this.onSelect(value)}
          contentContainerStyle={{borderBottomColor:'white'}}
          clearButtonMode="always"
          returnKeyType="go"
          clearTextOnFocus
          autoCompleteTableTopOffset={10}
          autoCompleteTableLeftOffset={20}
          autoCompleteTableSizeOffset={-40}
          autoCompleteTableBorderColor="lightblue"
          autoCompleteTableBackgroundColor="azure"
          autoCompleteTableCornerRadius={8}
          autoCompleteTableBorderWidth={1}
          autoCompleteFontSize={15}
          autoCompleteRegularFontName="Helvetica Neue"
          autoCompleteBoldFontName="Helvetica Bold"
          autoCompleteTableCellTextColor={"dimgray"}
          autoCompleteRowHeight={40}
          autoCompleteFetchRequestDelay={100}
          maximumNumberOfAutoCompleteRows={6}
        />

{this.state.toShow===0?<Text style={styles.errorStyle}>Please Enter Email Id</Text>:null}
<Text style={styles.textStyle}>CC :-</Text>
<AutoComplete
          style={styles.autocomplete}
          suggestions={this.state.ccList}
          onTyping={(value)=>this.onTypingCC(value)}
          onSelect={(value)=>this.onSelectCC(value)}
          clearButtonMode="always"
          returnKeyType="go"
          clearTextOnFocus
          autoCompleteTableTopOffset={10}
          autoCompleteTableLeftOffset={20}
          autoCompleteTableSizeOffset={-40}
          autoCompleteFontSize={15}
          autoCompleteRegularFontName="Helvetica Neue"
          autoCompleteBoldFontName="Helvetica Bold"
          autoCompleteRowHeight={40}
          autoCompleteFetchRequestDelay={100}
          maximumNumberOfAutoCompleteRows={6}
        />

    <Text style={styles.textStyle}>Message :-</Text>

    <TextInput  maxLength={260} multiline={true} onChangeText={(message)=> {this.ValueChange(message,"message")}} placeholderTextColor={"white"} placeholder={""} style={{color:'white',fontSize:16,borderRadius:3,marginLeft:10,marginRight:10,width:'95%',marginTop:10,backgroundColor:'#2C1D2B'
    ,borderColor:'white',borderWidth: 1,height:'30%',textAlignVertical: "top"}}>{this.state.message}</TextInput>
    {this.state.messageShow===0?<Text style={styles.errorStyle}>Please Enter Message</Text>:null}

    <View style={{flexDirection:'row',marginLeft:'8%',marginTop:'4%'}}>


    <TouchableOpacity
          onPress={() => {
            this.sendMessage()
          }}
          style={{ alignItems: 'center', marginTop: '10%',width:'40%',marginLeft:'0%' }}>
               <Text style={{color:'white',fontSize:16,borderRadius:3,marginLeft:'1%',width:'100%',marginTop:17,backgroundColor:'#3FC2F3'
              ,textAlign:'center',alignContent:'center',marginBottom:2,borderColor:'white',textAlignVertical:'center',height:30,paddingTop:6}}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate.navigateTo(this.props.navigation, "CompanyList")
          }}
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
    width: '100%', 
    color: 'white',
    borderBottomColor: 'white', // Add this to specify bottom border color
    borderBottomWidth: 2,
    
  },
  textStyle: {
    marginTop:'2%',
     fontSize:18,
     width: '100%', 
     color: 'white'
   },
   errorStyle:{
    color:'red',
    fontSize:12,
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
  },
  autocomplete: {
    height: 40,
    margin: 10,
    marginTop: 20,
    backgroundColor: "#241722",
    borderColor: "white",
    borderWidth: 1,
    color:'white'
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightblue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cellText: {
    flex: 1,
    marginLeft: 10
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
 
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