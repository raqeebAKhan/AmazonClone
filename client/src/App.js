import './App.css';
import Navbar from './components/header/Navbar';
import Navbartwo from './components/header/Navbartwo/Navbartwo';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/footer';
import Signin from './components/signup_signin/Signin';
import Signup from './components/signup_signin/Signup';
import { Route, Routes} from "react-router-dom";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])
  return (
    <>
    {
      data ? (<div>
      <Navbar/>
      <Navbartwo/>
      <Routes>
        <Route path='/' element={<Maincomp/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/getproductsone/:id' element={<Cart/>}/>
        <Route path='/buynow' element={<Buynow/>}/>


      </Routes>
      <Footer/>
      
    </div>) :( <div className="circle">
    <CircularProgress />
    <h2> Loading....</h2>
  </div>)
    }
</>
    
  );
}

export default App;
