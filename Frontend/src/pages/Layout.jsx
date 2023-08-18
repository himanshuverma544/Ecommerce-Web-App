import { Outlet, NavLink } from "react-router-dom";

import { Container, Button } from "reactstrap";

import { HOME, CART, SIGN_IN } from "../constants";


const Layout = () => {

  return (
    <>
      <Container fluid className="page-cont">
        <header>
          <nav className="ecommerce-navbar">
            <ul>
              <li>
                <NavLink to={HOME.path}>{HOME.name}</NavLink>
              </li>
              <li>
                <NavLink to={CART.path}>{CART.name}</NavLink>
              </li>
              <li>
                <Button className="sign-in-btn">{SIGN_IN}</Button>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Outlet/>
        </main>
      
        <footer>
        </footer>
      </Container>
    </>
  );
}

export default Layout;