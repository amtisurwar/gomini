import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Picker,
  StatusBar,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import navigate from '../component/navigate';
import Button from '../component/button';
import Header from '../component/header';
import Common from '../common/common';
import apiCaller from '../common/apiCaller';
import MultiSelect from 'react-native-multiple-select';
import { showToast } from '../common/globalFunction';

class Impulse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupJobScreen: true,
      password: '',
      loading: true,
      drawerOpen: false,
      selectedValue:undefined,
    selectedItems : [],
    items:[]

    }
  }

  componentDidMount() {
   const params= this.props.navigation.state.params;
      if(!params) return;
     apiCaller('getjobdetailsbyid?jobid=' + params.jobId, 'get', params.userId).then(success=>{
       console.log(success);
       if(success.Data && success.Data.jobldetails && success.Data.jobldetails.length){
         const impulse=success.Data.jobldetails[0].impulseDetail;
         if(impulse && impulse.length){
          this.setState({selectedItems:impulse.map(item=>{return item.ID})})  
         }
       }
        apiCaller('getimplselist','get', params.userId).then(list=>{
            if(list.StatusCode==="200"){
              this.setState({items:list.Data})
            }
            console.log(list);
            this.setState({loading:false});
        }).catch(error=>{
         showToast("Unable to fetch list.");
      this.setState({loading:false});
     })

       this.setState({loading:false});
     }).catch(error=>{
      showToast("Unable to fetch list.");
      console.log(error);
      this.setState({loading:false});
     })
  }


  render() {
    return (
      <View
        style={styles.container}
      >
        <StatusBar
          hidden={true}
        />
        <Header
          showBackButton={true}
          on_bell_icon_press={
            () => {
              navigate.navigateTo(this.props.navigation, 'Notification')
            }
          }
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        {this.state.loading ? <ActivityIndicator
          style={styles.activityStyle}
          size="large"
          color={'#283541'}
        /> :
          this.newBody()
        }
        
      </View>
    );
  }

  newBody(){
    const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1 }}>
       <View style={{margin:20}}>
        <MultiSelect
          hideTags
          items={this.state.items}
          uniqueKey="ID"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Wallet Items"
          searchInputPlaceholderText="Search Wallet..."
          onChangeInput={ (text)=>{} }
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="grey"
          selectedItemIconColor="black"
          itemTextColor="#000"
          displayKey="Implse_Name"
          searchInputStyle={{ color: 'black' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          hideSubmitButton={true}
          autoFocusInput={false}
        />
        </View>
            <Button
              name={'Submit'}
              marginTop={5}
              onPress={()=>{this.opnSaveImpulse()}}
            />
       
      </View>
    )
  }



  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    console.log('submit button was pressed')
  };

  opnSaveImpulse(){

    console.log("selected items",this.state.selectedItems);
    this.setState({loading:true});
    const params= this.props.navigation.state.params;
      if(!params) return;
    const body=
    {
      "JobId":params.jobId,
      "ImpulseId":this.state.selectedItems.join(',')
    
    }
    apiCaller('updatejobimpulse', 'post', params.userId,body).then(success=>{
      this.setState({loading:false});
      console.log("walllet update ",success)
      if(success.Message)
        showToast(success.Message)
    }).catch(error=>{
      showToast("Unable to update wallet.");
      console.log(error);
      this.setState({loading:false});
     })
  }
 
 
//   impulseDropdown=()=>{
//     const items=["Mobile phone","Chair","Dekstop","Packet"].map((item,index)=>{
//       return <Picker.Item label={item} value={item} key={index}/>
//     })
//    return  <Picker
//    selectedValue={ this.state.selectedValue }
//    onValueChange={ value =>{ this.setState({selectedValue:value}) }}
//    >
//     <Picker.Item label={"Select"} color={"black"} value={undefined} key={-1}/>
//     {items}
   
//      </Picker>

