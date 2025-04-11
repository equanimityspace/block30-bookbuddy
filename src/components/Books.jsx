import { useGetAllBooksQuery } from "../app/librarySlice";

export default function Books() {
  const { data: books } = useGetAllBooksQuery();
  // console.log(books);
  return (
    <div className="m-5">
      <div className="row row-cols-4">
        {books?.map((obj) => {
          return (
            <div className="card mb-1 text-bg-light" key={obj.id} id="card">
              <img
                src={obj.coverimage}
                className="card-img-top"
                alt={`The cover of ${obj.title}`}
              />
              <div className="card-body">
                <h5 className="card-title">{obj.title}</h5>
                <p className="card-text">{obj.description}</p>
                <p className="card-text">
                  <small className="text-body-secondary">{obj.author}</small>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
