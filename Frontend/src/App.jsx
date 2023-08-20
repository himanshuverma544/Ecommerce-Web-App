import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Thankyou from './pages/Thankyou';
import Page404 from "./pages/Page404";

import { HOME, CART, CHECKOUT, ORDERS, THANKYOU, PAGE404 } from './constants';


function App() {

  return (
    <>
      <HashRouter basename="">
        <Routes>
          <Route path={HOME.path} element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path={CART.path} element={<Cart/>}/>
            <Route path={CHECKOUT.path} element={<Checkout/>}/>
            <Route path={ORDERS.path} element={<Orders/>}/>
            <Route path={THANKYOU.path} element={<Thankyou/>}/>
            <Route path={PAGE404.path} element={<Page404/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
