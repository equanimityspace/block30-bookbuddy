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

  let available = "";
  if (bookDetail?.available) {
    available = "Available for check-out";
  } else {
    available = "Not available for check-out";
  }

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
  );
}
