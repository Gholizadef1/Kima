import Login from './Login';
import SignUp from './SignUp';
import { createStackNavigator } from 'react-navigation-stack';
 import Home from './Home';

  const StackScreen = createStackNavigator(
    {
      Log:Login,
      home: Home,  
      Sign:SignUp
  
    },
    {
      initialRouteName: 'Log',
      defaultNavigationOptions: {
        title: 'Kima',
        
        headerTintColor:'#1F7A8C',
        headerStyle: {
          backgroundColor: '#E1E5F2',
          
        },
      },
    }
  );

export default StackScreen;