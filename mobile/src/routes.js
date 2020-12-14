import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'

import Preload from '~/pages/Preload/index'
import Menu from '~/pages/Menu'
import Auth from '~/pages/Auth';
import TaskList from '~/pages/TaskList';
import commonStyles from './commonStyles'

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20
    },
    activeLabelStyle: {
      color: '#080',
      fontWeight: 'bold'
    }
  }
}

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList title="Hoje" daysAhead={0} {...props} />,
    navigationOptions: {
      title: 'Hoje'
    }
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList title="Amanhã" daysAhead={1} {...props} />,
    navigationOptions: {
      title: 'Amanhã'
    }
  },
  Week: {
    name: 'Week',
    screen: props =>
        <TaskList title='Semana' daysAhead={7} {...props} />,
    navigationOptions: {
        title: 'Semana'
    }
  },
  Month: {
    name: 'Month',
    screen: props => <TaskList title="Mês" daysAhead={30} {...props} />,
    navigationOptions: {
      title: 'Mês'
    }
  }
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
  Preload: {
    name: 'Preload',
    screen: Preload
  },
  Auth: {
      name: 'Auth',
      screen: Auth
  },
  Home: {
      name: 'Home',
      screen: menuNavigator
  }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Preload'
})

export default createAppContainer(mainNavigator)
