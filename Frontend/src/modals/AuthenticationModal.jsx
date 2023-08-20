import { Link } from "react-router-dom";

import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

import { Form, FormGroup, Input, Button, FormText } from "reactstrap";

import { ORDERS, SIGN_IN, SIGN_OUT, TEXT_AS_PER_STATUS } from "../constants";


const AuthenticationModal = ({ modalNode, closeModal }) => {

  const [status, setStatus] = useState(SIGN_IN.name);

  const isStatusSignOut = useCallback(() => {
    return status === SIGN_OUT.name;
  }, [status]);


  return createPortal(
    <>
      <div className="the-authentication-modal" onClick={closeModal}>
        <div ref={modalNode} className="auth-cont">
        { isStatusSignOut() &&
          <Link 
            to={ORDERS.path}
            onClick={closeModal}
          >
            {ORDERS.name}
          </Link>
        }
          <Form>
            <h1>{TEXT_AS_PER_STATUS[status].heading}</h1>
            <hr/>
            { (!isStatusSignOut() && TEXT_AS_PER_STATUS[status].show) && 
              <>
                <FormGroup>
                  <Input 
                    name="firstName" 
                    type="text" 
                    className="auto-capitalize" 
                    placeholder="Enter First Name" 
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    name="lastName" 
                    type="text" 
                    className="auto-capitalize" 
                    placeholder="Enter Last Name" 
                    autoComplete="off"
                  />
                </FormGroup>
              </>
            }
            { !isStatusSignOut() &&
              <>
                <FormGroup>
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="Enter Email" 
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    name="password" 
                    type="password" 
                    placeholder="Enter Password"
                  />
                </FormGroup>
                { TEXT_AS_PER_STATUS[status].show &&
                  <FormGroup>
                    <Input 
                      name="confirm-password" 
                      type="password" 
                      placeholder="Confirm Password"
                    />
                  </FormGroup>
                }
              </>
            }
            <Button className="sign-up-btn">
              {TEXT_AS_PER_STATUS[status].name}
            </Button>
            <hr/>
            <FormText>
              {TEXT_AS_PER_STATUS[status].switchMsg}
              { !isStatusSignOut() && 
                <span 
                  className="sign-in-span"
                  onClick={() => setStatus(TEXT_AS_PER_STATUS[status].switchName)}
                >
                  {TEXT_AS_PER_STATUS[status].switchName}
                </span>
              }
            </FormText>
            
          </Form>
        </div>
      </div>
    </>,
    document.getElementById("authentication-modal")
  );
}
  

export default AuthenticationModal;