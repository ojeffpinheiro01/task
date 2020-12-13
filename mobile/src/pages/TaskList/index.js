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

import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '~/common'
import Task from '~/components/Task'
import AddTask from '../AddTask'

import todayImage from '~/assets/imgs/today.jpg'
import commonStyles from '../../commonStyles'

const initialState = {
  showDoneTasks: true,
  showModal: false,
  visibleTasks: [],
  tasks: []
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }
    componentDidMount = async () => {
      const stateString = await AsyncStorage.getItem('stateTask')
      const savedState = JSON.parse(stateString) || initialState
      this.setState({
        showDoneTasks: savedState.showDoneTasks
      }, this.filterTasks)
      this.loadTasks()
    }

    loadTasks = async () => {
      try {
        const maxDate = moment().format('YYYY-MM-DD 23:59:59')
        const res = await axios.get(`${server}/tasks?date=${maxDate}`)
        this.setState({ tasks: res.data}, this.filterTasks)
      } catch (e) {
        showError(e)
      }
    }

    checkFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }
    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('stateTask', JSON.stringify({
          showDoneTasks: this.state.showDoneTasks
        }) )
    }
    toggleTask = TaskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === TaskId ) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({tasks}, this.filterTasks)
    }
    addTask = newTask => {
        if(!newTask.account || !newTask.account.trim()){
            Alert.alert('DADOS INVÁLIDOS', 'Descrição não informada')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            account: newTask.account,
            estimatedAt: newTask.estimatedAt,
            doneAt: null
        })
        this.setState({ tasks, showModal: false }, this.filterTasks)
    }
    delTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id )
        this.setState({ tasks }, this.filterTasks)
    }
    render () {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style = {styles.container} >
                <AddTask isVisible={this.state.showModal}
                  onCancel={() => this.setState({ showModal: false }) }
                  onSave ={this.addTask} />
                <ImageBackground source={todayImage} style = {styles.background} >
                    <View style = {styles.iconBar} >
                        <TouchableOpacity onPress = {this.checkFilter}>
                            <Icon name =  {this.state.showDoneTasks ? 'eye' : 'eye-slash' }
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
                <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Task {...item}
                              toggleTask={this.toggleTask}
                              onDelete = {this.delTask} />} />
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
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
