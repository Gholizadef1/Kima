import React from 'react';
import {Text,Button,TextInput, View,StyleSheet,ScrollView} from 'react-native';

const HomeScreen=()=>{
    return(
    <View>
    
   <Text>
   ورود
   </Text> 
<TextInput style={styles.input}
autoCapitalize='none'
autoCorrect={false}

></TextInput>
    </View>
    )

}


const styles=StyleSheet.create({
    input:{
        borderEndWidth:225,

        borderStartWidth:0,
        width:200,
        margin:10,
        borderColor:'cyan',
        borderWidth:1,
        padding:8
    

    },

    bckground:{
    

    }
    


});

export default HomeScreen;