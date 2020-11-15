import React,{useContext} from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import Login from './Login';
import { Context as AuthContext } from '../context/Authcontext'; 
// import { Button } from 'native-base';

const Profile = (prop) => {
    const { signout } = useContext(AuthContext);  
    return(
        <View style={styles.container}>
            <Text>
                This is Profile Page
            </Text>
            {/* <TouchableOpacity
            onPress={()=>navigation.navigate('loginflow')}            
            
            > */}
            <Button title='logout'
            onPress={()=>prop.navigation.navigate('loginflow')}
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