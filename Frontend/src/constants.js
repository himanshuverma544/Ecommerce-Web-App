import { signInText } from "./functions";

const HOME = {
  name: "Home",
  path: "/"
};

const CART = {
  name: "Cart",
  path: "/cart"
};

const CHECKOUT = {
  name: "Checkout",
  path: "/checkout"
};

const ORDERS = {
  name: "View Your Orders",
  path: "/orders"
};

const THANKYOU = {
  name: "Thankyou",
  path: "/thankyou"
};

const PAGE404 = {
  name: "404",
  path: "*"
};


const SIGN_UP = {
  name: "Sign Up",
  heading: "Sign Up Yourself",
  switchMsg: "Already have an account?",
  switchName: signInText(),
  show: true
};

const SIGN_IN = {
  name: signInText(),
  heading: "Sign In Yourself",
  switchMsg: "Don't have an account?",
  switchName: SIGN_UP.name,
  show: false
};

const SIGN_OUT = {
  name: "Sign Out",
  switchMsg: "Thank you for shopping with us.",
  switchName: "😊"
};

const TEXT_AS_PER_STATUS = {
  [SIGN_UP.name]: SIGN_UP,
  [SIGN_IN.name]: SIGN_IN,
  [SIGN_OUT.name]: SIGN_OUT
};


const CURRENCY = "₹";
const ADD_TO_CART_TEXT = "ADD TO CART";


export {
  HOME,
  CART,
  CHECKOUT,
  ORDERS,
  THANKYOU,
  PAGE404,
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  TEXT_AS_PER_STATUS,
  CURRENCY,
  ADD_TO_CART_TEXT
};