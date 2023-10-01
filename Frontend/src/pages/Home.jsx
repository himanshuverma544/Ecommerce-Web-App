import { useCallback, useMemo } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

import { CURRENCY, ADD_TO_CART_TEXT } from "../constants";


const Home = () => {

  const fetchProducts = useCallback(async () => {

    const URL = import.meta.env.VITE_GET_PRODUCTS_API_ENDPOINT;
    const { data } = await axios.get(URL);
    return data;

  }, []);


  const { isSuccess, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isError) {
    console.log("Unable to Fetch Products");
  }

  const products = useMemo(() => {
    if (isSuccess)
      return data;
  }, [isSuccess, data]);


  return (
    <>
      {(isSuccess && products.length > 0) &&
        <Container className="products-cont">
          <Row>
            <Col className="products-heading-col">
              <h1>Turning Pixels into Smiles, One Frame at a Time</h1>
            </Col>
          </Row>
          <Row>
            {products.map(product => (
              <Col key={product.product_id} className="products-col" md="4" lg="3">
                <Card className={product.product_name} data-product_id={product.product_id}>
                  <div className="product-image-cont">
                    <img
                      className="product-image"
                      src={`${import.meta.env.VITE_SERVER_PATH}${product.product_image_url}`}
                      alt={product.product_name}
                    />
                  </div>
                  <CardBody className="product-card-body">
                    <CardTitle tag="h5">
                      {product.product_name}
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      <span className="currency">
                        {CURRENCY}
                      </span>
                      {product.price}
                    </CardSubtitle>
                    <Button className="add-to-cart-btn">
                      {ADD_TO_CART_TEXT}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      }
    </>
  );
}

export default Home;