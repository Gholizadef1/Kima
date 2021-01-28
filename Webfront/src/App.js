import React ,{useState}  from 'react';
import './App.css';
import RegistrationForm from './components/registrationForm/registrationForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
//  Link,
//  useRouteMatch,
//  useParams,
//  withRouter
} from "react-router-dom";
import LoginForm from './components/loginForm/loginForm';
import Profile from "./Components/Profile"; 
import QuizePage from "./Components/QuizPage/QuizPage";
import Slide from './slides/Slide';
import NavBar from "./Components/Navbar";
import BookView from './components/bookView/bookView'
import Cookies from 'js-cookie'
import Grouppage from './Components/Groupepage/Groupepage';
import Groups from './components/groups/groupsPage';

function App(props) {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App yekanfont"  >
        
        <div >
          {/* <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> */}
          <Switch>
            <Route path="/" exact={true}>
              {/* <NavBar/>
               <Slide showError={updateErrorMessage} updateTitle={updateTitle}/> */}
               <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/register">
               <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/home">
               <NavBar/>
               <Slide/>
            </Route>

           
            <Route path="/profile">
              <NavBar/>
              <Profile/>
            </Route>

            <Route path="/group/:groupId">
                <NavBar/>
              <Grouppage/>
            </Route>
            <Route path="/quizepage">
                <NavBar/>
              <QuizePage/>
            </Route>
            
            <Route path="/book/:bookId">
              <NavBar/>
              <BookView showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/groups">
              <NavBar/>
              <Groups />
            </Route>

            <Route path="*">
              <div class="alert alert-warning" role="alert">
                صفحه وجود ندارد
              </div>
            </Route>
          </Switch>
        
      </div>
    </div>
    </Router>
  );
  
function protectedRoute({ children, ...rest}){
   let auth=false;
  // if(Cookies.get('userToken')==undefined){
  //   auth=true;}
  //   else {auth=false;}
    
    console.log(Cookies.get('userToken'));
    return(
      <Route
      {...rest}
      
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
  //</Router>return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}


// = ()=>{
//   console.log(Cookies.get('userToken'));
//   return(
//     // <Route
//     // render={()=>(
//     //   <Component/> 
//     // )}
//     // />
//     <Route
//     render={()=>
//     Cookies.get('userToken')==undefined?(
//       <Redirect to={{path:"/login"}}/>
//     ):(
//       <Route/>
//     )
//     }
//     />

//   )


// }

export default App;
