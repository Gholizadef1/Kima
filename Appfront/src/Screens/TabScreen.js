import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Home from './Home'
import Profie from './Profile'
import Search from './Search'
import Mybooks from './Mybooks'
import Groups from './Groups';
import Bookresult from './Bookresult';
import Searchnavigation from './Searchnavigation';
import Booknavigation from './Booknavigation'
import Bookview from './Bookview';
import { createSwitchNavigator } from 'react-navigation';
import App from '../../App';
import Profile from './Profile';
import Editprofile from './Editprofile';
import Profilenavigation from './Profilenavigation';
import MybooksNavigation from './MybooksNavigation';
import Groupnavigation from './Groupnavigation';
import GroupPageNavigation from './GroupPageNavigation';
import profilequiznavigation from './profilequiznavigation';
import { Button } from 'native-base';
import { StyleSheet, Text, View, Modal, ImageBackground, Alert, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { useSafeArea } from 'react-native-safe-area-context';
// import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
// const SNavigation = createStackNavigator();
//  Snavigation=()=>{
//    return(
//     <SNavigation>
//       <SNavigation.Screen name='search' component={Search}></SNavigation.Screen>
//       <SNavigation.Screen name="book"   component={Bookresult}></SNavigation.Screen>

//     </SNavigation>
//    )

//  }
// const logout=createSwitchNavigator({
//   mainFlow:TabScreen,
//   loginFlow:StackScreen,

// }

// );
const Tab = createBottomTabNavigator();
const TabSreen = (prop) => {
  const [profileoquiz, setprofileoquiz] = React.useState(Profilenavigation)
  const [modalopen, setmodalopen] = React.useState(false)
  const poq = () => {
    return (profileoquiz)
  }
  return (
    // <NavigationContainer options={{}} >

    <Tab.Navigator tabBarOptions={{ activeTintColor: '#1f7a8c', activeBackgroundColor: '#EDF2F4' }}
      initialRoute={{
        headerShown: false
      }}
    >

      <Tab.Screen name="خانه" component={Booknavigation} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),

      }} />
      <Tab.Screen name="کتاب های من" component={MybooksNavigation} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="book" size={size} color={color} />
        ),
      }} />

      <Tab.Screen name="جستجو" component={Searchnavigation} options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="search" size={size} color={color} />
        ),
        // tabBarBadge:3
      }} />
      <Tab.Screen name="گروه ها" component={GroupPageNavigation} options={{
        tabBarIcon: ({ color, size }) => (
          //  <View>
          <MaterialIcons name="people" size={24} color={color} />
          // {/* <Text>aldfh;skfj;k</Text>
          // </View> */}
        ),

      }} />

      <Tab.Screen name="حساب کاربری" component={poq} options={{
        tabBarIcon: ({ color, size }) => (
          <View>
            <MaterialIcons name="person" size={size} color={color} />
            <Modal transparent={true} StatusBar={{ backgroundColor: 'blue' }} style={{ bottom: 100, marginBottm: 400, position: 'absolute' }} visible={modalopen} animationType='fade' >
              <View style={{
                 position:'absolute',
                 backgroundColor:"#EDF2F4",height:hp('20%'),width:wp('20%'),marginTop:hp('74%'),alignSelf:'flex-end',
                 elevation:0,borderTopRightRadius:20,borderTopLeftRadius:20
                 }}>
                {/* <Text>akdsf;kasjdf;kjsa;lfkj;slkdfjl;ksadjf;lskadjf;lkjsaf;lkjsf</Text> */}
                {/* <View style={{alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),backgroundColor:'blue'}}> */}
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('80%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white'}} 
                onPress={() => setmodalopen(false)}>
                  <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }}
                   onPress={() => setmodalopen(false)}
                    name="close" size={23} color="#D75A5A" />

                </TouchableOpacity>
      
                
              </View>

            </Modal>
            <Button style={{ height: 20, width: 20, backgroundColor: 'lightgreen' }} onPress={() => {
              if(modalopen===true)
              setmodalopen(false);
              else
              setmodalopen(true)
              // prop.navigation.navigate("جستجو");
              // if (profileoquiz != GroupPageNavigation) {
              //   setprofileoquiz(GroupPageNavigation)
              // }
              // else {
              //   setprofileoquiz(Profilenavigation)
              // }
            }}></Button>
          </View>
        ),
      }} />
      {/* <Tab.Screen name="حساب کاربری" component={Profilenavigation} options={{tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
              }}/> */}

    </Tab.Navigator>
    // {/* </NavigationContainer> */}
  );
}

export default TabSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});