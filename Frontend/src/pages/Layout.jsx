import { useState, useRef, useCallback } from "react";

import { Outlet, NavLink } from "react-router-dom";

import { Container, Button } from "reactstrap";

import AuthenticationModal from "../modals/AuthenticationModal";

import { HOME, CART, SIGN_IN, ORDERS } from "../constants";


const Layout = () => {

  const [showAuthenticationModal, setShowAuthentication] = useState(false);
  const authenticationModalNode = useRef(null);

  const openAuthenticationModal = useCallback(() => 
    setShowAuthentication(true), 
  []);

  const isClickedOutsideOfModal = useCallback((event, node) => {
    if (node.current && !node.current.contains(event.target))
      return true;
    return false;
  }, []);

  const closeAuthenticationModal = useCallback(event => {

    if (event.target.innerText === ORDERS.name)
      setShowAuthentication(false);

    else if (isClickedOutsideOfModal(event, authenticationModalNode))
      setShowAuthentication(false);

  }, [isClickedOutsideOfModal]);


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
                <Button 
                  className="sign-in-btn" 
                  onClick={openAuthenticationModal}
                >
                  {SIGN_IN.name}
                </Button>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Outlet/>
        </main>
      
        <footer>
          <h6>Unlock the Power of Visual Storytelling with these Snapshots</h6>
        </footer>
      </Container>

      {showAuthenticationModal &&
        <AuthenticationModal
          modalNode={authenticationModalNode}
          closeModal={closeAuthenticationModal}
        />
      }
    </>
  );
}

export default Layout;