import React from 'react';
import { ScrollView, ImageBackground} from 'react-native'
export default Background = (props) => {
    const color = props.backgroundColor || ['#336979', '#8DA9B7'];
    return (
        <ImageBackground style={{
            flex: 1,
        }} source={require('../../assets/background.jpg')} resizeMode='cover' >
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}
                scrollEventThrottle={1000}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                keyboardDismissMode={'interactive'}
                onScroll={props.handleScroll}>
                {props.children}
            </ScrollView>
        </ImageBackground>
    )
}