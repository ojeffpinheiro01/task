import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import TaskList from '~/pages/TaskList';

const Routes = createAppContainer(createSwitchNavigator({ TaskList }));

export default Routes;
