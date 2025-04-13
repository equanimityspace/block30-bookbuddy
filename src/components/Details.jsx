import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  useGetBookDetailsQuery,
  useReserveBookMutation,
} from "../app/librarySlice";
import { getToken } from "../app/tokenService";

export default function SingleBook({ book }) {
  const [reserveBook] = useReserveBookMutation();
  const { data: bookDetail } = useGetBookDetailsQuery(book);
  const token = getToken();

  let available = "";
  if (bookDetail?.available) {
    available = "Available for check-out";
  } else {
    available = "Not available for check out";
  }

  return (
    <>
      <Container>
        <Row>
          <Carousel className="m-3">
            <Carousel.Item>
              <img
                src={bookDetail?.coverimage}
                className="carousel-image-fill"
                text="First slide"
              />
              <Carousel.Caption>
                <h3>{bookDetail?.title}</h3>
                <p>{bookDetail?.author}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={bookDetail?.coverimage}
                className="carousel-image-fill"
                text="Second slide"
              />
              <Carousel.Caption>
                <h3>Description</h3>
                <p>{bookDetail?.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={bookDetail?.coverimage}
                className="carousel-image-fill"
                text="Third slide"
              />
              <Carousel.Caption>
                <h3>{available}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
      {token ? (
        <Container className="d-flex justify-content-center mb-3">
          <Row className="w-50">
            <Col className="text-center">
              <Button variant="success">Check In</Button>
            </Col>
            <Col className="text-center">
              <Button variant="danger">Check Out</Button>
            </Col>
            <Col className="text-center">
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="d-flex justify-content-center mb-3">
          <Row className="w-50">
            <Col className="text-center">
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
