import React, { Component } from "react";
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
  TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import axiosinst from '../api/axiosinst';
import axios from 'axios';
import Bookview from './Bookview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PickerShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }
   onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  getValue(value : string ){
    this.setState({
      backvalue: value
    });
  }

  render() {
    console.log(this.props.bookid);
    


    const addBookToMineHandler = async(getValue)=>{
      console.log(getValue);
      console.log(getValue);
      console.log(getValue==="");
      
      console.log(getValue)
      if(getValue!=""){
      const payload={
          "book_state": getValue,
      }
      const back= JSON.stringify(payload);
      // const id=await AsyncStorage.getItem('id');
      axios.post('http://eeb3e397cc7a.ngrok.io/'+this.props.bookid,back,{
        "headers":{"content-type":"application/json",
        "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
                }
                })
      .then(async function(response){
        console.log(response.data)
        console.log('\n'+'++++++++'+'\n')
      })
      .catch(function (error) {
         console.log(error);
         console.log('***********************')
      });
    }
    }
      
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
              selectedValue={this.state.selected , addBookToMineHandler(this.state.selected) }
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="______" value="null" />
              <Picker.Item label="میخواهم این کتاب را بخوانم" value="ToRead"  />
              <Picker.Item label="در حال خواندن" value="Reading" />
              <Picker.Item label="قبلا خوانده ام" value="Read" />
             
            </Picker>
          </Form>
        </Content>
      </Container>
      
      
    );
  }
}