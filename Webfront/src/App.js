import React ,{useState}  from 'react';
import './App.css';
import RegistrationForm from './components/registrationForm/registrationForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
//  Redirect,
//  useHistory
//  Link,
//  useRouteMatch,
//  useParams,
//  withRouter
} from "react-router-dom";
import LoginForm from './components/loginForm/loginForm';
import Profile from "./Components/Profile"; 
import Slide from './slides/Slide';
//import NavBar from "./Components/Navbar";
import BookView from './components/bookView/bookView'
//import Cookies from 'js-cookie'
import Grouppage from './Components/Groupepage/Groupepage';
import Groups from './components/groups/groupsPage';
import QuizesPage from "./Components/Quizespage/QuizesPage";
import CreateQuiz from './Components/Quizespage/CreateQuiz';
import ProtectedRoute  from "./components/protect";
import Discussion  from "./components/discusstion/discussion";
import TakeQuiz from "./components/quiz/takeQuiz";
import ReviewQuiz from "./components/quiz/reviewQuiz"


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
               <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/register">
               <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <ProtectedRoute path="/home" component={Slide}>
            </ProtectedRoute>

            <ProtectedRoute path="/profile" component={Profile}/>

            <ProtectedRoute path="/group/:groupId" component={Grouppage}/>
    
            <ProtectedRoute path="/quizepage" component={QuizesPage}/>
            
            <ProtectedRoute path="/book/:bookId" component={BookView}/>
            <ProtectedRoute path="/quizes" component={QuizesPage}/>
            <ProtectedRoute path="/creatquize" component={CreateQuiz}/>
            <ProtectedRoute path="/takeQuiz/:quizId" component={TakeQuiz}/> 
            <ProtectedRoute path="/reviewQuiz/:quizId" component={ReviewQuiz}/>
            
            
            <ProtectedRoute path="/groups" component={Groups}/>

            <ProtectedRoute path="/discussion/:groupId/:discussionId" component={Discussion}/>

            {/* <ProtectedRoute path="/takeQuiz" component={TakeQuiz}/>

            <ProtectedRoute path="/reviewQuiz" component={ReviewQuiz}/> */}

            

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
}

export default App;
