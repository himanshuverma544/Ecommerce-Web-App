import { useState, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";

import { Link } from "react-router-dom";

import axios from "axios";
import { useMutation } from "react-query";

import { Form, FormGroup, Input, Button, FormText } from "reactstrap";

import { ORDERS, SIGN_IN, SIGN_UP, SIGN_OUT, TEXT_AS_PER_STATUS } from "../constants";


const AuthenticationModal = ({ modalNode, closeModal }) => {


  const [status, setStatus] = useState(SIGN_UP.name);


  const signUp = useCallback(async () => {
    
    const response = await axios.post(import.meta.env.VITE_SIGN_UP_API_ENDPOINT);
    return response;

  }, []);
  
  const signIn = useCallback(async () => {

    const response = await axios.post(import.meta.env.VITE_SIGN_IN_API_ENDPOINT);
    return response;

  }, []);
  
  
  const authMutation = {
    signUp: useMutation(signUp),
    signIn: useMutation(signIn)
  };


  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    switch (status) {

      case SIGN_UP.name:

        const signUpFormData = new FormData(e.target);

        const signUpCredentials = {
          firstName: signUpFormData.get("firstName"),
          lastName: signUpFormData.get("lastName"),
          email: signUpFormData.get("email"),
          password: signUpFormData.get("password"),
          confirmPassword: signUpFormData.get("confirmPassword")
        };
        
        await authMutation.signUp.mutateAsync(signUpCredentials);
        break;

      case SIGN_IN.name:

        const signInFormData = new FormData(e.target);

        const signInCredentials = {
          email: signInFormData.get("email"),
          password: signInFormData.get("password")
        };

        await authMutation.signIn.mutateAsync(signInCredentials);
        break;

      case SIGN_OUT.name:
        break;

      default:
        console.log("Something's Wrong");
    }
  
  }, [status, authMutation.signUp, authMutation.signIn]);



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
          <Form onSubmit={handleSubmit}>
            <h1>{TEXT_AS_PER_STATUS[status].heading}</h1>
            <hr/>
            { (!isStatusSignOut() && TEXT_AS_PER_STATUS[status].show) && 
              <>
                <FormGroup>
                  <Input 
                    name="firstName" 
                    type="text" 
                    className="text-capitalize" 
                    placeholder="Enter First Name" 
                    autoComplete="off"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    name="lastName" 
                    type="text" 
                    className="text-capitalize" 
                    placeholder="Enter Last Name" 
                    autoComplete="off"
                    required
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
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    name="password" 
                    type="password" 
                    placeholder="Enter Password"
                    required
                  />
                </FormGroup>
                { TEXT_AS_PER_STATUS[status].show &&
                  <FormGroup>
                    <Input 
                      name="confirmPassword" 
                      type="password" 
                      placeholder="Confirm Password"
                      required
                    />
                  </FormGroup>
                }
              </>
            }
            <Button>
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