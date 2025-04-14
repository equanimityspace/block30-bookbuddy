import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InfoModal from "./Modal";

import {
  useGetBookDetailsQuery,
  useReserveBookMutation,
  useReturnBookMutation,
  useGetReservationsQuery,
} from "../app/librarySlice";
import { getToken } from "../app/tokenService";

export default function Details({ book }) {
  // get token and book data
  const token = getToken();
  const { data: bookDetail } = useGetBookDetailsQuery(book);
  const { data: bookReservation } = useGetReservationsQuery(token);

  // get book Id
  const bookId = bookDetail?.id;

  // get reservation object for matching book Id
  const objReservation = bookReservation?.filter(
    (book) => book.bookid === bookId
  );

  // extract reservation Id from rservation object
  let reservationId = 0;
  if (objReservation && objReservation.length !== 0) {
    reservationId = objReservation[0].id;
  }

  // check if book is available, I should have done this with a prop but I did not think ahead
  let available = "";
  if (bookDetail?.available) {
    available = "Available for check-out";
  } else {
    available = "Not available for check out";
  }

  // modal functionality
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => {
    setShow(false);
    navigate("/");
  };

  // modal variables
  const heading = "Success!";
  const body = "Action completed succesfully";

  // return a book
  const [returnBook, { isError: boolReturnError }] = useReturnBookMutation();
  const [errorReturn, setErrorReturn] = useState(null);
  const returnBookFunc = async () => {
    const response = await returnBook({ token, reservationId });
    try {
      setErrorCheckOut(response.error.data.message);
    } catch {}
    openModal();
  };

  // check out a book
  const [reserveBook, { isError: boolReserveError }] = useReserveBookMutation();
  const [errorCheckOut, setErrorCheckOut] = useState(null);
  const reserveBookFunc = async () => {
    const response = await reserveBook({ token, bookId });
    try {
      setErrorCheckOut(response.error.data.message);
    } catch {}
    openModal();
  };

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
              <Button variant="success" onClick={returnBookFunc}>
                Return
              </Button>
            </Col>
            <Col className="text-center">
              <Button variant="danger" onClick={reserveBookFunc}>
                Check Out
              </Button>
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
      {/* Variable modal feedback */}
      {!boolReturnError && !boolReserveError ? (
        (console.log("in success"),
        (
          <InfoModal
            show={show}
            hide={closeModal}
            heading={heading}
            body={body}
          />
        ))
      ) : (
        <InfoModal
          show={show}
          hide={closeModal}
          heading="Error"
          body={errorReturn || errorCheckOut}
        />
      )}
      ;
    </>
  );
}
