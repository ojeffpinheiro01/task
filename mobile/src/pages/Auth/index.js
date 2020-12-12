import React, { Component } from 'react'
import {
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
 } from 'react-native'

import log from '~/assets/imgs/login.jpg'
import commonStyles from '~/commonStyles'


export default class Auth extends Component {

  state = {
    email: '',
    pass: ''
  }
  render(){
    return(
      <ImageBackground source={log} style={styles.background} >
        <Text style={styles.title} >Tasks</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Email'
            value={this.state.email}
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            />
          <TextInput
            placeholder='Senha'
            value={this.state.pass}
            style={styles.input}
            onChangeText={pass => this.setState({ pass })}
            />
            <TouchableOpacity>
              <View style={styles.button} >
                <Text style={styles.buttonText} >ENTRAR</Text>
              </View>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  title: {
      fontFamily: commonStyles.fontFamily,
      color: commonStyles.colors.secondary,
      fontSize: 70,
      marginBottom: 10,
  },
  subtitle: {
      fontFamily: commonStyles.fontFamily,
      color: '#FFF',
      fontSize: 20,
  },
  formContainer: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 20,
      width: '90%',
  },
  input: {
      marginTop: 10,
      backgroundColor: '#FFF',
      padding: Platform.OS === 'ios' ? 15 : 10
  },
  button: {
      backgroundColor: '#080',
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
  },
  buttonText: {
      fontFamily: commonStyles.fontFamily,
      color: '#FFF',
      fontSize: 20
  }
})