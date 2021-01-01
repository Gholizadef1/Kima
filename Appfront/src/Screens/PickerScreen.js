import React, { useEffect, useState } from 'react';
import { Picker, Icon ,Content , Container , Form} from 'native-base';
import axios from 'axios';
import { View, ActivityIndicator, Text } from 'react-native';
import Bookview from './Bookview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosinst from '../api/axiosinst';

const PickerScreen = (props) => {

   const [selectedValue, setSelectedValue] = useState('ToRead');

  // useEffect(() => {
  //   console.log(props)
  //   getData();
  // });

  const onChangeValue = (value) => {
    PostData(value);
    // console.log(onChangeValue)
  };
  console.log('***nowhi'+props.bookid)

  const getData = async () => {
    axios.get('http://505a2dd8d5cc.ngrok.io/bookdetail/'+props.bookid +'/getstate', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
    .then(function(response){
      console.log('Pickerr'+response.data.book_state)
      setSelectedValue(response.data.book_state)   
  })
  .catch(function(error){
      console.log(error)
  })
  };

//  getData();

  const PostData = async (value) => {
//    console.log(value);
    if (value != "") {
      const payload = {
        "book_state": value,
      }
      const back = JSON.stringify(payload);
      axios.post('http://505a2dd8d5cc.ngrok.io/bookdetail/' + props.bookid, back, {
        "headers": {
          "content-type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }
      })
        .then(async function (response) {
          console.log(response.data)
//          getData();

//          console.log('\n' + '++++++++' + '\n')
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
//  console.log('********')
//  console.log(selectedValue)



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
                console.log(value)
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

};

export default PickerScreen;
