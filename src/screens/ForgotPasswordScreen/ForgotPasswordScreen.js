import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ForgotPasswordScreen = () => {

    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onSendPressed = async data => {
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
        <View style = {styles.root}>
            <Text style = {styles.title}>Reset your password</Text>
            <CustomInput
            name={"username"} 
            control={control}
            placeholder = "Username" 
            rules={{
                required: 'Username is required'
            }} 
            />
            <CustomButton text = "Send" 
            onPress={handleSubmit(onSendPressed)}
            />
           

            <CustomButton 
            text = "Back to Sign In" 
            onPress={onSignInPressed}
            type = "TERTIARY"
            />

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
})
export default ForgotPasswordScreen
