import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Linking, Alert } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Auth } from 'aws-amplify'

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const SignUpScreen = () => {
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();
    const onRegisterPressed = async (data) => {
        const { username, password, email, name } = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    name,
                    preferred_username:
                        username
                }
            });
            navigation.navigate('ConfirmEmail', {username});
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
    const onTermOfUsePressed = () => {
        Linking.openURL('https://google.com');
    }

    const onPrivacyPressed = () => {
        Linking.openURL('https://google.com');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>
                <CustomInput
                    name="name"
                    control={control}
                    placeholder="Name"
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name should be at least 3 characters long'
                        },
                        maxLength: {
                            value: 24,
                            message: 'Name should be max 24 characters long'
                        },
                    }}
                />
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username should be at least 3 characters long'
                        },
                        maxLength: {
                            value: 24,
                            message: 'Username should be max 24 characters long'
                        },
                    }}
                />
                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Email"
                    rules={{
                        required: 'Email is required',
                        pattern: { value: EMAIL_REGEX, message: 'Email is invalid' }
                    }}
                />
                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Password"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password should be at least 8 characters long'
                        }
                    }}
                    secureTextEntry
                />
                <CustomInput
                    name="password-repeat"
                    control={control}
                    placeholder="Repeat password"
                    rules={{
                        validate: value => value === pwd || 'Password does not match',

                    }}
                    secureTextEntry
                />
                <CustomButton text="Register"
                    onPress={handleSubmit(onRegisterPressed)}
                />
                <Text style={styles.text}>
                    By registering, you confirm that you accept our {' '}
                    <Text style={styles.link} onPress={onTermOfUsePressed} >Terms of Use</Text> and {' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
                </Text>
                <SocialSignInButtons />
                <CustomButton text="Have an account? Sign In"
                    onPress={onSignInPressed}
                    type='TERTIARY' />
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
export default SignUpScreen
