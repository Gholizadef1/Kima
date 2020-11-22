import React,{useContext} from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
// import Login from './Login';
// import { Context as AuthContext } from '../context/AuthContext'; 
// import { Button } from 'native-base';
// import TabScreen from './TabScreen'
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { NavigationContainer } from "@react-navigation/native";
// import StackScreen from './StackScreen';
// import { State } from 'react-native-gesture-handler';
import App from '../../App';
import AuthContext,{AuthProvider} from '../context/AuthContext';



const Profile = ({navigation}) => {
    const val = useContext(AuthContext);  
    return(
        <View style={styles.container}>
            <Text>
                This is Profile Page
            </Text>
            {/* <TouchableOpacity
            onPress={()=>navigation.navigate('loginflow')}            
            
            > */}
            <Button title='logout'
            onPress={()=>{
                console.log(navigation);
                // navigation.navigate('loginFlow')}}
                val.changelogged(false);

            }}
            >

            </Button>
            
               

            {/* </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  export default Profile;