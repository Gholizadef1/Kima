import React, { Component } from "react";
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
  TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

export default class PickerShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key0"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Container >
        <Content>
          <Form>
            <Picker
            style={{width: 270,
              borderWidth:3,
              borderColor:'#1F7A8C',
              borderTopColor:'#1F7A8C' }}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="میخواهم این کتاب را بخوانم" value="key0" />
              <Picker.Item label="در حال خواندن" value="key1" />
              <Picker.Item label="قبلا خوانده ام" value="key2" />
             
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}
