import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import TaskList from '~/pages/TaskList';
import Auth from '~/pages/Auth';

const Routes = createAppContainer(createSwitchNavigator({ Auth }));

export default Routes;
