import '../../App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Login from '../User/Login/Login';
import Signup from '../User/Signup/Signup';
import Welcome from '../Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <Header/>

      <Welcome/>
      <Landing/>
      <Login/>
      <Signup/>
      <ErrorPage/>

      <Footer/>
    </div>
  );
}

export default App;
