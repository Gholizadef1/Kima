import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { Container, Header, Title, Form, Item, Input, Button, Icon, CheckBox, Body, ActionSheet, Textarea, Content } from 'native-base';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

const Comment = (prop) => {
  const [selectedValue, setselectedValue] = useState('none')
  console.log('COMMENT')
  const callbackFunction = async (childData) => {
    if (childData === true) {
      console.log('TRUE')
      await response(1)
     
    }
  }
  const [delet, setdelet] = useState(false)
  const [refresh, setrefresh] = useState(false);
  const [count,setcount]=useState(1);
  const [IDD, setIDD] = useState('');
  const equal = async (item) => {
    setIDD(await AsyncStorage.getItem('id').toString());
  }
  const [closed, setclosed] = useState(false);
  const [information, setinformation] = useState([]);
  const[selecttime,setselecttime]=useState(true)
  const [likeotime, setlikeotime] = useState('time');
  const [timelable,settimelable]=useState('فیلتر بر اساس تاریخ')
  const [likelable,setlikelable]=useState('فیلتر بر اساس تعداد پسند ها')
  const [theend, settheend] = useState(false)
  const [page, setpage] = useState(1);
 
  useFocusEffect(
    React.useCallback(() => {
      const a=new Promise(async(resolve,reject)=>{
        await setinformation([]);
        await setpage(1);
        await setselecttime(true)
        //با این ظاهرا درست شد :/
        await setselectedValue('like')
        if(selectedValue==="none")
       await setlikeotime("time");
       else
       await setlikeotime("like");
       await setselectedValue('none')

        resolve()
      }).then(()=>{
      console.log('++++++++++' + information + '**********')
      response(1);
      console.log('++++++++++' + information + '**********')
      })
    
    }, [prop.navigation])

  )
  const handleLoadMore = async() => {
    console.log('END OF THE LIST')
    if(page<count){
      console.log(page+'PAGEDEEFFDHASKDFJLSKFH')
      console.log(count+'C OUNT ASKDFJ;LKSFJ')
     if(theend===false)
     response(page+1);
    }
    else{
      settheend(true)
    }
    };
  const [showbutton, setshowbutton] = useState(true);
  const [reset, setreset] = useState(false);
  const bs = React.createRef()
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <Animated.View style={{
        opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
      }}>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#B8B8B8',
    backgroundColor: '#ffff',
    marginTop: 2
  },
  nazar: {
    marginLeft: '33%',
    fontWeight: 'bold',
    color: '#EDF2F4'
  },
  loader: {

    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  }
});
export default Comment;