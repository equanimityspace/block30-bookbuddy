import { useState, useEffect } from "react";
import { useGetAllBooksQuery } from "../app/librarySlice";

export default function Books() {
  const { data: books } = useGetAllBooksQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();

    if (!lowerCaseQuery) {
      setFilteredBooks(books);
      return;
    }

    const results = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(lowerCaseQuery);
      const authorMatch = book.author.toLowerCase().includes(lowerCaseQuery);

      // return true if the query matches any of the fields
      return titleMatch || authorMatch;
    });

    setFilteredBooks(results);
  }, [searchQuery, books]); // Re-run effect when query or book list changes

  return (
    <>
      <div className="mt-5 ms-5 w-25">
        <input
          type="text"
          className="form-control"
          id="bookSearch"
          placeholder="Find a book"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div className="m-5">
        <div className="row row-cols-4">
          {filteredBooks?.length > 0 ? (
            filteredBooks.map((obj) => {
              let available = "";
              if (obj.available === true) {
                available = "Available";
              } else {
                available = "Unavailable";
              }
              return (
                <div className="card mb-3 text-bg-light" key={obj.id} id="card">
                  <img
                    src={obj.coverimage}
                    className="card-img-top"
                    alt={`The cover of ${obj.title}`}
                  />
                  <div className="card-body">
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
                      {available}
                    </span>
                    <h5 className="card-title">{obj.title}</h5>
                    <p className="card-text">{obj.description}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {obj.author}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>No books found!</h3>
          )}
        </div>
      </div>
    </>
  );
}
