import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Page404 from "./pages/Page404";

import { HOME, CART, PAGE404 } from './constants';


function App() {

  return (
    <>
      <HashRouter basename="">
        <Routes>
          <Route path={HOME.path} element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path={CART.path} element={<Cart/>}/>
            <Route path={PAGE404.path} element={<Page404/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
