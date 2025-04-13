import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  useGetBookDetailsQuery,
  useReserveBookMutation,
} from "../app/librarySlice";

export default function SingleBook({ book, setBook }) {
  const [reserveBook] = useReserveBookMutation();
  const { data: bookDetail } = useGetBookDetailsQuery(book);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Carousel className="m-3">
          <Carousel.Item>
            <img
              src={bookDetail?.coverimage}
              className="carousel-image-fill"
              text="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={bookDetail?.coverimage}
              className="carousel-image-fill"
              text="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={bookDetail?.coverimage}
              className="carousel-image-fill"
              text="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>
    </Container>
  );
}
