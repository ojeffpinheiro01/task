import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
    StyleSheet } from 'react-native'

import AsyncStorage from "@react-native-community/async-storage"
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '~/components/Task'

import todayImage from '~/assets/imgs/today.jpg'
import commonStyles from '../../commonStyles'

const initialState = {
  closeTask: true,
  showModal: false,
  visibleTasks: [],
  task: [{
    id: Math.random(),
    account: 'Comprar livro',
    estimatedAt: new Date(),
    doneAt: new Date()
  }, {
    id: Math.random(),
    account: 'Ler livro',
    estimatedAt: new Date(),
    doneAt: null
  }]
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }
    componentDidMount = async () => {
      const stateString = await AsyncStorage.getItem('stateTask')
      const state = JSON.parse(stateString) || initialState
      this.setState(state, this.filterTasks)
    }
    checkFilter = () => {
        this.setState({ closeTask: !this.state.closeTask }, this.filterTasks)
    }
    filterTasks = () => {
        let visibleTasks = null
        if(this.state.closeTask){
            visibleTasks = [...this.state.task]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.task.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('stateTask', JSON.stringify(this.state) )
    }
    markTask = idTask => {
        const tasks = [...this.state.task]
        tasks.forEach(task => {
            if(task.id === idTask ) {
                task.closeTask = tarefa.closeTask ? null : new Date()
            }
        })
        this.setState({tasks}, this.filterTasks)
    }
    addTask = newTask => {
        if(!newTask.account || !newTask.account.trim()){
            Alert.alert('DADOS INVÁLIDOS', 'Descrição não informada')
            return
        }

        const task = [...this.state.task]
        task.push({
            id: Math.random(),
            account: newTask.account,
            estimatedAt: newTask.estimatedAt,
            closeTask: null
        })
        this.setState({ task, showModal: false }, this.filterTasks)
    }
    delTask = id => {
        const task = this.state.task.filter(task => task.id !== id )
        this.setState({ task }, this.filterTasks)
    }
    render () {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style = {styles.container} >
                <ImageBackground source={todayImage} style = {styles.background} >
                    <View style = {styles.iconBar} >
                        <TouchableOpacity onPress = {this.checkFilter}>
                            <Icon name =  {this.state.closeTask ? 'eye' : 'eye-slash' }
                              size = {20}
                              color = {commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.titleBar} >
                        <Text style = {styles.title} >Hoje</Text>
                        <Text style = {styles.subtitle} >{today}</Text>
                    </View>
                </ImageBackground>
                <View style = {styles.taskList} >
                <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    doneAt={new Date()}
                    />
                  <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    />
                  <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    />
                  <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    />
                  <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    />
                  <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    />
                  <Task
                    account="Comprar Livro"
                    estimatedAt={new Date()}
                    />
                </View>
                <TouchableOpacity style = {styles.addButton}
                    activeOpacity = {0.7}
                    onPress = {() => this.setState({ showModal: true })} >
                    <Icon name = 'plus'
                        size = {20}
                        color = {commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.hoje,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
