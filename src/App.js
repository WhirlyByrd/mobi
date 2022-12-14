
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import HomeScreen from './components/home/HomeScreen'
import AccountScreen from './components/account/AccountScreen';
import AuthScreen from './components/auth/AuthScreen';
import UserProductsScreen from './components/account/userProducts/UserProductsScreen';
import CartScreen from './components/account/cart/CartScreen';
import NewProductScreen from './components/account/newProduct/NewProductScreen';
import ProductDetailScreen from './components/productDetail/ProductDetailScreen'
import UserProductDetailScreen from './components/account/userProducts/UserProductDetailScreen'
import SearchScreen from './components/search/SearchScreen'

import {useContext} from 'react'
import AuthContext from './store/authContext';


function App() {
  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <Header />

      <Routes>
      <Route path='/' element={<HomeScreen />} />

        <Route path='/productSearch/:search' element={<SearchScreen />} />

        <Route path='/productDetail/:id' element={<ProductDetailScreen />} />
        <Route path='/userProductDetail/:id' element={<UserProductDetailScreen />} />

        <Route path='/auth' element={!authCtx.token ?  <AuthScreen /> : <Navigate to='/'/>} />

        <Route path='/account' element={authCtx.token ? <AccountScreen /> : <Navigate to='/auth'/> } />

        <Route path='/newProduct' element={authCtx.token ? <NewProductScreen /> : <Navigate to='/auth'/>} />

        <Route path='/userProducts' element={authCtx.token ? <UserProductsScreen /> : <Navigate to='/auth'/>} />

        <Route path='/cart' element={authCtx.token ? <CartScreen /> : <Navigate to='/auth'/>} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
