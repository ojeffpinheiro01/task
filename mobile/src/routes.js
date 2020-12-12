import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Auth from '~/pages/Auth';
import TaskList from '~/pages/TaskList';

const mainRoutes = {
  Auth: {
      name: 'Auth',
      screen: Auth
  },
  Home: {
      name: 'Home',
      screen: TaskList
  }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Home'
})

export default createAppContainer(mainNavigator)
