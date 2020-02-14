import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Common from '../common/common';

export default Button = (props) => {
    return (
        <TouchableOpacity
            disabled={props.disabled}
            style={{
                marginHorizontal: '5%',
                width: '90%',
                height: Common.deviceHeight / 11.5,
                marginTop: props.marginTop || Common.deviceHeight / 8,
                backgroundColor: props.buttonColor || '#CE1526',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={props.onPress}>
            <Text style={{
                color: props.textColor || 'white', fontSize: Common.fontSizeLarge,
                fontWeight: '500'
            }}>{props.name}</Text>
        </TouchableOpacity>
    )
}