//  }


    // body(){
  //   const { selectedItems } = this.state;
  //   return (
  //     <KeyboardAvoidingView
  //         keyboardVerticalOffset={30}
  //         behavior='position' enabled>
  //         <View
  //           style={{
  //             marginTop: '10%'
  //           }}
  //         >
  //         <Text
  //             style={{ fontSize: Common.fontSizeLarge, fontWeight: '500', marginLeft: '5%', marginTop: '10%' }}>
  //             Wallet
  //           </Text>
  //           <View style={{
  //             height: Common.deviceHeight / 10, width: '80%', marginLeft: '5%', borderRadius: 3, marginTop: '3%',
  //           }}>
  //     <View style={{ flex: 1 }}>
  //       <MultiSelect
  //         hideTags
  //         items={this.state.items}
  //         uniqueKey="id"
  //         ref={(component) => { this.multiSelect = component }}
  //         onSelectedItemsChange={this.onSelectedItemsChange}
  //         selectedItems={selectedItems}
  //         selectText="Pick Items"
  //         searchInputPlaceholderText="Search Items..."
  //         onChangeInput={ (text)=> console.log(text)}
  //         altFontFamily="ProximaNova-Light"
  //         tagRemoveIconColor="#CCC"
  //         tagBorderColor="#CCC"
  //         tagTextColor="#CCC"
  //         selectedItemTextColor="#CCC"
  //         selectedItemIconColor="#CCC"
  //         itemTextColor="#000"
  //         displayKey="name"
  //         searchInputStyle={{ color: '#CCC' }}
  //         submitButtonColor="#CE1526"
  //         submitButtonText="Submit"
  //         onAddItem= {(data) => { 
  //           console.log("on add item "+data)
  //           alert("onadd Data"+data)}}
  //       />
       
  //     </View>

            
  //           </View>
  //           {/* <Text
  //             style={{
  //               fontSize: Common.fontSizeLarge,
  //               color: 'black',
  //               fontWeight: '600',
  //               marginLeft: '5%'
  //             }}
  //           >
  //             Enter Your Wallet Share
  //           </Text>
  //           <Text
  //             style={{ fontSize: Common.fontSizeLarge, fontWeight: '500', marginLeft: '5%', marginTop: '10%' }}>
  //             Description
  //           </Text>
  //           <View style={{
  //             height: Common.deviceHeight / 5, backgroundColor: '#ECEBE9', width: '80%', marginLeft: '5%', borderRadius: 3, marginTop: '3%',
  //           }}>
  //             <TextInput
  //               maxLength={50}
  //               style={{
  //                 marginLeft: '2%',
  //                 width: '90%',
  //                 height: '100%'
  //               }}
  //               autoCorrect={false}
  //               keyboardType='default'
  //               placeholder="" onChangeText={(itemDescripton) => this.setState({ itemDescripton })}
  //               placeholderTextColor="#585858" underlineColorAndroid='transparent' />
  //           </View>
  //           <Text
  //             style={{ fontSize: Common.fontSizeLarge, fontWeight: '500', marginLeft: '5%', marginTop: '10%' }}>
  //             Price
  //        </Text>
  //           <View style={{
  //             height: Common.deviceHeight / 10, backgroundColor: '#ECEBE9', width: '80%', marginLeft: '5%', borderRadius: 3, marginTop: '3%',
  //           }}>
  //             <TextInput
  //               maxLength={50}
  //               style={{
  //                 marginLeft: '2%',
  //                 width: '90%',
  //                 height: '100%'
  //               }}
  //               autoCorrect={false}
  //               keyboardType='default'
  //               placeholder="$20 US" onChangeText={(itemDescripton) => this.setState({ itemDescripton })}
  //               placeholderTextColor="#BDBDBD" underlineColorAndroid='transparent' />
  //           </View> */}
       
  //           <Button
  //             name={'Submit'}
  //             marginTop={30}
  //           />
  //         </View>
  //       </KeyboardAvoidingView>
  //   )
  // }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputLabel:{fontSize:16,fontWeight:"normal",paddingTop:5},
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  },
});
export default Impulse;