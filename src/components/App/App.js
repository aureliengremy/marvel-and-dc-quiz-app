import '../../App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Login from '../User/Login/Login';
import Signup from '../User/Signup/Signup';
import Welcome from '../Welcome/Welcome';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
   

      <Footer/>
    </Router>
  );
}

export default App;
