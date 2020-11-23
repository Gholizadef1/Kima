
import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {withNavigation} from 'react-navigation'
import Home from './Home';
import axiosinst from '../api/axiosinst'


const Bookview = (prop) => {

  const [result , setResult] = useState(null);
  const id = prop.route.params.id;
  const getResult = async (id) => {
  const response = await axiosinst.get('/bookdetail/'+id);
  setResult(response.data);
  console.log(response.data.description)
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
        <Header style={{backgroundColor:'#1F7A8C',marginTop:15}}/>
        <Content>
          <Card>
            <CardItem>
              <Left>
                {/* {/ <Thumbnail source={require('./assets/download.jpg')} /> /} */}
                <Body>
                      <Text>{result.title}</Text>
                  <Text note>مشخصات</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri : result.imgurl}} style={styles.image}/>
            </CardItem>
            <CardItem>
            <Text style ={styles.bookname}>{result.title}</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.author}>{result.author}</Text>
            </CardItem>
            <CardItem>
              <Text>{result.publisher}</Text>
            </CardItem>
            <CardItem>
              <Left>
                {/* <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button> */}
              </Left>
              <Body>
                <Button  style={styles.bottomshape}>
                  <Text>اضافه به کتاب های من</Text>
                </Button>
              </Body>
              <Right>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
            <Text>{result.description}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{

      top:20,
      marginTop:20,
      width:140,
      height:200,
      marginBottom:40,
      borderRadius:5,
      marginHorizontal:100
  },
  bookname: {
    bottom:20,
    fontSize:20,
    width:500,
    fontWeight:'bold',
    marginHorizontal:100
  },
  author: {
    bottom:30,
    color:'#1F7A8C',
    fontSize:15,
    marginHorizontal:100
  },
  publisher:{

    bottom:40,
    color:'#1F7A8C',
    fontSize:10,
    marginHorizontal:100
  },
  bottomshape: {
    backgroundColor:'#1F7A8C',
    bottom:15,
    fontSize:10,
    width:260,
    right:70,
    marginHorizontal:1
  },
  bottomtext:{

    right:20,
    left:20,
    marginLeft:30,
    marginHorizontal:100,
  }
});

export default Bookview;