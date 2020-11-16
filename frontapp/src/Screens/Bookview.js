import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {withNavigation} from 'react-navigation'
const Bookview = ({navigation}) => {

  const [result , setResult] = useState(null);
  const id = navigation.getParam('id');
  const getResult = async (id) => {
  const response = await yelp.get(`/${id}`);
  setResult(response.data);
  };
  useEffect(() =>{
    getResult(id);
  }, [])
    return(
        <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                {/* <Thumbnail source={require('./assets/download.jpg')} /> */}
                <Body>
                  <Text>عادت های اتمی</Text>
                  <Text note>مشخصات</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{}} style={{height: 200, width: null, flex: 1}}/>
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
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
            <Text>
            این کتاب، به سبکی جالب و روان، به ما یاد می دهد که چگونه با شناخت عادتهای کوچک و مدیریت این عادتها، هر روز یک درصد بهتر شویم. هر روز یک درصد بهتر شدن، معادل سالی 37 برابر بهتر شدن است! به قول جیمز کلیر (نویسنده کتاب عادتهای اتمی)، همین رفتارها و عادت های کوچک است که تعیین می کند 5 سال بعد کجا هستیم و چقدر موفق شده‌ایم یا شکست خورده‌ایم!
                </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
};
const styles = StyleSheet.create({});

export default Bookview;