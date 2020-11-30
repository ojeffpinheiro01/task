import React from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from'react-native-gesture-handler/Swipeable'

import commonStyles from '~/commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}
    const date = props.doneAt? props.doneAt : props.estimatedAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getConteudoD = () => {
        return(
            <TouchableOpacity style = {styles.d}
             onPress = {() => props.onDelete && props.onDelete(props.id) } >
                <Icon name = 'trash' size = {30} color = '#FFF' />
            </TouchableOpacity>
        )
    }
    const getConteudoE = () => {
        return(
            <View style = {styles.e} >
                <Icon name = 'trash' size = {20} color = '#FFF' style = {styles.delIcon} />
                <Text style = {styles.delText} >EXCLUIR</Text>
            </View>
        )
    }
    return(
        <Swipeable
          onSwipeableLeftOpen = {() => props.onDelete && props.onDelete(props.id)}
          renderRightActions = {getConteudoD}
          renderLeftActions = {getConteudoE}>
            <View style = {styles.container} >
                <TouchableWithoutFeedback
                    onPress ={() => props.toggleTask(props.id) }>
                    <View style = {styles.checkContainer} >{getCheckView(props.doneAt)}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style = {[styles.desc, doneOrNotStyle]} >{props.account}</Text>
                    <Text style = { styles.date } >{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt){
    if(doneAt != null ){
        return (
            <View style = {styles.closed} >
                <Icon name = 'check'
                  size = {20}
                  color = '#FFF' >
                </Icon>
            </View>
        )
    } else {
        return (
            <View style = {styles.pending} ></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#5555'
    },
    closed: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subtitulo,
        fontSize: 12
    },
    d: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    e: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    delText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    delIcon: {
        marginLeft: 10
    }
})
