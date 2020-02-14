import React, {Component} from "react";
import {StyleSheet, View, SafeAreaView,Text,Image} from "react-native";
import {GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default AutoCompleteAddress=(props)=>{
    return (
            <View style={styles.autocompletesContainer}>
             <Text style={[styles.inputLabel]}>{props.label}</Text>
            <GooglePlacesAutocomplete
            placeholder=''
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data, details);
              props.onSelected(details)
            }}
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyDMNeQUJae2wBxyL9PVStXEHx5bQL3boZQ',
              language: 'en', // language of the results
              types: '(cities)' // default: 'geocode'
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0
              },
              description: {
                fontWeight: 'bold'
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
                borderBottomWidth:2
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
          />
          </View>
    )
}
 
  const styles = StyleSheet.create({
    autocompletesContainer: {
        flex:1,
      paddingTop: 0,
      zIndex: 1,
      width: "100%",
      paddingHorizontal: 0,
    },
  inputLabel:{fontSize:16,fontWeight:"normal",paddingTop:5}

  });
   