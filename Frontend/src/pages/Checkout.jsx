import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import { LiaShippingFastSolid } from "react-icons/lia";


const Checkout = () => {

  return (
    <>
      <Container className="checkout-cont">
        <Row>
          <Col>
            <h1 className="checkout-heading text-center">Checkout</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form className="shipping-form mt-3">
              <Row>
                <Col>
                  <FormText className="shipping-text">
                    <LiaShippingFastSolid className="shipping-icon me-3" />
                      Shipping Details
                  </FormText>
                </Col>
              </Row>
              <Row className="name-row mt-4">
                <Col sm="6" className="first-col">
                  <FormGroup>
                    <Label>FIRST NAME</Label>
                    <Input
                      name="first-name"
                      type="text"
                      className="text-capitalize"
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" className="last-col">
                  <FormGroup>
                    <Label>LAST NAME</Label>
                    <Input
                      name="last-name"
                      type="text"
                      className="text-capitalize"
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="address-row-1">
                <Col className="street-col">
                  <FormGroup>
                    <Label>STREET</Label>
                    <Input
                      name="street"
                      type="text"
                      className="text-capitalize"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <Row className="address-row-2">
                    <Col className="city-col" sm="4">
                      <FormGroup>
                        <Label>CITY</Label>
                        <Input
                          name="city"
                          type="text"
                          className="text-capitalize"
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="state-col" sm="4">
                      <FormGroup>
                        <Label>STATE</Label>
                        <Input
                          name="state"
                          type="text"
                          className="text-capitalize"
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="zip-col" sm="4">
                      <FormGroup>
                        <Label>ZIP</Label>
                        <Input
                          name="zip"
                          type="text"
                          className="text-capitalize"
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="purchase-btn-row mt-3">
                <Col sm="auto">
                  <Button className="purchase-btn py-2 px-5">
                    PURCHASE
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Checkout;