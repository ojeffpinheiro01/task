import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import commonStyles from '~/commonStyles'

const initialState = {
  desc: '',
  date: new Date(),
  showDatePicker: false
}

export default class AddTask extends Component {
    state = {
      ...initialState
    }

    getInitialState = () => {
        return {
            desc: '',
            date: new Date()
        }
    }
    save = () => {
      const newTask = {
        account: this.state.desc,
        date: this.state.date
      }

      this.props.onSave && this.props.onSave(newTask)
      this.setState({ initialState })
    }

    getDatePicker = () => {
      let datePicker = <DateTimePicker value = {this.state.date}
        onChange={(_, date) => this.setState({ date, showDatePicker: false })}
        mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM')

      if(Platform.OS === 'android'){
        datePicker = (
          <View>
            <TouchableOpacity onPress={() => this.setState({ showDatePicker: true}) } >
              <Text style={styles.date}>{dateString}</Text>
            </TouchableOpacity>
            {this.state.showDatePicker && datePicker }
          </View>
        )
      }

      return datePicker
    }
    handleDateAndroidChanged = () => {
      DateTimePicker.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DateTimePicker.dismissedAction) {
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({ date: momentDate.toDate() })
            }
        })
    }
    render() {
        let datePicker = null
        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='date' date={this.state.date}
                onDateChange={date => this.setState({ date })} />
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}
                onShow={() => this.setState({ ...this.getInitialState() })}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput placeholder="Descrição..." style={styles.input}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />
                    {this.getDatePicker()}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.default,
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center',
    }
})

