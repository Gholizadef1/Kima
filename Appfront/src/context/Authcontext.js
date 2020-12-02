import React ,{useState,createContext,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext=React.createContext();

const trylocallogin=async()=>{
  const val = useContext(AuthContext); 
  const token=await AsyncStorage.getItem('token');
  if(token!=null){
    val.changelogged(token);
  }
  else
  val.changelogged(null);

}


export const AuthProvider=({children})=>{
  // useEffect(()=>{
  //   trylocallogin();
  // },[])
 
  const [logged,setlogged]=useState(null);
 const  changelogged=(val)=>{
  
   setlogged(val);
  //  if(logged)
  //  setlogged(false);
  //  else
  //  setlogged(true);
 }

  return(<AuthContext.Provider value={{logged:logged,changelogged:changelogged}}>{children}</AuthContext.Provider>)
}
//,changelogged:changelogged
export default AuthContext;



























// import axiosinst from '../api/axiosinst';
// import CreateDataContext from './CreatDataContext';


// const authReducer = (state, action) => {
//     switch (action.type) {
//       case 'add_error':
//         return { ...state, errorMessage: action.payload };
//       case 'signin':
//         return { errorMessage: '', token: action.payload };
//       case 'clear_error_message':
//         return { ...state, errorMessage: '' };
//       case 'signout':
//         return { token: null, errorMessage: '' };
//       default:
//         return state;
//     }
//   };
  
//   const tryLocalSignin = dispatch => async () => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       dispatch({ type: 'signin', payload: token });
//       navigate('home');
//     } else {
//       navigate('Signup');
//     }
//   };
  
//   const clearErrorMessage = dispatch => () => {
//     dispatch({ type: 'clear_error_message' });
//   };
  
//   const signup = dispatch => async ({ email, password }) => {
//     try {
//       const response = await axiosinst.post('/register', { email, password });
//       await AsyncStorage.setItem('token', response.data.token);
//       dispatch({ type: 'signin', payload: response.data.token });
  
//       navigate('home');
//     } catch (err) {
//       dispatch({
//         type: 'add_error',
//         payload: 'Something went wrong with sign up'
//       });
//     }
//   };
  
//   const signin = dispatch => async ({ email, password }) => {
//     try {
//       const response = await axiosinst.post('/login', { email, password });
//       await AsyncStorage.setItem('token', response.data.token);
//       dispatch({ type: 'signin', payload: response.data.token });
//       navigate('home');
//     } catch (err) {
//       dispatch({
//         type: 'add_error',
//         payload: 'Something went wrong with sign in'
//       });
//     }
//   };
  
//   const signout = dispatch => async () => {
//     await AsyncStorage.removeItem('token');
//     dispatch({ type: 'signout' });
//     navigate('loginFlow');
//   };
  
//   export const { Provider, Context } = CreateDataContext(
//     authReducer,
//     { signin, signout, signup, clearErrorMessage, tryLocalSignin },
//     { token: null, errorMessage: '' }
//   );