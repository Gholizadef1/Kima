import React, { Component } from "react";
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
  TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

export default class PickerShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key2"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Picker
            style={{width: 200, height:40 , bottom:13}} itemStyle={{height: 24}}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
             
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}
