import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal,FlatList,ActivityIndicator, TextPropTypes,Alert } from 'react-native';
 import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content,SearchBar } from 'native-base';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Eachgroup from './Eachgroup';
import axiosinst from '../api/axiosinst'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { number } from 'yup';
import { set } from 'react-native-reanimated';
// import { Button } from 'react-native-paper';
const Quizes = () => {
   

  // const [information, setinformation] = useState([]);
  // const [search, setsearch] = useState([])
  // const [refresh,setrefresh]=useState(false);
  // const [opensearch,setopensearch]=useState(false);
  // const [likeotime, setlikeotime] = useState('/filter-time');
  // const [theend,settheend]=useState(false);
  // const[page,setpage]=useState(1);
  // const [count,setcount]=useState(1);

   
  // useFocusEffect(
  //   React.useCallback(() => {   
     
  //   },[]))
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: wp('2%') }}>
        <Text>a;ldjf;slkfjd;lksjf</Text>
       <View style={{height:hp('2%')}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plus: {

    alignSelf: 'center',
    justifyContent: 'center'

  }, 
  loader:{
    alignItems:'center',
    marginBottom:hp('15%'),
    justifyContent:'center',
    alignSelf:'center',
    marginTop:hp('10%')
  }
});
export default Quizes;
