import React, { Component, PropTypes } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import Button from './button';
import Common from '../common/common';

export default Header = (props) => {
    return (
        <Modal transparent={true} visible={props.infoModalVisible} onRequestClose={() => {}}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => props.setInfoModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
                        <View style={{
                            marginTop: Common.deviceHeight / 3.5, width: '90%', backgroundColor: '#ECECEC',
                            height: Common.deviceHeight / 3.2, marginHorizontal: '5%',
                            borderWidth: 1, borderColor: '#ECECEC', borderRadius: 4
                        }}>
                            <TextInput
                                maxLength={30}
                                value={props.email}
                                autoCorrect={false}
                                placeholder="Enter email to change password"
                                autoCapitalize="none"
                                placeholderTextColor="gray" 
                                underlineColorAndroid='transparent'
                                onChangeText={props.onChangeText}
                                style={{
                                    height: Common.deviceHeight / 11, marginTop: '5%',
                                    fontSize: Common.fontSizeBase, marginHorizontal: '5%',
                                    width: '90%', color: 'black', borderBottomWidth: 1, borderBottomColor: 'gray'
                                }}
                            />
                            <Button
                                onPress={() => props.onChangePassword()}
                                name={'Submit'}
                                marginTop={Common.deviceHeight / 14}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000040'
    }
});

