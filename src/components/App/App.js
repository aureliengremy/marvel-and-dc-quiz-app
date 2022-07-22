import '../../App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Login from '../User/Login/Login';
import Signup from '../User/Signup/Signup';
import Welcome from '../Welcome/Welcome';
import ForgetPassword from '../User/ForgetPassword/ForgetPassword'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { IconContext } from 'react-icons'

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header />

        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>


        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
