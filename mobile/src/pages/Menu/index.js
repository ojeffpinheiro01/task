import React from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Gravatar } from 'react-native-gravatar'
import AsyncStorage from '@react-native-community/async-storage'

import commonStyles from '~/commonStyles'

export default props => {
  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('Preload')
  }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                options={{
                  email: props.navigation.getParam('email'),
                  secure: true
                }} />
                <View style={styles.userInfo}>
                    <View>
                        <Text style={styles.name}>
                            {props.navigation.getParam('name')}
                        </Text>
                        <Text style={styles.email}>
                            {props.navigation.getParam('email')}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={logout}>
                        <View style={styles.logoutIcon}>
                            <Icon name="power-off" size={30}
                                color='#800' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center'
    },
    title: {
        backgroundColor: '#FFF',
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 30,
        margin: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        marginLeft: 10,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10,
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoutIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    }
})
