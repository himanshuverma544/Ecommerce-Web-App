import { Container, Row, Col, Input, Button } from "reactstrap";
import Select from "react-select";

import { CURRENCY } from "../constants";

const Cart = () => {

  return (
    <>
      <Container className="cart-cont">
        <Row>
          <Col>
            <h1 className="cart-heading">Shopping Cart</h1>
          </Col>
        </Row>
        <Row className="cart">
          <Col className="cart-items-col p-5" lg="8">
            <Row className="cart-items-row heading-row">
              <Col sm="2">
                <h6>PRODUCT</h6>
              </Col>
              <Col sm="3">
                <h6>NAME</h6>
              </Col>
              <Col sm="2">
                <h6>PRICE</h6>
              </Col>
              <Col sm="2">
                <h6>QUANTITY</h6>
              </Col>
              <Col sm="2">
                <h6>SUBTOTAL</h6>
              </Col>
              <Col sm="1">
                <></>
              </Col>
            </Row>
            <hr/>
            { Array.from({ length: 5 }, (_, index) => (
              <>
                <Row key={index} className="cart-items-row items-row">
                  <Col sm="2">
                    <img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg"/>
                  </Col>
                  <Col sm="3">
                    <h6>Shirt</h6>
                  </Col>
                  <Col sm="2">
                    <h6><span className="currency">{CURRENCY}</span>200</h6>
                  </Col>
                  <Col sm="2">
                    <h6>2</h6>
                  </Col>
                  <Col sm="2">
                    <h6><span className="currency">{CURRENCY}</span>400</h6>
                  </Col>
                  <Col sm="1">
                    <span className="close">&#10005;</span>
                  </Col>
                </Row>
                <hr/>
              </>
            ))}
          </Col>
          <Col className="cart-summary-col p-5" lg="4">
            <Row className="">
              <Col>
                <h3>Summary</h3>
              </Col>
            </Row>
            <Row>
              <Col><hr/></Col>
            </Row>
            <Row className="subtotal-row">
              <Col className="text-col" sm="6"><h6>SUBTOTAL</h6></Col>
              <Col className="val-col text-end" sm="6"><h6><span className="currency">{CURRENCY}</span>200</h6></Col>
            </Row>
            <Row className="shipping-row mt-5">
              <Col className="text-col" sm="6"><h6>SHIPPING</h6></Col>
              <Col className="val-col text-end" sm="6"><h6>+<span className="currency ms-1">{CURRENCY}</span>99</h6></Col>
              <Col>
                <Select
                  className="shipping-method mt-1"
                  onChange={event => event.value}
                />
              </Col>
            </Row>
            <Row className="coupon-row mt-5">
              <Col className="text-col" sm="6"><h6>COUPON</h6></Col>
              <Col className="val-col text-end" sm="6"><h6>-<span className="currency ms-1">{CURRENCY}</span>159</h6></Col>
              <Col className="input-col">
                <Input
                  name="coupon"
                  type="text"
                  className="input auto-uppercase mt-1"
                  placeholder="Enter Coupon Code"
                  autoComplete="off"
                />
              </Col>
            </Row>
            <Row>
              <Col className="mt-5">
                <hr/>
              </Col>
            </Row>
            <Row className="total-price-row">
              <Col className="text-col" sm="6"><h6>TOTAL PRICE</h6></Col>
              <Col className="val-col text-end" sm="6"><h6><span className="currency">{CURRENCY}</span>159</h6></Col>
            </Row>
            <Row>
              <Col className="checkout-btn-col mt-3">
                <Button className="checkout-btn">
                  PROCEED TO CHECKOUT
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart; 