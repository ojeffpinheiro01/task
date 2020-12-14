import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'

export default class Preload extends Component {
  componentDidMount = async () => {
    const userDataJson = await AsyncStorage.getItem('userData')
    let userData = null

    try {
      userData = JSON.parse(userDataJson) || {}
    } catch (e) {
      //userData é válido
    }

    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization']
        = `bearer ${userData.token}`
        this.props.navigation.navigate('Home', userData)
      } else {
        this.props.navigation.navigate('Auth')
      }
}
    render() {
        return (
            <View style={styles.container}>
              <ActivityIndicator size="large"  color="#1FBF79" />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})
