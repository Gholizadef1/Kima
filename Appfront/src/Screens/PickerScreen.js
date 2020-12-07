import React, {useEffect, useState} from 'react';
import {Picker} from 'native-base';
import axios from 'axios';
import {View, ActivityIndicator} from 'react-native';
import Bookview from './Bookview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PickerScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {

    console.log(props)
    getData();
  }, []);

  const onChangeValue = (value) => {
    setSelectedValue(value);
  };

  const getData = async () => {
    try {
        axios.get('http://92a8f1ce7b76.ngrok.io/bookdetail/'+props.bookid+'/getstate',{"headers":{"content-type":"application/json",
        "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
        }})
        .then(function(response){
        setSelectedValue(response.data)
        console.log(response)
        })
        .catch(function(error){
        console.log(error)
        })
      setSelectedValue(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const PostData = async (selectedValue) => {
        console.log(selectedValue);
        if(selectedValue!=""){
        const payload={
            "book_state": selectedValue,
        }
        const back= JSON.stringify(payload);
        axios.post('http://92a8f1ce7b76.ngrok.io/bookdetail/'+props.bookid,back,{
          "headers":{"content-type":"application/json",
          "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
                  }
                  })
        .then(async function(response){
          console.log(response.data)
          console.log('\n'+'++++++++'+'\n')
        })
       .catch (function(error) {
      console.log(error);
    });
  }
}

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <Picker
      style={{width: 270,
        borderRadius:5,
        borderWidth:3,
        borderColor:'#1F7A8C',
        borderTopColor:'#1F7A8C' }}
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        headerTitleStyle={{ color: "#fff" }}
        selectedValue={selectedValue}
        onChangeValue={(value) => {
          onChangeValue(value);
        }}>
        <Picker.Item label="اضافه کنید" value="null" />
        <Picker.Item label="میخواهم این کتاب را بخوانم" value="ToRead"  />
        <Picker.Item label="در حال خواندن" value="Reading" />
        <Picker.Item label="قبلا خوانده ام" value="Read" />

        <Picker.Item />
      </Picker>
    );
  }
};

export default PickerScreen;
