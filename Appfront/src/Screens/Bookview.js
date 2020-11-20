
import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {withNavigation} from 'react-navigation'
import Home from './Home';
import axiosinst from '../api/axiosinst'


// function getIdFromAPI(){
//   axiosinst.get('http://c3411d641648.ngrok.io/bookdetail/')
//   .then(function(response){
//       setResult(response.data)
//       console.log(response)
//       console.log(response.data.title);
      
//   })
//   .catch(function(error){
//       console.log(error)
//   })
// }



const Bookview = (prop) => {

  const [result , setResult] = useState(null);
  const id = prop.route.params.id;
  const getResult = async (id) => {
  const response = await axiosinst.get("/bookdetail/"+id);
  setResult(response.data);
  console.log(id);
  };
  useEffect(() =>{
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }
    return(
        <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                {/* {/ <Thumbnail source={require('./assets/download.jpg')} /> /} */}
                <Body>
                      <Text>itemId: {JSON.stringify(id)}</Text>
                      <Text>{result.title}</Text>
                  <Text note>مشخصات</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri : result.id.imgurl}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
            <Text>{result.text}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
};
const styles = StyleSheet.create({});

export default Bookview;