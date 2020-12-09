import React, { useEffect, useState } from 'react';
import { Picker, Icon ,Content , Container , Form} from 'native-base';
import axios from 'axios';
import { View, ActivityIndicator, Text } from 'react-native';
import Bookview from './Bookview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PickerScreen = (props) => {
   const [loading, setLoading] = useState(false);
   const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {

    console.log(props)
    getData();
  });

  const onChangeValue = (value) => {
    PostData();
  };


  const getData = async () => {
    try {
      axios.get('http://dbe797f728d2.ngrok.io/bookdetail/' + props.bookid + '/getstate', {
        "headers": {
          "content-type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }
      })
        .then(function (response) {
          console.log('response data : ', response.data)
          setSelectedValue(response.data.book_state);
        })
        .catch(function (error) {

          console.log('error get data : ', error)
        })
      setSelectedValue(response.data.book_state);
      setLoading(false);
    } catch (e) {
      console.log('error', e);
    }
  };

  const PostData = async () => {
    console.log(selectedValue);
    if (value != "") {
      const payload = {
        "book_state": selectedValue,
      }
      const back = JSON.stringify(payload);
      axios.post('http://92a8f1ce7b76.ngrok.io/bookdetail/' + props.bookid, back, {
        "headers": {
          "content-type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }
      })
        .then(async function (response) {
          console.log(response.data)

          console.log('\n' + '++++++++' + '\n')
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  console.log('********')
  console.log(selectedValue)


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />ّّ
        <Text>hi</Text>
      </View>
    );
  } else {
    return (
      <Container >
        <Content>
          <Form>
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
              }}
            >
              <Picker.Item label="اضافه کنید" value="null" />
              <Picker.Item label="میخواهم این کتاب را بخوانم" value="ToRead"  />
              <Picker.Item label="در حال خواندن" value="Reading" />
              <Picker.Item label="قبلا خوانده ام" value="Read" />
             
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
};

export default PickerScreen;
