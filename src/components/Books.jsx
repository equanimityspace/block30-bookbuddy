import { Link } from "react-router-dom";

export default function Books({ filteredBooks }) {
  return (
    <>
      <div className="all-books-display">
        {filteredBooks?.length > 0 ? (
          filteredBooks.map((obj) => {
            // check if available
            let available = "";
            if (obj.available === true) {
              available = "Available";
            } else {
              available = "Unavailable";
            }
            return (
              <div className="card" key={obj.id}>
                <img src={obj.coverimage} alt={`The cover of ${obj.title}`} />
                <div className="card-body-text">
                  {obj.available ? (
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
                      {available}
                    </span>
                  ) : (
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                      {available}
                    </span>
                  )}
                  <Link to={`/details/${obj.id}`}>
                    <h5 className="card-title">{obj.title}</h5>
                  </Link>
                  <p className="card-text">{obj.description}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">{obj.author}</small>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No books found!</h3>
        )}
      </div>
    </>
  );
}
