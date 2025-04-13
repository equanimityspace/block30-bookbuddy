export default function Books({ filteredBooks }) {
  return (
    <>
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
