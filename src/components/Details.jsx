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
  // get slice components
  const [reserveBook, { isError: reserveError, isLoading: reserveLoading }] =
    useReserveBookMutation();
  const [returnBook, { isError: returnError, isLoading: returnLoading }] =
    useReturnBookMutation();

  const { data: bookDetail } = useGetBookDetailsQuery(book);

  const token = getToken();
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
  let actionError = "";

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
              <Button
                variant="success"
                onClick={() => {
                  if (token && reservationId) {
                    try {
                      returnBook({ token, reservationId });
                    } catch (error) {
                      actionError = error;
                    }
                    openModal();
                  }
                }}
              >
                Return
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                variant="danger"
                onClick={() => {
                  if (token && bookId) {
                    try {
                      reserveBook({ token, bookId });
                    } catch (error) {
                      actionError = error;
                    }
                    openModal();
                  }
                }}
              >
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
      {!returnError && !reserveError ? (
        <InfoModal
          show={show}
          hide={closeModal}
          heading={heading}
          body={body}
        />
      ) : (
        <InfoModal
          show={show}
          hide={closeModal}
          heading="Error"
          body="An error has occurred, please try again later"
        />
      )}
      ;
    </>
  );
}
