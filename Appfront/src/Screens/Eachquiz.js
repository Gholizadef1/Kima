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
const Eachquiz = ({navigation}) => {

   
//   useFocusEffect(
//     React.useCallback(() => {   
     
//     },[]))
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: wp('2%') }}>
<Text style={{position:'absolute',marginTop:700}}>;alksfjd;lksjfa;lksj;flkjs;lkdfj</Text>
       <View style={{height:hp('2%')}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
});
export default Eachquiz;
