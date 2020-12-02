import React, { Component } from "react";
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
  TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import axiosinst from '../api/axiosinst';
import axios from 'axios';
import Bookview from './Bookview'

export default class PickerShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "ToRead"
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

    const addBookToMineHandler = (getValue)=>{
      console.log(getValue);
      console.log(getValue);
      const payload={
          "book_state": getValue,
      }
      const back= JSON.stringify(payload);
      axios.post('http://4780edc5f3be.ngrok.io/bookdetail/'+'1',back,{"headers":{"content-type":"application/json",
      "Authorization":''}})
      .then(async function(response){
        console.log(response.data)
      })
      .catch(function (error) {
         console.log(error);
      });
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