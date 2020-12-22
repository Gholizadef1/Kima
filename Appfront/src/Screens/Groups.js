import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';

const Groups = () => {
    return(
        <Container style={{marginTop:100}}>
        <Header hasSegment>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Segment>
              <Button first><Text>Puppies</Text></Button>
              <Button last active><Text>Cubs</Text></Button>
            </Segment>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>Awesome segment</Text>
        </Content>
      </Container>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  export default Groups;