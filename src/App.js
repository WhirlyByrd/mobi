
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import HomeScreen from './components/home/HomeScreen'
import AccountScreen from './components/account/AccountScreen';
import AuthScreen from './components/auth/AuthScreen';
import UserProductsScreen from './components/account/userProducts/UserProductsScreen';
import CartScreen from './components/account/cart/CartScreen';


function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='account' element={<AccountScreen />} />
        <Route path='auth' element={<AuthScreen />} />
        <Route path='userProducts' element={<UserProductsScreen />} />
        <Route path='cart' element={<CartScreen />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
